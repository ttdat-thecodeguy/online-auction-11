const express = require('express');
const router = express.Router();
const productModel = require('../../services/sanPhamModel');

router.get('/get-list-product', async function (req, res) {

    const listProduct = await productModel.findAll();
    let total = await productModel.countProduct();

    if (listProduct.length == 0) {
        return res.json([]).status(201)
    }

    return res.json({
        listProduct
    }).status('200');
});

router.delete('/delete-product/', async function (req, res) {
    const id = +req.query.id_sp;

    if (!id) {
        return res.json({
            message: 'Không tìm thấy sản phẩm cần xóa'
        }).status(201);
    }

    const productBidded = await productModel.findById(id);
    if (productBidded.length !== 0) {
        return res.json({
            message: 'Sản phẩm đang được đấu giá nên không thể xóa'
        }).status(201);
    }
    const productDelete = await productModel.del(id);
    if (productDelete) {
        return res.json({
            message: 'Sản phẩm xóa thành công'
        }).status(200);
    }
    return res.json({
        message: 'Xóa sản phẩm thất bại',
    }).status(200);
});

module.exports = router;