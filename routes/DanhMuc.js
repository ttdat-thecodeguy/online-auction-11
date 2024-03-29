const express = require('express');
const router = express.Router();

const sanPhamModel = require('../services/sanPhamModel')
const danhMucModel = require('../services/danhMucModel')
const Utils = require("../utils/Utils")

router.get('/danh-sach-san-pham', async function (req, res) {
    //search
    const cate = req.query.cate || 0
    
    //paging
    var per_page = req.query.per_page || 10;
    var page = req.query.current_page || 1;

     //// Order
     let time = req.query.orderTime
     let price = req.query.orderPrice

    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    let product = null;

    let t = null
    if(cate == 0){
        product = await sanPhamModel.findAll(offset, parseInt(per_page) )

        /// order all
        if(time != null && price == null){
            product = await sanPhamModel.filterAllWithPaging(offset, parseInt(per_page), "end_date", "desc")
        }
        else if(time == null && price != null){
            product = await sanPhamModel.filterAllWithPaging(offset, parseInt(per_page), "gia_hien_tai", "asc")
        }

        t = await sanPhamModel.countProduct()
    } else{
        product = await sanPhamModel.findByCateWithPaging(cate,offset,per_page )

        /// order by cate all
        if(time != null && price == null){
            product = await sanPhamModel.filterAndSearchByCateIdWithPaging(cate, offset, per_page, "end_date", "desc")
        }
        else if(time == null && price != null){
            product = await sanPhamModel.filterAndSearchByCateIdWithPaging(cate, offset, per_page, "gia_hien_tai", "asc")
        }

        t = await sanPhamModel.countProductByCate(cate)
    }   

    let to = offset + product.length;
    let last_page = Math.ceil(t.count / per_page);


    let arr_product = []
    for(let i = 0;i < product.length;i++){
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp))
    }
    return res.json({
        products: arr_product,
        count: t.count,
        to,
        last_page
    })
});

router.get('/danh-sach-cap-danh-muc', async (req, res)=>{
    const rows = await danhMucModel.findAllCapDanhMuc();
    return res.status(200).json(rows);
})

router.get('/danh-sach-danh-muc', async (req, res)=>{
    const rows = await danhMucModel.findAllDanhMuc();
    return res.status(200).json(rows);
})

router.get('/danh-sach-danh-muc-theo-cap', async (req, res)=>{
    const cap = req.query.cap;
    const rows = await danhMucModel.findAllDanhMucTheoCap(cap);
    return res.status(200).json(rows);
})

router.get('/tim-danh-muc', async(req, res)=>{
    const danh_muc = req.query.danh_muc;
    let dm = await danhMucModel.findById(danh_muc);
    if(dm.length != 0) dm = dm[0];
    return res.status(200).json(dm);
})  
module.exports = router;