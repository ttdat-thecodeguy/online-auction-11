const express = require("express");

const dauGiaModel = require("../../services/dauGiaModel");
const sanPhamModel = require("../../services/sanPhamModel");
const taiKhoanModel = require("../../services/taiKhoanModel");
const danhGiaModel = require("../../services/danhGiaModel");
const camDauGiaModel = require("../../services/camDauGiaModel");
const donHangModel = require("../../services/datHangModel");


const router = express.Router();

const mailer = require("../../utils/mailer");
const Utils = require("../../utils/Utils");
/// từ chối lượt ra giá của người cao nhất và chuyển cho người thứ 2

router.get("/tu-choi-ra-gia", async (req, res) => {
  const id_nguoi_ban = req.accessTokenPayload.id || 0;
  const id_sanpham = req.query.san_pham;

  let san_pham = await sanPhamModel.findById(id_sanpham);
  if (san_pham.length == 0) {
    return res.json({
      messeage: "product not found"
    });
  }
  ///// kiểm tra user seller này có sở hữu sản phẩm này không

  if (id_nguoi_ban != san_pham[0].id_nguoi_ban) {
    return res
      .json({
        messeage: "unauthorized"
      })
      .status(401);
  }

  let rs = await dauGiaModel.countDauGiaBySanPham(id_sanpham);

  if (rs == null || rs.count == 0) {
    return res
      .json({
        messeage: "auction is empty"
      })
      .status(200);
  }

  let caoNhat = await dauGiaModel.findDauGiaCaoNhat(id_sanpham);
  if (caoNhat == null) {
    return res.json({
      messeage: "top not found"
    });
  }
  let aff_rows = await dauGiaModel.khoaDauGiaCaoNhat(
    id_sanpham,
    caoNhat.id_nguoi_dau_gia
  );
  if (aff_rows == 0) {
    return res.json({
      messeage: "something went wrong"
    });
  }
  //// cấm người dùng đấu giá sp này

  await camDauGiaModel.add({
    id_sp: id_sanpham,
    id_nguoi_dung: caoNhat.id_nguoi_dau_gia
  });

  return res.json({
    messeage: "remove top auction"
  });
});

//// danh sách chờ cho các chiếu mới

router.get("/danh-sach-cho", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  if (id == 0) {
    return res.status(401).json({
      messeage: "User Invalid"
    });
  }
  const rows = await dauGiaModel.findByStatus(id, 3);
  let arr = [];
  for (let i = 0; i < rows.length; i++) {
    rows[i].path = Utils.toPath(rows[i].ten_sp, rows[i].id_sp);
    arr.push(rows[i]);
  }
  return res.status(200).json(arr);
});

//// chấp thuận cho các chiếu mới

