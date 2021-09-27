const express = require('express');
const router = express.Router();
const sanPhamModel = require('../services/sanPhamModel')

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