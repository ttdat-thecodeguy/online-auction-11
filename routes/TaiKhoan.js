const express = require("express");
const taiKhoanModel = require("../services/taiKhoanModel");
const mailer = require("../utils/mailer");
const bcrypt = require("bcrypt");

const router = express.Router();
const saltRounds = 10;

router.get("/details", async function (req, res) {
  //set header = x-access-token

  const id = req.accessTokenPayload.id || 0;
  const user = await taiKhoanModel.findById(id);
  if (user == null || user.OTP != null) {
    res.status(401).json({
      messeage: "user not found or invalid",
    });
  }
  delete user.OTP;
  delete user.mat_khau;
  return res.json(user);
});

router.post("/doi-mat-khau", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;
  const user = await taiKhoanModel.findById(id);
  if (user == null || user.OTP != null) {
    res.status(401).json({
      messeage: "user not found or invalid",
    });
  }
  if (bcrypt.compareSync(req.body.mat_khau_cu, user.mat_khau) === false) {
    return res.status(401).json({
      messeage: "old password is wrong",
    });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.mat_khau_moi, salt);
  const affected_rows = await taiKhoanModel.updateMatKhau(id, hash);
  if (affected_rows == 0) {
    return res.status(500).end();
  }
  return res.json({
    messeage: "password is updated",
  });
});

router.post("/cap-nhat", async (req, res) => {
  const id = req.accessTokenPayload.id || 0;

  const account = req.body;
  const affected_rows = await taiKhoanModel.updateInfo(id, account);

  if (affected_rows === 0) {
    return res.status(304).end();
  }


  res.json(account);
});

module.exports = router;
