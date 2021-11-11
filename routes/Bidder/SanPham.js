const Authentiaction = require('../../middlewares/auth');

const express = require('express');
const router = express.Router();

const sanPhamModel = require('../../services/sanPhamModel');
const donHangModel = require('../../services/datHangModel');
const mailer = require('../../utils/mailer');
const dauGiaModel = require('../../services/dauGiaModel');
///// Mua Sản Phẩm

router.post('/mua-san-pham', [Authentiaction.requireUser], async (req, res) => {
    let don_hang = req.body;
    let id_nguoi_mua = req.accessTokenPayload.id || 0;

    let sp = await sanPhamModel.findById(don_hang.id_sp);
    if (sp.length != 0) {
        sp = sp[0];
    } else {
        return res.json({
            messeage: 'product not found'
        });
    }

    if (sp.isLocked == true) {
        return res.json({
            messeage: 'product is locked'
        });
    }

    const don_hang_rs = {
        id_sp: don_hang.id_sp,
        id_nguoi_mua,
        id_nguoi_ban: sp.id_nguoi_ban,
        gia_mua: sp.gia_mua_ngay,
        ngay_dat_hang: new Date(),
    };
    console.log(sp);
    console.log(don_hang_rs);

    await donHangModel.themDonHang(don_hang_rs);
    /// thông báo cho người mua
    await mailer.send({
        from: 'online.auction.11team@gmail.com',
        to: `${sp.email}`,
        subject: `OnlineAuction11: Món Hàng ${sp.ten_sp} của bạn đã có người mua.`,
        html: `
              Xin chào ${sp.ho_ten}, Món hàng ${sp.ten_sp} của bạn đã kết thúc.
              <br> 
                  Chúng tôi thông báo với bạn rằng món hàng của bạn đã có người mua
              <br>
              (Đây là thư tự động vui lòng không phản hồi)
              `,
    });
    /// khóa toàn bộ cuộc đấu giá đang diễn ra
    await dauGiaModel.updateStatus(sp.id_sp, 2);

    await sanPhamModel.updateStatus(sp.id_sp, 1);
    return res.json({
        messeage: 'product buy done'
    });
});

module.exports = router;