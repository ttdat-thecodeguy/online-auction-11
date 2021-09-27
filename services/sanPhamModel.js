const db = require("../utils/db");

table = "san_pham";

function mapProduct() {
  return db(table)
      .join("danh_muc", "san_pham.id_danh_muc", "danh_muc.id_danh_muc")
      .join("tai_khoan", "san_pham.id_nguoi_ban", "tai_khoan.id_nguoi_dung")
      .select(
        "san_pham.id_sp",
        "san_pham.anh",
        "san_pham.ten as ten_sp",
        "san_pham.gia_dat",
        "san_pham.gia_mua_ngay",
        "san_pham.buoc_gia",
        "tai_khoan.ho_ten",
        "san_pham.publish_date",
        "san_pham.end_date",
        "san_pham.mo_ta",
        "danh_muc.id_danh_muc",
        "danh_muc.ten as ten_danh_muc",
        "danh_muc.cap_danh_muc"
      );
}
module.exports = {
  findAllWithPaging(offset, limit){
    return db('san_pham').limit(limit).offset(offset);
  },
  findAll() {
    return db(table);
  },
  filterSanPham(condition, sort, size){
    return mapProduct().limit(size).orderBy(condition, sort)
  },
  findImageById(id_sp){
    return db("anh_san_pham").where("id_sp", id_sp)
  },
  findById(id) {
    return mapProduct().where("id_sp", id)     
  },
  findByName(name){
    return mapProduct().where("ten", "LIKE" ,"%" + name + "%")
  },
  findByCate(id_cate){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate)
  },
  findByCateWithPaging(id_cate, offset, per_page){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).offset(offset).limit(per_page);
  },
  countProduct(){
    return db("san_pham").count('* as count')
  },  
  add(sanpham) {
    return db(table).insert(sanpham);
  },
  del(id) {
    return db(table).where("id", id).del();
  },
  update(id, sanpham) {
    return db(sanpham).where("id", id).update(sanpham);
  },
};
