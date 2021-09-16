const express = require('express');
const router = express.Router();

const sanPhamModel = require('../services/sanPhamModel')
const Utils = require('../utils/Utils')


////// search
//Tìm Kiếm Theo tên sản phẩm hoặc danh mục

router.get('/tim-kiem', async (req, res)=>{
    let name = req.query.name;
    let cate = req.query.cate;
    let product = null;
    if(name != null && cate == null) product = await sanPhamModel.findByName(name)
    else if(cate != null && name == null) {
        if(isNaN(parseInt(cate))){
            product = await sanPhamModel.findByCateName(cate)
        }else{
            product = await sanPhamModel.findByCateId(parseInt(cate))
        }
    }
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
    
    // let now = new Date(Date.now())
    // let end_date = new Date(product.end_date)
    
    // if(now > end_date){
    //     res.json({
    //         messeage: "product is expired"   
    //     }).status(200)
    // }

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


module.exports = router;