const express = require('express');
const router = express.Router();

const Authentication = require('../../middlewares/auth');

const taiKhoanModel = require('../../services/taiKhoanModel');
const sanPhamModel = require('../../services/sanPhamModel');
const dauGiaModel = require('../../services/dauGiaModel');
const camDauGiaModel = require('../../services/camDauGiaModel');
const Utils = require('../../utils/Utils');
const mailer = require('../../utils/mailer');

router.post('/tham-gia', [Authentication.requireUser, Authentication.requireDiemDanhGia], async function (req, res) {
    /*
          id_sp,
          gia_dat
      */
    const id = req.accessTokenPayload.id || 0;
    const sp_daugia = req.body;
    const id_sp = sp_daugia.id_sp || 0;
    const dat_gia = sp_daugia.gia_dat;

    let sp = await sanPhamModel.findById(id_sp);

    if (sp.length != 0) {
        sp = sp[0];
    }

    let now = new Date(Date.now());
    let expired = new Date(sp.end_date);

    /// Quá thời hạn
    if (now > expired) {
        return res.status(400).json({
            messeage: 'your product is expired',
            isWin: false
        });
    }

    /// nguoi ban khong duoc dau gia
    if (id == sp.id_nguoi_ban) {
        return res.status(400).json({
            messeage: 'seller not auction this product',
            isWin: false
        });
    }
    /////// kiểm tra người đấu giá có nằm trong diện cấm đấu giá không
    let isCamDauGia = await camDauGiaModel.findNguoiDung(id, id_sp);
    if (isCamDauGia != null) {
        return res.status(401).json({
            messeage: 'you are banned',
            isWin: false
        });
    }

    ////// Tính Toán Lượt đấu giá
    let luot_dau_gia = await dauGiaModel.countDauGiaBySanPham(id_sp);
    luot_dau_gia = luot_dau_gia.count;

    ///// set lại giá đặt nếu giá đặt = 0
    if (sp.gia_hien_tai == 0) {
        if (sp.buoc_gia == 0) gia_dat = 10000;
        else gia_dat = sp.buoc_gia;
    } else {
        gia_dat = sp.gia_hien_tai;
    }
    // khởi tạo kết quả
    let dau_gia_rs = {
        id_sp,
        gia_khoi_diem: gia_dat,
        id_nguoi_dau_gia: id,
        id_tra_cao_nhat: id,
        gia_tra_cao_nhat: dat_gia,
        id_nguoi_ban: sp.id_nguoi_ban,
        ngay_ket_thuc: sp.end_date,
        status: 1
    };
    //// cap nhat luot dau gia khi da tham gia
    let luotdaugia = luot_dau_gia + 1;
    await sanPhamModel.updateLuotDauGia(id_sp, luotdaugia);

    // kiểm tra người đấu giá là chiếu mới
    let nguoi_dau_gia = await taiKhoanModel.findById(id);
    if (nguoi_dau_gia.diem_danhgia_duong == 0 && nguoi_dau_gia.diem_danhgia_am == 0) {
        //// đặt status là pending
        dau_gia_rs.status = 3;
        await dauGiaModel.add(dau_gia_rs);
        return res.json({
            messeage: 'you need waiting for auction',
            isWin: false
        });
    }
    /// trường hợp đạt giá dưới mức giá
    if ((sp.gia_hien_tai + sp.buoc_gia) > dat_gia) {

        dau_gia_rs.status = 2;
        await dauGiaModel.add(dau_gia_rs);

        return res.json({
            messeage: 'lose. need higher price',
            isWin: false
        });
    }
    /// nếu chưa có lượt đấu giá nào cho sp này
    if (luot_dau_gia == 0) {
        ////// trường hợp được đấu giá #0
        await dauGiaModel.add(dau_gia_rs);

        await sanPhamModel.updateGiaHT(id_sp, gia_dat);
        /////send mail
        // #1 - Bán
        await mailer.send({
            from: 'online.auction.11team@gmail.com',
            to: `${sp.email}`,
            subject: 'OnlineAuction11: Chúc Mừng Bạn.',
            html: `
            Xin chào ${sp.ho_ten}, Chúc Mừng bạn, Sản Phẩm của bạn hiện đã có người đấu giá với giá mua ${gia_dat} là .
            (Đây là thư tự động vui lòng không phản hồi)
            `,
        });
        // #1 - ra giá
        await mailer.send({
            from: 'online.auction.11team@gmail.com',
            to: `${nguoi_dau_gia.email}`,
            subject: 'OnlineAuction11: Chúc Mừng Nhà Vô Địch.',
            html: `
            Xin chào ${nguoi_dau_gia.ho_ten}, Chúc Mừng bạn, hiện bạn đang dẫn đầu ${sp.ten_sp}.      
            <ul> 
                <li>giá mua: ${gia_dat}</li>
            <ul>
            (Đây là thư tự động vui lòng không phản hồi)
            `,
        });

        return res.json({messeage: 'win', isWin: true, gia_hien_tai: gia_dat}).status(200).end();
    }
    else {
        // find người đấu giá cao nhất
        let cao_nhat = await dauGiaModel.findDauGiaCaoNhat(id_sp);

        //// trường hợp giá đặt không vượt qua người cao nhất
        if ((cao_nhat.gia_tra_cao_nhat + sp.buoc_gia) > dat_gia) {

            dau_gia_rs.gia_khoi_diem = dat_gia;
            dau_gia_rs.id_tra_cao_nhat = cao_nhat.id_tra_cao_nhat;
            //// khi giá khởi điểm của top ở dưới mức đặt giá
            //// nâng giá khởi điểm
            if (cao_nhat.gia_tra_cao_nhat < dat_gia) {

                ////// trường hợp được đấu giá #1

                await dauGiaModel.add(dau_gia_rs);
                await sanPhamModel.updateGiaHT(id_sp, dau_gia_rs.gia_khoi_diem);
                //// trùng giá với cao nhất
            } else {
                dau_gia_rs.status = 2;
                await dauGiaModel.add(dau_gia_rs);
            }

            return res.json({
                messeage: 'lose. need higher price',
                isWin: false,
                gia_hien_tai: dau_gia_rs.gia_khoi_diem
            });
        } else {
            ////// trường hợp được đấu giá #2
            /// gán giá khởi điểm (giá mask hay giá mua từ người cũ)
            dau_gia_rs.gia_khoi_diem = cao_nhat.gia_tra_cao_nhat;

            await dauGiaModel.add(dau_gia_rs);

            //// cap nhat gia
            await sanPhamModel.updateGiaHT(id_sp, cao_nhat.gia_tra_cao_nhat);

            // #2 - Bán
            await mailer.send({
                from: 'online.auction.11team@gmail.com',
                to: `${sp.email}`,
                subject: 'OnlineAuction11: Chúc Mừng Bán.',
                html: `
                Xin chào ${sp.ho_ten}, Chúc Mừng bạn, Sản Phẩm của bạn bị canh tranh gay gắt ${sp.ten_sp}.      
                <ul> 
                    <li>giá mua: ${cao_nhat.gia_tra_cao_nhat}</li>
                <ul>
                (Đây là thư tự động vui lòng không phản hồi)
                `,
            });
            // #2 - ra giá
            await mailer.send({
                from: 'online.auction.11team@gmail.com',
                to: `${nguoi_dau_gia.email}`,
                subject: 'OnlineAuction11: Chúc Mừng Nhà Vô Địch.',
                html: `
                Xin chào ${nguoi_dau_gia.ho_ten}, Chúc Mừng bạn, hiện bạn đang dẫn đầu ${sp.ten_sp}.      
                <ul> 
                    <li>giá mua: ${cao_nhat.gia_tra_cao_nhat}</li>
                <ul>
                (Đây là thư tự động vui lòng không phản hồi)
                `,
            });
            // #2 - giữ giá
            await mailer.send({
                from: 'online.auction.11team@gmail.com',
                to: `${cao_nhat.email}`,
                subject: 'OnlineAuction11: Chúc Mừng Nhà Vô Địch.',
                html: `
                Xin chào ${cao_nhat.ho_ten}, Xin Chia Buồn, Sản Phẩm Hiện Tại ${sp.ten_sp}  Đã Bị đặt giá trên.      
                (Đây là thư tự động vui lòng không phản hồi)
                `,
            });

            // thông báo thắng cuộc
            return res.json({messeage: 'win', isWin: true, gia_hien_tai: cao_nhat.gia_tra_cao_nhat}).status(200).end();
        }
    }
});

router.get('/lich-su', async (req, res) => {
    let history = await
        dauGiaModel.findByIdSanPham(req.query.san_pham);
    history = history.map(his => {
        his.hoten_mask = Utils.masking(his.ho_ten);
        return {...his};
    });
    return res.json(history).end();
});

///////////// API CHỈ ĐỂ TEST

router.get('/update-status', async (req, res) => {
    const id = req.query.id_sp;
    const status = req.query.status;
    await dauGiaModel.updateStatus(id, status);
    res.json({
        messeage: 'update successfully'
    }).end();
});

module.exports = router;
