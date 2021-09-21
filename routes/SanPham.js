const express = require('express');
const router = express.Router();

const sanPhamModel = require('../services/sanPhamModel')
const Utils = require('../utils/Utils')


////// search
//Tìm Kiếm Theo tên sản phẩm hoặc danh mục

router.get('/tim-kiem', async (req, res)=>{
    let name = req.query.name;
    let cate = req.query.cate;
    
    //// Order

    let time = req.query.orderTime
    let price = req.query.orderPrice
    
    //// paging
    var per_page = req.query.per_page || 10;
    var page = req.query.current_page || 1;

    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;

    let product = null;
    
    let t = null
    if(name != null && cate == null){ 
        product = await sanPhamModel.findByNameWithPaging(name, offset, per_page)

        /// order by name
        if(time != null && price == null){
            product = await sanPhamModel.filterByNameWithPaging(name, offset, per_page, "end_date", "desc")
        }
        else if(time == null && price != null){
            product = await sanPhamModel.filterByNameWithPaging(name, offset, per_page,"gia_hien_tai", "asc")
        }
     
        t = await sanPhamModel.countByName(name)
    }

    else if(cate != null && name == null) {
        if(isNaN(parseInt(cate))){
            product = await sanPhamModel.findByCateName(cate, offset, per_page)

            /// order by cate id
            if(time != null && price == null){
                product = await sanPhamModel.filterByCateNameWithPaging(cate, offset, per_page, "end_date", "desc")
            }
            else if(time == null && price != null){
                product = await sanPhamModel.filterByCateNameWithPaging(cate, offset, per_page, "gia_hien_tai", "asc")
            }
        

            t = await sanPhamModel.countByCateName(cate)
        }else{
            product = await sanPhamModel.findByCateId(parseInt(cate),offset, per_page)

            /// order by cate id
            if(time != null && price == null){
                product = await sanPhamModel.filterByCateIdWithPaging(parseInt(cate), offset, per_page,"end_date", "desc")
            }
            else if(time == null && price != null){
                product = await sanPhamModel.filterByCateIdWithPaging(parseInt(cate), offset, per_page,"gia_hien_tai", "asc")
            }
        
            t = await sanPhamModel.countByCateId(parseInt(cate))
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
    let to = offset + product.length;
    let last_page = Math.ceil(t.count / per_page);

    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json({
        products: arr_product,
        count: t.count,
        to,
        last_page
    })
})


///////////// GARBAGE

// router.get('/sap-xep', async (req, res) =>{
//     let time = req.query.time
//     let price = req.query.price
//     let product = null;
//     if(time == null && price == null){
//         res.json({
//             messeage: "no condition query"
//         }).status(500)
//     }

//     else if(time != null && price == null){
//         product = await sanPhamModel.filterSanPham("end_date", "desc", Number.MAX_SAFE_INTEGER)
//     }
//     else if(time == null && price != null){
//         product = await sanPhamModel.filterSanPhamTheoGiaHT("gia_hien_tai", "asc", Number.MAX_SAFE_INTEGER)
//     }
//     else {
//         return res.json({
//             messeage: "time or price query"
//         })
//     }
//     let arr_product = []
//     for(let i = 0;i < product.length;i++){
//         let anh = await sanPhamModel.findImageById(product[i].id_sp)
//         arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
//     }
//     return res.json(arr_product)
// })



///// get details

//// không hiện giá đặt chỉ hiện giá mua ngay và giá hiện tại

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

///////////// TRANG CHỦ


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
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
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