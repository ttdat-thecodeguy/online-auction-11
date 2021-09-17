const express = require("express");
const router = express.Router();

const taiKhoanModel = require("../../services/taiKhoanModel");
const danhGiaModel = require("../../services/danhGiaModel")

/////////// DANH GIA

router.post("/nang-diem-danh-gia", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const id_target = req.query.target;
  if (id == id_target) {
    return res.json({
      messeage: "you must not evaluate your self",
    });
  }
  const user = await taiKhoanModel.findById(id_target);
  if (user == null || user.OTP != null) {
    res.status(401).json({
      messeage: "user not found or invalid",
    });
  }
  let diem = user.diem_danhgia_duong + 1;
  // nang diem danh gia trong bang tk
  await taiKhoanModel.updateNangDiemDanhGia(id_target, diem);

  // them danh gia
  const danhGia = {
    nguoi_danh_gia: id,
    nguoi_bi_danh_gia: id_bi_danh_gia,
    nhan_xet,
    isDuong: true
  }
  await danhGiaModel.add(danhGia)

  return res.json({
    messeage: "evaluate done",
  });
});

router.post("/ha-diem-danh-gia", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const id_target = req.query.target;
  if (id == id_target) {
    return res.json({
      messeage: "you must not evaluate your self",
    });
  }
  const user = await taiKhoanModel.findById(id_target);
  if (user == null || user.OTP != null) {
    res.status(401).json({
      messeage: "user not found or invalid",
    });
  }
  let diem = user.diem_danhgia_am + 1;
  await taiKhoanModel.updateHaDiemDanhGia(id_target, diem);

  // them danh gia
  const danhGia = {
    nguoi_danh_gia: id,
    nguoi_bi_danh_gia: id_bi_danh_gia,
    nhan_xet,
    isDuong: false
  }
  await danhGiaModel.add(danhGia)

  return res.json({
    messeage: "evaluate done",
  });
});

module.exports = router;
