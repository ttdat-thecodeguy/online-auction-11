const express = require('express');
const router = express.Router();

const Authentiaction = require('../../middlewares/auth')
const multer  = require('multer')
const upload = multer()

const { cloudinary } = require('../../utils/cloudinary');
const anhModel = require('../../services/anhModel')

const sanPhamModel = require('../../services/sanPhamModel')

const Utils = require('../../utils/Utils')


router.post('/them-san-pham',[upload.any()],async (req, res)=>{
    const product = req.body;
    let id_nguoi_ban = req.accessTokenPayload.id || 0;
    console.log("id nguoi a" + id_nguoi_ban)
    let anh_arr = req.files[0].originalname.split(".")
    let anh = anh_arr[0] + uuidv4().toString() + "." + anh_arr[1]; 
    product.anh = anh
    product.publish_date = new Date()
    if(id_nguoi_ban == 0){
        res.json({
            messeage: "seller not found"
        })
    }
    if(product.publish_date > product.end_date){
        res.json({
            messeage: "input not valid"
        })
    }
    product.id_nguoi_ban = id_nguoi_ban

    if(product.isGiaHan == 1) {
        let end_date = new Date(product.end_date);
        end_date = new Date(end_date.getTime() + 10*60000);
        product.end_date = end_date
    }

    const result = await sanPhamModel.add(product)
    try{
        for(let i = 0;i < req.files.length;i++){
             if(i != 0) anh = req.files[i].originalname.split(".")[0] + uuidv4().toString() 
             let res = await cloudinary.uploader.upload(`data:${req.files[i].mimetype};base64,${req.files[i].buffer.toString('base64')}`,
             {resource_type: "image", public_id: `product/${anh}`,
             overwrite: false}, function(error) {   });
             // console.log(res)
             // anh.id_sp = result
             await anhModel.add({
                ten: anh + "." + req.files[i].originalname.split(".")[1],
                id_sp: result
            })
        }
    } catch(err){} 
    product.path = Utils.toPath(product.ten, result);
    return res.json({
        messeage: "Add product",
        product: product
    })
})
module.exports = router;