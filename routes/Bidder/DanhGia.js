const express = require('express');
const router = express.Router();

const taiKhoanModel = require('../../services/taiKhoanModel');
const danhGiaModel = require('../../services/danhGiaModel');

/////////// DANH GIA

router.get('/nhan-xet-cua-toi', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    if (id == 0) {
        res.status(401).json({
            messeage: 'User Invalid'
        });
    }
    let nhan_xet = await danhGiaModel.findByNguoiDanhGia(id);

    nhan_xet = nhan_xet.map(nx => {
        return {
            nguoi_bi_danh_gia: {
                id: nx.id_nguoi_dung,
                ho_ten: nx.ho_ten,
                email: nx.email,
                diem_duong: nx.diem_danhgia_duong,
                diem_am: nx.diem_danhgia_am
            },
            nhan_xet: nx.nhan_xet,
            diem: nx.isDuong ? 1 : -1
        };
    });
    return res.status(200).json(nhan_xet);
});

router.get('/da-danh-gia', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const target = req.query.target;
    if (id == 0) {
        res.status(401).json({
            messeage: 'User Invalid'
        });
    }
    const nhan_xet = await danhGiaModel.isDaDanhGia(id, target);
    if (nhan_xet == null) {
        return res.json({
            isRate: false
        });
    }
    else {
        return res.json({
            isRate: true
        });
    }
});

router.get('/danh-gia-ve-toi', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    if (id == 0) {
        return res.status(401).json({
            messeage: 'User Invalid'
        });
    }
    let nhan_xet = await danhGiaModel.findByNguoiBiDanhGia(id);

    nhan_xet = nhan_xet.map(nx => {
        return {
            nguoi_danh_gia: {
                id: nx.id_nguoi_dung,
                ho_ten: nx.ho_ten,
                email: nx.email,
                diem_duong: nx.diem_danhgia_duong,
                diem_am: nx.diem_danhgia_am
            },
            nhan_xet: nx.nhan_xet,
            diem: nx.isDuong ? 1 : -1
        };
    });

    return res.status(200).json(nhan_xet);
});

router.post('/nang-diem-danh-gia', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const id_target = req.query.target;
    const nhan_xet = req.body.nhan_xet;

    if (id == id_target) {
        return res.json({
            messeage: 'you must not evaluate your self',
        });
    }
    const user = await taiKhoanModel.findById(id_target);
    if (user == null) {
        return res.status(401).json({
            messeage: 'user not found or invalid',
        });
    }
    let diem = user.diem_danhgia_duong + 1;
    // nang diem danh gia trong bang tk
    await taiKhoanModel.updateNangDiemDanhGia(id_target, diem);

    // them danh gia
    const danhGia = {
        nguoi_danh_gia: id,
        nguoi_bi_danh_gia: id_target,
        nhan_xet,
        isDuong: true
    };
    await danhGiaModel.add(danhGia);

    return res.json({
        messeage: 'evaluate done',
    });
});

router.post('/ha-diem-danh-gia', async (req, res) => {
    const id = req.accessTokenPayload.id || 0;
    const id_target = req.query.target;
    const nhan_xet = req.body.nhan_xet;
    if (id == id_target) {
        return res.status(401).json({
            messeage: 'you must not evaluate your self',
        });
    }
    const user = await taiKhoanModel.findById(id_target);
    if (user == null || user.OTP != null) {
        return res.status(401).json({
            messeage: 'user not found or invalid',
        });
    }
    let diem = user.diem_danhgia_am + 1;
    await taiKhoanModel.updateHaDiemDanhGia(id_target, diem);

    // them danh gia
    const danhGia = {
        nguoi_danh_gia: id,
        nguoi_bi_danh_gia: id_target,
        nhan_xet,
        isDuong: false
    };
    await danhGiaModel.add(danhGia);

    return res.json({
        messeage: 'evaluate done',
    });
});

module.exports = router;
