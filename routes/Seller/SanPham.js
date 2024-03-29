﻿const express = require("express");
const router = express.Router();

const Authentiaction = require("../../middlewares/auth");
const multer = require("multer");
const upload = multer();

const { cloudinary } = require("../../utils/cloudinary");
const anhModel = require("../../services/anhModel");
const { v4: uuidv4 } = require("uuid");

const sanPhamModel = require("../../services/sanPhamModel");
const danhMucModel = require("../../services/danhMucModel");
const Utils = require("../../utils/Utils");

const mailer = require("../../utils/mailer");
const dauGiaModel = require("../../services/dauGiaModel")

router.get('/san-pham/con-ton-tai', async (req, res) => {
  let id_nguoi_ban = req.accessTokenPayload.id || 0;
  let product = await sanPhamModel.findAllBySellerByStatus(id_nguoi_ban);
  let arr_product = [];
  for (let i = 0; i < product.length; i++) {
    arr_product.push(Utils.mapProduct(product[i], product[i].id_sp));
  }
  return res.json(arr_product);
})

router.post("/them-danh-muc", async (req, res) => {
  let { ten, cap_danh_muc } = req.body;
  let data = {
    ten,
    cap_danh_muc
  };
  let danh_muc = await danhMucModel.add(data);

  data.id_danh_muc = danh_muc[0];
  return res.json(data);
});

router.get("/danh-sach-san-pham", async (req, res) => {
  let id_nguoi_ban = req.accessTokenPayload.id || 0;
  let product = await sanPhamModel.findAllBySeller(id_nguoi_ban);
  let arr_product = [];
  for (let i = 0; i < product.length; i++) {
    arr_product.push(Utils.mapProduct(product[i], product[i].id_sp));
  }
  return res.json(arr_product);
});

router.post("/them-san-pham", [upload.any()], async (req, res) => {
  const product = req.body;
  let id_nguoi_ban = req.accessTokenPayload.id || 0;
  console.log(req.files);
  let anh_arr = req.files[0].originalname.split(".");
  let anh = anh_arr[0] + uuidv4().toString();
  product.anh = anh + "." + anh_arr[1];
  product.publish_date = new Date();
  if (id_nguoi_ban == 0) {
    res.json({
      messeage: "seller not found"
    });
  }
  if (product.publish_date > product.end_date) {
    res.json({
      messeage: "input not valid"
    });
  }
  product.id_nguoi_ban = id_nguoi_ban;

  if (product.isGiaHan == 1) {
    let end_date = new Date(product.end_date);
    end_date = new Date(end_date.getTime() + 10 * 60000);
    product.end_date = end_date;
  }

  const result = await sanPhamModel.add(product);
  try {
    for (let i = 0; i < req.files.length; i++) {
      if (i != 0)
        anh = req.files[i].originalname.split(".")[0] + uuidv4().toString();
      let res = await cloudinary.uploader.upload(
        `data:${req.files[i].mimetype};base64,${req.files[i].buffer.toString(
          "base64"
        )}`,
        {
          resource_type: "image",
          public_id: `product/${anh}`,
          overwrite: false
        },
        function (error) {}
      );
      // console.log(res)
      // anh.id_sp = result
      await anhModel.add({
        ten: anh,
        id_sp: result
      });
    }
  } catch (err) {}
  product.path = Utils.toPath(product.ten, result);
  return res.json({
    messeage: "Add product",
    product: product
  });
});

//// chỉ cho phép sửa thông tin mô tả của sản phâmn

router.get("/sua-san-pham", async (req, res) => {
  let id = req.query.id_sp;
  let id_nguoi_ban = req.accessTokenPayload.id || 0;
  let product = await sanPhamModel.findById(id);

  if (product == null || product.length == 0) {
    return res.status(404).json({
      messeage: "product not found"
    });
  }

  product = product[0];

  if (product.id_nguoi_ban != id_nguoi_ban) {
    return res.status(401).json({
      messeage: "user unauthorized"
    });
  }

  let product_rs = {};
  product_rs.id_sp = product.id_sp;
  product_rs.mo_ta = product.mo_ta;

  return res.status(200).json(product_rs);
});

router.patch("/sua-san-pham", async (req, res) => {
  
  let product = req.body;
  let id_nguoi_ban = req.accessTokenPayload.id || 0;

  let product_rs = await sanPhamModel.findById(product.id_sp);

  
  
  if (product_rs == null || product_rs.length == 0) {
    return res.status(404).json({
      messeage: "product not found"
    });
  }
  product_rs = product_rs[0];

  if (product_rs.id_nguoi_ban != id_nguoi_ban) {
    return res.status(401).json({
      messeage: "user unauthorized"
    });
  }

  if (product_rs.length > product.mo_ta_moi) {
    return res.json(500).json({
      messeage: "describe not replaceable"
    });
  }

  let aff_rows = await sanPhamModel.updateMoTa(
    product.id_sp,
    product.mo_ta_moi
  );

  if (aff_rows == 0) {
    return res.status(500).json({
      messeage: "product not update"
    });
  }

  /// send mail
  let rows_dg = await dauGiaModel.findAllNguoiDauGia(product.id_sp);
 
  console.log(product_rs)

  product_rs.path = Utils.toPath(product_rs.ten_sp, product_rs.id_sp)



  for(let i = 0;i < rows_dg.length;i++){
    await mailer.send({
      from: 'online.auction.11team@gmail.com',
      to: `${rows_dg[i].email}`,
      subject: 'OnlineAuction11: Sản Phẩm Đã Thay Đổi Mô Tả',
      html: `
      Xin chào ${rows_dg[i].ho_ten}, Sản Phẩm Hiện Tại <a href="http://localhost:3000/san-pham/${product_rs.path}">${product_rs.ten_sp}</a>  Đã được thêm thông tin mô tả mới.      
      (Đây là thư tự động vui lòng không phản hồi)
      `,
    });
  }


  return res.status(200).json({
    messeage: "product update"
  });
});

module.exports = router;
