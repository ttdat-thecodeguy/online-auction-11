const jwt = require('jsonwebtoken');
const taiKhoanModel = require("../services/taiKhoanModel");
 


module.exports = { 
    requireUser: (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, 'SECRET_KEY');
        // console.log(decoded);
        req.accessTokenPayload = decoded;
        next();
      } catch (err) {
        console.log(err);
        return res.status(401).json({
          message: 'Invalid access token!'
        });
      }
    } else {
      return res.status(401).json({
        message: 'Access token not found!'
      });
    }
  },
  requireSeller:async (req, res, next)=> {
    const acc = await taiKhoanModel.findById(req.accessTokenPayload.id)
    if(acc.id_quyen_han == 2 || acc.id_quyen_han == 3){
      next();
    }else {
      return res.status(401).json({
        message: "User not authorized"
      })
    }
  },
  requireAdmin:async (req, res, next)=> {
    const acc = await taiKhoanModel.findById(req.accessTokenPayload.id)
    if(acc.id_quyen_han == 3){
      next();
    }else {
      return res.status(401).json({
        message: "User not authorized"
      })
    }
  },
  requireDiemDanhGia: async (req, res, next) => {
    const acc = await taiKhoanModel.findById(req.accessTokenPayload.id)
    let percent = ((acc.diem_danhgia_duong) / (acc.diem_danhgia_am + acc.diem_danhgia_duong)) * 100;
    
    if(percent >= 80 || (acc.diem_danhgia_duong == 0 && acc.diem_danhgia_am == 0)){
      next()
    } else{
      return res.status(401).json({
        message: "your evaluate point too low"
      })
    }



  }


}
