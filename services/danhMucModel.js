const db = require("../utils/db");

const table = "danh_muc";
module.exports = {
    countCategory(){
        return db(table).count('* as count')
    },
    findAllDanhMuc(){
        return db(table);
    },
    findAllCapDanhMuc(){
        return  db("cap_danh_muc");
    },
    findAllDanhMucTheoCap(cap_danh_muc){
        return db.select().from(table).where('cap_danh_muc', cap_danh_muc);
    },
    findAll(offset, per_page) {
        return db(table).offset(offset).limit(per_page);
    },
    findById(id) {
        return db.select().from(table).where('id_danh_muc', id);     
    },
    findByLevel(id, offset, per_page) {
        return db.select().from(table).where('cap_danh_muc', id).offset(offset).limit(per_page);     
    },
    findByName(name, offset, per_page) {
        return db.select().from(table).where("ten", "LIKE" ,"%" + name + "%").offset(offset).limit(per_page);     
    },
    findProductByCat(id){
        return db.select().from("san_pham").where("id_danh_muc", id);     
    },
    add(danhmuc) {
        return db(table).insert(danhmuc);
    },
    del(id) {
        return db(table).where("id_danh_muc", id).del();
    },
    update(id, danhmuc) {
        return db(table).where("id_danh_muc", id).update(danhmuc);
    }
}