const express = require('express');
const validate = require('../../middlewares/validate');
const schemaCategory = require('../../schema/danhMucSchema.json');
const router = express.Router();
const categoryModel = require('../../services/danhMucModel');

router.get('/list-category/', async function (req, res) {
    const id = req.query.id;
    const level = req.query.level;
    const nameCategory = req.query.name_cat;

    if (id) {
        listCategory = await categoryModel.findById(id);
    }
    if (level) {
        listCategory = await categoryModel.findByLevel(id);
    }
    if (nameCategory) {
        listCategory = await categoryModel.findByName(nameCategory);
    }
    if (!id && !level && !nameCategory) {
        listCategory = await categoryModel.findAllDanhMuc();
    }

    let total = await categoryModel.countCategory();
    if (listCategory.length === 0) {
        return res.json([]).status(201)
    }

    return res.json({
        listCategory
    }).status('200');
});

router.delete('/delete-category/', async function (req, res) {
    const id = req.query.id;
    if (!id) {
        return res.json({
            messeage: "Không tìm thấy danh mục cần xóa"
        }).status(304)
    }

    const productAssignedCategory = await categoryModel.findProductByCat(parseInt(id));
    if (productAssignedCategory.length !== 0) {
        console.log(productAssignedCategory);
        return res.json({
            messeage: "Danh mục không thể xóa"
        }).status(406)
    }
    const categoryDeleted = await categoryModel.del(id);

    if (categoryDeleted) {
        return res.json({
            message: 'Danh mục đã được xóa.'
        }).status(200);
    }

    return res.json({
        message: "Không tìm thấy danh mục cần xóa."
    }).status(301);
});

router.post('/add-category/', validate(schemaCategory.them_danh_muc), async function (req, res) {
    const categoryObject = req.body;
    const categoryAdded = await categoryModel.add(categoryObject);
    if (categoryAdded.length !== 0) {
        return res.json({
            message: 'Danh mục đã được thêm.',
            data: categoryAdded
        }).status(200);
    }
    return res.json({
        message: 'Thêm danh mục không thành công.'
    }).status(204);
});

router.put('/update-category/', validate(schemaCategory.cap_nhat_danh_muc), async function (req, res) {
    const categoryObject = req.body;
    const id = +req.body.id_danh_muc;

    const categoryUpdate = await categoryModel.update(id, categoryObject);
    if (categoryUpdate.length !== 0) {
        return res.json({
            message: 'Danh mục đã được cập nhật.',
            data: categoryUpdate
        }).status(200);
    }
    return res.json({
        message: 'Cập nhật danh mục không thành công.'
    }).status(304);
});

module.exports = router;