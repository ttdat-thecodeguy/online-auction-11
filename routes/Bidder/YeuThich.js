const express = require('express');
const sanPhamModel = require('../../services/sanPhamModel');
const router = express.Router();

const yeuThichModel = require('../../services/yeuThichModel');
const Utils = require('../../utils/Utils');

router.get('/xem-danh-sach', async function (req, res) {
    const id = req.accessTokenPayload.id || 0;
    let product = await yeuThichModel.findByIdNguoiDung(id);
    let arr_product = [];
    for (let i = 0; i < product.length; i++) {
        arr_product.push(Utils.mapProduct(product[i], product[i].id_sp));
    }
    return res.json(arr_product).end();
});

router.get('/xem-danh-sach/thu-gon', async function (req, res) {
    const id = req.accessTokenPayload.id || 0;
    
    let product = await yeuThichModel.findByIdNguoiDungThuGon(id);
    return res.json(product).end()
})

router.get('/them-san-pham', async function (req, res) {
    const id = req.accessTokenPayload.id || 0;
    const id_san_pham = req.query.san_pham || 0;
    if (id_san_pham == 0) {
        return res.json({
            messeage: 'Product not invalid'
        });
    }
    await yeuThichModel.add(id, id_san_pham);
    return res.json({
        messeage: 'product add'
    }).end();
});

router.get('/kiem-tra-san-pham', async function (req, res) {
    const id = req.accessTokenPayload.id || 0;
    const id_san_pham = req.query.san_pham || 0;
    if (id_san_pham == 0) {
        return res.json({
            messeage: 'Product not invalid'
        });
    }
    let yeu_thich = await yeuThichModel.findYeuThich(id_san_pham, id);
    if (yeu_thich == null || yeu_thich == undefined) {
        return res.json({
            isLiked: false
        });
    } else {
        return res.json({
            isLiked: true
        });
    }
});

router.delete('/xoa-san-pham', async function (req, res) {
    const id = req.accessTokenPayload.id || 0;
    const id_san_pham = req.query.san_pham || 0;

    if (id_san_pham == 0) {
        return res.json({
            messeage: 'Product not invalid'
        });
    }
    let affected_rows = await yeuThichModel.del(id_san_pham, id);
    if (affected_rows == 0 || affected_rows == null) {
        return res.json({
            messeage: 'product not delete'
        }).end();
    }
    return res.json({
        messeage: 'product delete'
    }).end();
});

module.exports = router;