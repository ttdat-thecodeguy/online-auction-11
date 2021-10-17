const express = require('express');
const { validate } = require('uuid');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const taiKhoanModel = require('../../services/taiKhoanModel')
const validateSchema = require('../../middlewares/validate');
const schemaUser = require('../../schema/taiKhoanSchema.json');
const router = express.Router();

router.get('/detail-user', async function (req, res) {
  const id = +req.query.id_nguoi_dung;
  const userDetail = await taiKhoanModel.findById(id);
  if(userDetail.length !== 0){
    return res.json({
      userDetail
    }).status(200);
  }
  return res.json({
    message: 'Không tìm thấy tài khoản cần tìm',
  }).status(200);
});

router.get('/list-user-upgrade', async function (req, res) {
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
});

router.get('/list-user/', async function (req, res){
  const listUser = await taiKhoanModel.findAll();
  let total = await taiKhoanModel.countUser();

  if (listUser.length == 0) {
      return res.json([]).status(201)
  }

  return res.json({
      listUser
  }).status('200');
});

router.post('/add-user/', validateSchema(schemaUser.them_nguoi_dung), async function(req, res){
    const userExists = await taiKhoanModel.findByEmail(req.body.email);
    
    if(userExists !== null){
      return res.json({
        message: 'Tài khoản đã tồn tại'
      }).status(201);
    }
    const account = req.body;
    const matkhau = await bcrypt.genSalt(6);

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(matkhau, salt);

    account.mat_khau = hash;

    const userAdded = await taiKhoanModel.add(req.body);
    console.log(userAdded);
    if(userAdded.length !== 0){
      return res.json({
        message: 'Thêm người dùng thành công',
        mat_khau: matkhau,
      }).status(200);
    }
    return res.json({
      message: 'Thêm người dùng thất bại',
    }).status(201);
});

router.delete('/delete-user/', async function(req, res){
  const id = +req.query.id_nguoi_dung;

  if(!id){
    return res.json({
      message: 'Không tìm thấy người dùng cần xóa'
    }).status(201);
  }

  const userDeleted = await taiKhoanModel.del(id);
  if(userDeleted){
    return res.json({
      message: 'Người dùng đã được xóa',
    }).status(200);
  }
  return res.json({
    message: 'Người dùng không tồn tại',
  }).status(201);
});

router.put('/update-user-infor/', validateSchema(schemaUser.cap_nhat_nguoi_dung), async function(req, res){
  const id = +req.body.id_nguoi_dung;
  const userObject = req.body;
  
  if(!id){
    return res.json({
      message: 'Không tìm thấy người dùng cần cập nhật'
    }).status(201);
  }

  const userUpdated = await taiKhoanModel.update(id, userObject);
  if(userUpdated){
    return res.json({
      message: 'Tài khoản người dùng cập nhật thành công',
      user: userObject
    }).status(200);
  }
  return res.json({
    message: 'Cập nhật tài khoản thất bại'
  }).status(201);
});

router.put('/update-user-level/', validateSchema(schemaUser.cap_nhat_cap_bac), async function(req, res){
  const id = +req.body.id_nguoi_dung;
  const level = +req.body.id_quyen_han;

  if(!id){
    return res.json({
      message: 'Không tìm thấy người dùng cần cập nhật'
    }).status(201);
  }

  const userUpdated = await taiKhoanModel.updateCapBac(id, level);
  if(userUpdated){
    return res.json({
      message: 'Cấp bậc người dùng cập nhật thành công',
      user: level
    }).status(200);
  }

  return res.json({
    message: 'Cập nhật cấp bậc thất bại'
  }).status(201);
});

module.exports = router;