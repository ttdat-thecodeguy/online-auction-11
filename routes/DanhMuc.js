const { resolveSchema } = require('ajv/dist/compile');
const express = require('express');
const router = express.Router();

//

const sanPhamModel = require('../services/sanPhamModel')


router.get('/danh-sach-san-pham', async function (req, res) {
    const id = req.query.id
    
    var per_page = req.query.per_page || 10;
    var page = req.query.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    if(id == 0){
        return res.json({
            messeage: "Categories Not found"
        }).status(404)
    }    
    let product = await sanPhamModel.findByCateWithPaging(id,offset,per_page )
    let total = await sanPhamModel.countProduct()
    let to = offset + product.length;
    let last_page = Math.ceil(total / per_page);


    let arr_product = []
    for(let i = 0;i < product.length;i++){
        let anh = await sanPhamModel.findImageById(product[i].id_sp)
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp, anh))
    }
    return res.json({
        products: arr_product,
        total,
        to,
        last_page
    })
});

module.exports = router;