router.get("/chap-thuan", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const id_yc = req.query.yeu_cau;
  let yeu_cau = await dauGiaModel.findByIdDauGia(id_yc);

  if (yeu_cau == null || yeu_cau.status != 3) {
    return res.status(400).json({
      messeage: "request not found or invalid"
    });
  }
  if (yeu_cau.id_nguoi_ban != id) {
    return res.status(401).json({
      messeage: "User Not Authorized"
    });
  }
  const id_sp = yeu_cau.id_sp;
  let luot_dau_gia = await dauGiaModel.countDauGiaBySanPham(id_sp);
  luot_dau_gia = luot_dau_gia.count;

  let sp = await sanPhamModel.findById(yeu_cau.id_sp);
  if (sp.length != 0) {
    sp = sp[0];
  }

  let nguoi_dau_gia = await taiKhoanModel.findById(yeu_cau.id_nguoi_dau_gia);

  //// nếu giá đấu giá vượt qua giá mua thì cho thắng luôn

  /// xử lí nhận xét khi chấp thuận

  let user = await taiKhoanModel.findById(yeu_cau.id_nguoi_dau_gia);
  let diem = user.diem_danhgia_duong + 1;
  // nang diem danh gia trong bang tk
  await taiKhoanModel.updateNangDiemDanhGia(yeu_cau.id_nguoi_dau_gia, diem);

  // them danh gia
  const danhGia = {
    nguoi_danh_gia: id,
    nguoi_bi_danh_gia: yeu_cau.id_nguoi_dau_gia,
    nhan_xet: "cảm ơn bạn đã tham gia đấu giá",
    isDuong: true
  };
  await danhGiaModel.add(danhGia);

  if (yeu_cau.gia_tra_cao_nhat >= sp.gia_mua_ngay) {
    const don_hang_rs = {
      id_sp: sp.id_sp,
      id_nguoi_mua: yeu_cau.id_nguoi_dau_gia,
      id_nguoi_ban: sp.id_nguoi_ban,
      gia_mua: sp.gia_mua_ngay,
      ngay_dat_hang: new Date()
    };
    
    await donHangModel.themDonHang(don_hang_rs);
   
    
    /// thông báo cho người mua
    await mailer.send({
      from: "online.auction.11team@gmail.com",
      to: `${sp.email}`,
      subject: `OnlineAuction11: Món Hàng ${sp.ten_sp} của bạn đã có người mua.`,
      html: `
                      Xin chào ${sp.ho_ten}, Món hàng ${sp.ten_sp} của bạn đã kết thúc.
                      <br> 
                          Chúng tôi thông báo với bạn rằng món hàng của bạn đã có người mua
                      <br>
                      (Đây là thư tự động vui lòng không phản hồi)
                      `
    });

     /// khóa toàn bộ cuộc đấu giá đang diễn ra
     await dauGiaModel.updateStatus(sp.id_sp, 2);

     await sanPhamModel.updateStatus(sp.id_sp, 1);

    return res.json({
        messeage: "accepted"
    });
  }

  if (luot_dau_gia == 0) {
    await sanPhamModel.updateGiaHT(id_sp, yeu_cau.gia_khoi_diem);

    await dauGiaModel.updateStatusById(id_yc, 1);

    // #1 - Bán
    await mailer.send({
      from: "online.auction.11team@gmail.com",
      to: `${sp.email}`,
      subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
      html: `
            Xin chào ${sp.ho_ten}, Chúc Mừng bạn, Sản Phẩm của bạn hiện đã có người đấu giá với giá mua ${yeu_cau.gia_khoi_diem} là .
            (Đây là thư tự động vui lòng không phản hồi)
            `
    });
    // #1 - ra giá
    await mailer.send({
      from: "online.auction.11team@gmail.com",
      to: `${nguoi_dau_gia.email}`,
      subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
      html: `
            Xin chào ${nguoi_dau_gia.ho_ten}, Chúc Mừng bạn, hiện bạn đang dẫn đầu ${sp.ten_sp}.      
            <ul> 
                <li>giá mua: ${yeu_cau.gia_khoi_diem}</li>
            <ul>
            (Đây là thư tự động vui lòng không phản hồi)
            `
    });
  } else {
    let cao_nhat = await dauGiaModel.findDauGiaCaoNhat(id_sp);

    /// không chấp thuận
    if (cao_nhat.gia_tra_cao_nhat + sp.buoc_gia > yeu_cau.gia_tra_cao_nhat) {
      yeu_cau.gia_khoi_diem = yeu_cau.gia_tra_cao_nhat;
      yeu_cau.id_tra_cao_nhat = cao_nhat.id_tra_cao_nhat;
      //// khi giá khởi điểm của top ở dưới mức đặt giá
      //// nâng giá khởi điểm

      if (cao_nhat.gia_tra_cao_nhat < yeu_cau.gia_tra_cao_nhat) {
        //await dauGiaModel.add(dau_gia_rs); //need update not add

        /// đủ điều kiện ghi bảng
        yeu_cau.status = 1;
        await dauGiaModel.updateDauGia(id_yc, yeu_cau);
        await sanPhamModel.updateGiaHT(id_sp, dau_gia_rs.gia_khoi_diem);
      }
      ///// không đủ điều kiện ghi bảng
      else {
        await dauGiaModel.updateStatusById(id_yc, 2);
      }
      /// đủ yêu cầu để trở thành top
    } else {
      yeu_cau.status = 1;
      yeu_cau.gia_khoi_diem = cao_nhat.gia_tra_cao_nhat;

      await dauGiaModel.updateDauGia(id_yc, yeu_cau);
      ////
      await sanPhamModel.updateGiaHT(id_sp, cao_nhat.gia_tra_cao_nhat);

      // #2 - Bán
      await mailer.send({
        from: "online.auction.11team@gmail.com",
        to: `${sp.email}`,
        subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
        html: `
                Xin chào ${sp.ho_ten}, Chúc Mừng bạn, Sản Phẩm của bạn bị canh tranh gay gắt ${sp.ten_sp}.      
                <ul> 
                    <li>giá mua: ${cao_nhat.gia_tra_cao_nhat}</li>
                <ul>
                (Đây là thư tự động vui lòng không phản hồi)
                `
      });
      // #2 - ra giá
      await mailer.send({
        from: "online.auction.11team@gmail.com",
        to: `${nguoi_dau_gia.email}`,
        subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
        html: `
                Xin chào ${nguoi_dau_gia.ho_ten}, Chúc Mừng bạn, hiện bạn đang dẫn đầu ${sp.ten_sp}.      
                <ul> 
                    <li>giá mua: ${cao_nhat.gia_tra_cao_nhat}</li>
                <ul>
                (Đây là thư tự động vui lòng không phản hồi)
                `
      });
      // #2 - giữ giá
      await mailer.send({
        from: "online.auction.11team@gmail.com",
        to: `${cao_nhat.email}`,
        subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
        html: `
                Xin chào ${cao_nhat.ho_ten}, Xin Chia Buồn, Sản Phẩm Hiện Tại ${sp.ten_sp}  Đã Bị đặt giá trên.      
                (Đây là thư tự động vui lòng không phản hồi)
                `
      });
    }
  }
  

  return res.json({
    messeage: "accepted is done"
  });
});



