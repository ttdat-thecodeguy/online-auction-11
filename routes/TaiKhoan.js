const express = require('express');

const taiKhoanModel = require("../services/taiKhoanModel");
const router = express.Router();

router.get('/details', async function (req, res) {
    const id = req.query.id;
    const user = await taiKhoanModel.findById(id);
    if (user == null || user.OTP != null) {
      res.status(401).json({
        messeage: "user not found or invalid",
      });
    }
    delete user.OTP;
    delete user.mat_khau;
    return res.json(user);
})

module.exports = router;