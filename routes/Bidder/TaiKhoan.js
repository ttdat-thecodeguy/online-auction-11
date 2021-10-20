const express = require('express');
const taiKhoanModel = require('../../services/taiKhoanModel');
const mailer = require('../../utils/mailer');
const dauGiaModel = require('../../services/dauGiaModel');

const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = 10;

const Utils = require('../../utils/Utils');

router.get('/details', async function (req, res) {
    //set header = x-access-token
    const id = req.accessTokenPayload.id || 0;
    const user = await taiKhoanModel.findById(id);
    if (user == null || user.OTP != null) {
        res.status(401).json({
            messeage: 'user not found or invalid',
        });
    }
    delete user.OTP;
    delete user.mat_khau;
    return res.json(user);
});

///////////// LỊCH SỬ ĐẤU GIÁ

router.get('/lich-su-dau-gia', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;

    let rows = await dauGiaModel.findByNguoiDauGia(id);
    rows = rows.map((r) => {
        return {
            ten_sp: r.ten_sp,
            anh: r.anh,
            dau_gia: {
                gia_khoi_diem: r.gia_tra,
                gia_mua: r.gia_mua,
            },
            status: {
                id: r.status,
                ten: r.ten_status,
            },
            ngay_dat: r.ngay_dat,
            path: Utils.toPath(r.ten_sp, r.id_sp)
        };
    });
    return res.status(200).json(rows);
});

router.post('/doi-mat-khau', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const user = await taiKhoanModel.findById(id);
    if (user == null || user.OTP != null) {
        res.status(401).json({
            messeage: 'user not found or invalid',
        });
    }
    if (bcrypt.compareSync(req.body.mat_khau_cu, user.mat_khau) === false) {
        return res.status(401).json({
            messeage: 'old password is wrong',
        });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.mat_khau_moi, salt);
    const affected_rows = await taiKhoanModel.updateMatKhau(id, hash);
    if (affected_rows == 0) {
        return res.status(500).end();
    }
    return res.json({
        messeage: 'password is updated',
    });
});

router.get('/yeu-cau-nang-cap/tim-kiem', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const quyen_han = req.query.quyen_han;

    const requirement = await taiKhoanModel.findNangCapTKById(id, quyen_han);
    if (requirement == null) {
        return res.json({
            isUpRole: false
        });
    } else {
        return res.json({
            isUpRole: true
        });
    }
});

router.get('/yeu-cau-nang-cap/yeu-cau', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const quyen_han = req.query.quyen_han;

    const user = await taiKhoanModel.findById(id);
    if (user.id_quyen_han == quyen_han) {
        return res.status(400).json({
            messeage: 'you are at role',
        });
    }

    if (user.id_quyen_han > parseInt(quyen_han)) {
        return res.status(400).json({
            messeage: 'you cant down role',
        });
    }

    const requirement = await taiKhoanModel.findNangCapTK(id);
    if (requirement != null) {
        if (requirement.id_quyen_han_mong_muon != quyen_han) {
            await taiKhoanModel.updateYeuCau(id, quyen_han);
        } else {
            return res.json({
                messeage: 'you already require it'
            });
        }
    } else {
        await taiKhoanModel.addNangCapTK({
            id_nguoi_dung: id,
            id_quyen_han_mong_muon: quyen_han,
        });
    }

    return res.status(200).json({
        messeage: 'require successful',
    });
});

router.patch('/cap-nhat', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;

    const account = req.body;
    const affected_rows = await taiKhoanModel.updateInfo(id, account);

    if (affected_rows === 0) {
        return res.status(304).end();
    }

    res.json(account);
});

module.exports = router;