router.get("/huy-bo", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const id_yc = req.query.yeu_cau;
  let yeu_cau = await dauGiaModel.findByIdDauGia(id_yc);

  if (yeu_cau == null || yeu_cau.status != 3) {
    return res.status(400).json({
      messeage: "request not found or invalid"
    });
  }
  if (yeu_cau.id_nguoi_ban != id) {
    return res.status(401).json({
      messeage: "User Not Authorized"
    });
  }

  //// cấm người dùng đấu giá sp này

  await camDauGiaModel.add({
    id_sp: yeu_cau.id_sp,
    id_nguoi_dung: yeu_cau.id_nguoi_dau_gia
  });

  //// khoá dòng đấu giá

  await dauGiaModel.updateStatusById(id_yc, 2);

  //// xử lí nhận xét khi hủy bỏ

  let user = await taiKhoanModel.findById(yeu_cau.id_nguoi_dau_gia);

  let diem = user.diem_danhgia_am + 1;
  // nang diem danh gia trong bang tk
  await taiKhoanModel.updateHaDiemDanhGia(yeu_cau.id_nguoi_dau_gia, diem);

  // them danh gia
  const danhGia = {
    nguoi_danh_gia: id,
    nguoi_bi_danh_gia: yeu_cau.id_nguoi_dau_gia,
    nhan_xet:
      "sau khi xem xét chúng tôi phát hiện sự gian lận nên lượt đấu giá này sẽ không được chấp nhận",
    isDuong: false
  };
  await danhGiaModel.add(danhGia);

  return res.status(200).json({
    messeage: "unaccepted is done"
  });
});

module.exports = router;
