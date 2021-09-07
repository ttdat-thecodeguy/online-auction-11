const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const taiKhoanModel = require('../services/taiKhoanModel')
const mailer = require('../utils/mailer');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


router.post('/dang-ki', async function (req, res) {
  const account = req.body

  if(account.email == null || account.mat_khau == null)
  {
      return res.status(403).end();
  } else{
    const acc = await taiKhoanModel.findByEmail(account.email)
    if(acc == null){
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(account.mat_khau, salt);
            let OTP = Math.floor(Math.random() * 1000000)

            let expiredHours = new Date(Date.now() + 1 * 86400000); //thời gian hết hạn của mã kích hoạt

            const register = {
              email: account.email,
              ho_ten : account.ho_ten,
              dia_chi: account.dia_chi,
              mat_khau: hash,
              OTP,
              expired: expiredHours
            }

            await taiKhoanModel.add(register);
            mailer.send({
              from: 'online.auction.11team@gmail.com',
              to: `${register.email}`,
              subject: 'OnlineAuction11: Xác thực tài khoản của bạn.',
              html: `
              Xin chào ${register.ho_ten}, cảm ơn bạn đã đăng ký 1 tài khoản ở trang OnlineAuction.
              <br> 
                  Mã OTP của bạn là : ${OTP}
                  để xác minh email và kích hoạt tài khoản của bạn, xin hãy xác minh email của bạn trong vòng 24h.
              <br>
              (Đây là thư tự động vui lòng không phản hồi)
              `
          });

          return res.status(201).json({
              messeage: "Account registed"
          })
    } else {
      return res.status(304).json({
        messeage: "email is exists"
      });
    }
  }
})
router.post('/dang-ki/activation', async function (req, res) {
  let otp = req.body.otp || 0

  if (otp === 0) {
        return res.status(400).end();
  }
  console.log(otp)

  const user = await taiKhoanModel.findByOTP(otp)
  if(user == null || user.expired < new Date(Date.now()) ){
    return res.json({
      messeage: "User has been deleted or expired"
    })
  } else{
    console.log(user)
    await taiKhoanModel.resetOTP(user.id_nguoi_dung)
    const payload = { id: user.id_nguoi_dung }
    const opts = {
      expiresIn: 24 * 60 * 60// seconds
    }
    const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);
    
    return res.status(200).json({
      token: accessToken,
      user: user
    })
  }
})
router.post('/dang-nhap', async (req, res) => {
  const acc = await taiKhoanModel.findByEmail(req.body.email)
  if(acc != null){
    if (bcrypt.compareSync(req.body.mat_khau, acc.mat_khau) === false) {
      return res.status(401).json({
        messeage: "password is wrong",
        authentication: false
      });
    }

    const payload = { id: acc.id_nguoi_dung }
    const opts = {
      expiresIn: 24 * 60 * 60 // seconds
    }
    const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);

    delete acc.OTP

    return res.status(200).json({
      token: accessToken,
      user: acc
    })


  } else{
    res.status(401).json({
      messeage: "user not found",
      authentication: false
    })
  }
})


module.exports = router;