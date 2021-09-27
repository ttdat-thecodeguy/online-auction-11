const express = require("express");

const dauGiaModel = require("../../services/dauGiaModel");
const sanPhamModel = require("../../services/sanPhamModel");
const taiKhoanModel = require("../../services/taiKhoanModel");
const danhGiaModel = require("../../services/danhGiaModel")
const router = express.Router();

//// danh sách chờ cho các chiếu mới

router.get("/danh-sach-cho", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  if (id == 0) {
    return res.status(401).json({
      messeage: "User Invalid",
    });
  }
  const rows = await dauGiaModel.findByStatus(id, 3);
  return res.status(200).json(rows);
});

//// chấp thuận cho các chiếu mới

router.get("/chap-thuan", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const id_yc = req.query.yeu_cau;
  let yeu_cau = await dauGiaModel.findByIdDauGia(id_yc);
  
  if (yeu_cau == null || yeu_cau.status != 3) {
    return res.status(400).json({
      messeage: "request not found or invalid",
    });
  }
  if(yeu_cau.id_nguoi_ban != id){
    return res.status(401).json({
        messeage: "User Not Authorized",
    });
  }
  const id_sp = yeu_cau.id_sp;
  let luot_dau_gia = await dauGiaModel.countDauGiaBySanPham(id_sp);
  luot_dau_gia = luot_dau_gia.count;

  let sp = await sanPhamModel.findById(yeu_cau.id_sp);
  if (sp.length != 0) {
    sp = sp[0];
  }
  if (luot_dau_gia == 0) {
    await sanPhamModel.updateGiaHT(id_sp, gia_dat);

    await dauGiaModel.updateStatusById(id_yc, 1);
    
  } else {
    let cao_nhat = await dauGiaModel.findDauGiaCaoNhat(id_sp);

    /// không chấp thuận
    if ((cao_nhat.gia_tra_cao_nhat + sp.buoc_gia) > yeu_cau.gia_tra_cao_nhat) {

      console.log(yeu_cau)

      yeu_cau.gia_khoi_diem = yeu_cau.gia_tra_cao_nhat;
      yeu_cau.id_tra_cao_nhat = cao_nhat.id_tra_cao_nhat;
      //// khi giá khởi điểm của top ở dưới mức đặt giá
      //// nâng giá khởi điểm

      if (cao_nhat.gia_tra_cao_nhat < yeu_cau.gia_tra_cao_nhat) {
        //await dauGiaModel.add(dau_gia_rs); //need update not add

        /// đủ điều kiện ghi bảng
        yeu_cau.status = 1
        await dauGiaModel.updateDauGia(id_yc,yeu_cau)
        await sanPhamModel.updateGiaHT(id_sp, dau_gia_rs.gia_khoi_diem);
      } 
      ///// không đủ điều kiện ghi bảng
      else {
        await dauGiaModel.updateStatusById(id_yc, 2);
      }
    /// đủ yêu cầu để trở thành top
    } else {

        yeu_cau.status = 1
        yeu_cau.gia_khoi_diem = cao_nhat.gia_tra_cao_nhat;

        await dauGiaModel.updateDauGia(id_yc,yeu_cau)
        //// 
        await sanPhamModel.updateGiaHT(id_sp, cao_nhat.gia_tra_cao_nhat)
    }

    /// xử lí nhận xét khi chấp thuận

    let user = await taiKhoanModel.findById(yeu_cau.id_nguoi_dau_gia)
    let diem = user.diem_danhgia_duong + 1;
    // nang diem danh gia trong bang tk
    await taiKhoanModel.updateNangDiemDanhGia(yeu_cau.id_nguoi_dau_gia, diem);
  
    // them danh gia
    const danhGia = {
      nguoi_danh_gia: id,
      nguoi_bi_danh_gia: yeu_cau.id_nguoi_dau_gia,
      nhan_xet: "cảm ơn bạn đã tham gia đấu giá",
      isDuong: true
    }
    await danhGiaModel.add(danhGia)

    return res.json({
        messeage: "accepted is done",
    });
  }
});

router.get("/huy-bo", async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const id_yc = req.query.yeu_cau;
    let yeu_cau = await dauGiaModel.findByIdDauGia(id_yc);

    if (yeu_cau == null || yeu_cau.status != 3) {
      return res.status(400).json({
        messeage: "request not found or invalid",
      });
    }
    if(yeu_cau.id_nguoi_ban != id){
      return res.status(401).json({
          messeage: "User Not Authorized",
      });
    }
    await dauGiaModel.updateStatusById(id_yc, 2);

    //// xử lí nhận xét khi hủy bỏ

    let user = await taiKhoanModel.findById(yeu_cau.id_nguoi_dau_gia)

    let diem = user.diem_danhgia_am + 1;
    // nang diem danh gia trong bang tk
    await taiKhoanModel.updateHaDiemDanhGia(yeu_cau.id_nguoi_dau_gia, diem);
  
    // them danh gia
    const danhGia = {
      nguoi_danh_gia: id,
      nguoi_bi_danh_gia: yeu_cau.id_nguoi_dau_gia,
      nhan_xet: "sau khi xem xét chúng tôi phát hiện sự gian lận nên lượt đấu giá này sẽ không được chấp nhận",
      isDuong: false
    }
    await danhGiaModel.add(danhGia)

    return res.status(200).json({
        messeage: "unaccepted is done",
    });

});

module.exports = router;
