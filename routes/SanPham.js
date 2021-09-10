const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Authentiaction = require('../middlewares/auth')
const multer  = require('multer')
const upload = multer()

const { cloudinary } = require('../utils/cloudinary');
const anhModel = require('../services/anhModel')
const sanPhamModel = require('../services/sanPhamModel')

const Utils = require('../utils/Utils')

// app.get('/api/images', async (req, res) => {
//     const { resources } = await cloudinary.search
//         .expression('folder:dev_setups')
//         .sort_by('public_id', 'desc')
//         .max_results(30)
//         .execute();

//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
// });



////// search
//Tìm Kiếm Theo tên sản phẩm hoặc danh mục

router.get('/tim-kiem', async (req, res)=>{
    let name = req.query.name;
    let cate = req.query.cate;
    let product = null;
    if(name != null && cate == null) product = await sanPhamModel.findByName(name)
    else if(cate != null && name == null) product = await sanPhamModel.findByCate(parseInt(cate))
    else if(name == null && cate == null) {
        res.json({
            messeage: "no condition query"
        }).status(500)
    }else{
        res.json({
            messeage: "name or cate query"
        }).status(500)
    }
    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json(arr_product)
})

router.get('/sap-xep', async (req, res) =>{
    let time = req.query.time
    let price = req.query.price
    let product = null;
    if(time == null && price == null){
        res.json({
            messeage: "no condition query"
        }).status(500)
    }

    else if(time != null && price == null){
        product = await sanPhamModel.filterSanPham("end_date", "desc", Number.MAX_SAFE_INTEGER)
    }
    ///cần hỏi thầy là giá nào
    else if(time == null && price != null){
        product = await sanPhamModel.filterSanPham("gia_dat", "asc", Number.MAX_SAFE_INTEGER)
    }

    else {
        return res.json({
            messeage: "time or price query"
        })
    }
    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json(arr_product)
})



///// get details

router.get('/details/:name', async (req, res) => {
    let id = req.params.name.split("-")[0] || 0;
    let product = await sanPhamModel.findById(id);

    if(product == null || product.length == 0){
        res.json({
            messeage: "Product not found"
        }).status(404)
    }
    let anh = await sanPhamModel.findImageById(id)
    product =  Utils.mapProduct(product[0], id, anh)
    return res.json(product)
})

router.get("/5-san-pham-gan-ket-thuc", async (req, res)=>{
    let product = await sanPhamModel.filterSanPham("end_date","asc",5)
    if(product == null || product.length == 0){
        return res.json({
            messeage: "product not found"
        })
    }
    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json(arr_product)
})

router.get("/5-san-pham-nhieu-luot-ra-gia", async (req, res)=>{
    let product = await sanPhamModel.filterSanPham("luot_daugia","desc",5)
    if(product == null || product.length == 0){
        return res.json({
            messeage: "product not found"
        })
    }
    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json(arr_product)
})

router.get("/5-san-pham-gia-cao-nhat", async (req, res)=>{
    let product = await sanPhamModel.filterSanPham("gia_dat","desc",5)
    if(product == null || product.length == 0){
        return res.json({
            messeage: "product not found"
        })
    }
    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json(arr_product)
})

//// CRUD

router.post('/them-san-pham',[upload.any(), Authentiaction.requireUser, Authentiaction.requireSeller],async (req, res)=>{
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