const express = require('express');
const taiKhoanModel = require('../services/taiKhoanModel')

const router = express.Router();

router.get('/details', async function (req, res) {
  //set header = x-access-token

  const id = req.accessTokenPayload.id || 0
  
  const user = await taiKhoanModel.findById(id)
  if(user == null){
      res.status(401).json({
          messeage: "user not found"
      })
  }
  delete user.OTP
  return res.json(user)
})

module.exports = router;