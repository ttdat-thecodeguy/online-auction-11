const express = require('express');
const router = express.Router();
const sanPhamModel = require('../services/sanPhamModel')

const Utils = require("../utils/Utils")

router.get('/danh-sach-san-pham', async function (req, res) {
    const cate = req.query.cate || 0
    
    var per_page = req.query.per_page || 10;
    var page = req.query.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    let product = null;

    let t = null
    if(cate == 0){
        product = await sanPhamModel.findAll(offset, parseInt(per_page) )
        t = await sanPhamModel.countProduct()
    } else{
        product = await sanPhamModel.findByCateWithPaging(cate,offset,per_page )
        t = await sanPhamModel.countProductByCate(cate)
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
});

module.exports = router;