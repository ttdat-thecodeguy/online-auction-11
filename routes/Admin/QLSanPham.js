const express = require('express');
const router = express.Router();
const productModel = require('../../services/sanPhamModel');

router.get('/get-list-product', async function (req, res) {
    let per_page = req.query.per_page || 10;
    let page = req.query.current_page || 1;

    if (page < 1) {
        page = 1;
    }
    let offset = (page - 1) * per_page;

    const listProduct = await productModel.findAllWithPaging(offset, per_page);
    let total = await productModel.countProduct();
    let to = offset + listProduct.length;
    let last_page = Math.ceil(total / per_page);

    if (listProduct.length == 0) {
        return res.json([]).status(201)
    }

    return res.json({
        page,
        to,
        last_page,
        listProduct
    }).status('200');
});

router.delete('/delete-product/', async function(req, res){
    const id = +req.query.id_sp;

    if(!id){
        return res.json({
            message: 'Không tìm thấy sản phẩm cần xóa'
        }).status(201);
    }

    const productBidded = await productModel.findById(id);
    if(productBidded.length !== 0){
        return res.json({
            message: 'Sản phẩm đang được đấu giá nên không thể xóa'
        }).status(201);
    }
    const productDelete = await productModel.del(id);
    if(productDelete){
        return res.json({
            message: 'Sản phẩm xóa thành công'
        }).status(200);
    }
    return res.json({
        message: 'Xóa sản phẩm thất bại',
    }).status(200);
});

module.exports = router;