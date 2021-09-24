const express = require('express');
const router = express.Router();

const donHangModel = require('../../services/datHangModel')
const taiKhoanModel = require('../../services/taiKhoanModel')
const danhGiaModel = require('../../services/danhGiaModel')

router.get('/thong-ke-don-hang', async function (req, res) {
    let id_nguoi_ban = req.accessTokenPayload.id || 0;

    let don_hang = await donHangModel.ThongKeDonHang(id_nguoi_ban)
    don_hang = don_hang.map(dh => {
        delete dh.id_trang_thai
        delete dh.status
        return {...dh}
    })
    return res.status(200).json(don_hang)
})
/*
    {
        id_nguoi_mua
        id_sp
    }
*/
router.post('/huy-don-hang', async (req, res)=>{
    let id_nguoi_ban = req.accessTokenPayload.id || 0;
    let dat_hang = req.body
    let aff_rows = await donHangModel.capNhatTrangThai(dat_hang.id_nguoi_mua, dat_hang.id_sp, id_nguoi_ban , 3)
    if(aff_rows == 0){
        return res.status(500).json({
            messeage: "cant cancel this order"
        })
    }
    /// đánh giá khách hàng
    const biHuy = await taiKhoanModel.findById(dat_hang.id_nguoi_mua);

    let diem = biHuy.diem_danhgia_am + 1;
    await taiKhoanModel.updateHaDiemDanhGia(dat_hang.id_nguoi_mua, diem);

    // them danh gia
    const danhGia = {
        nguoi_danh_gia: id_nguoi_ban,
        nguoi_bi_danh_gia: dat_hang.id_nguoi_mua,
        nhan_xet: "Người Mua Không Chịu Thanh Toán",
        isDuong: false
    }
    await danhGiaModel.add(danhGia)


    return res.status(200).json({
        messeage: "order cancel"
    })
})

router.post('/chap-nhan-don-hang', async (req, res)=>{
    let id_nguoi_ban = req.accessTokenPayload.id || 0;
    let dat_hang = req.body
    let aff_rows = await donHangModel.capNhatTrangThai(dat_hang.id_nguoi_mua, dat_hang.id_sp, id_nguoi_ban , 2)
    if(aff_rows == 0){
        return res.status(500).json({
            messeage: "Order cant update"
        })
    }
    /// đánh giá khách hàng
    const chapThuan = await taiKhoanModel.findById(dat_hang.id_nguoi_mua);

    let diem = chapThuan.diem_danhgia_duong + 1;
    await taiKhoanModel.updateNangDiemDanhGia(dat_hang.id_nguoi_mua, diem);

    // them danh gia
    const danhGia = {
        nguoi_danh_gia: id_nguoi_ban,
        nguoi_bi_danh_gia: dat_hang.id_nguoi_mua,
        nhan_xet: "Chúc Mừng Bạn Đã Nhận được hàng",
        isDuong: true
    }
    await danhGiaModel.add(danhGia)


    return res.status(200).json({
        messeage: "order complete"
    })
})

module.exports = router;