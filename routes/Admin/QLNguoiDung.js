const express = require('express');

const taiKhoanModel = require('../../services/taiKhoanModel')
const router = express.Router();

router.get('/nguoi-dung-cho-nang-cap', async function (req, res) {
  let rows = await taiKhoanModel.findAccountWaitingUpgrade()
  rows = rows.map(r => {
      return {
        id_nguoi_dung: r.id_nguoi_dung,
        email: r.email,
        ho_ten: r.ho_ten,
        quyen_mong_muon: r.ten
      }
  })
  return res.json(rows)
})

module.exports = router;