const db = require("../utils/db");

const table = "san_pham";

function mapProduct() {
  return db("san_pham")
      .join("danh_muc", "san_pham.id_danh_muc", "danh_muc.id_danh_muc")
      .join("tai_khoan", "san_pham.id_nguoi_ban", "tai_khoan.id_nguoi_dung")
      .select(
        "san_pham.id_sp",
        "san_pham.anh",
        "san_pham.ten as ten_sp",
        "san_pham.gia_dat",
        "san_pham.gia_mua_ngay",
        "san_pham.buoc_gia",
        "tai_khoan.email",
        "tai_khoan.id_nguoi_dung as id_nguoi_ban",
        "tai_khoan.ho_ten",
        "san_pham.publish_date",
        "san_pham.end_date",
        "san_pham.mo_ta",
        "danh_muc.id_danh_muc",
        "danh_muc.ten as ten_danh_muc",
        "danh_muc.cap_danh_muc",
        "san_pham.isLocked"
      );
}
module.exports = {
  findAll() {
    return db(table);
  },
  findAllKetThuc(){
    return db(table)
    .join("tai_khoan", "san_pham.id_nguoi_ban", "tai_khoan.id_nguoi_dung")
    .where("end_date","<",new Date(Date.now())).andWhere("isLocked", 0);
  },
  filterSanPham(condition, sort, size){
    return mapProduct().limit(size).orderBy(condition, sort)
  },
  findImageById(id_sp){
    return db("anh_san_pham").where({"id_sp": id_sp})
  },
  findById(id) {
    return mapProduct().where({"id_sp": id})   
  },
  findByName(name){
    return mapProduct().where("san_pham.ten", "LIKE" ,"%" + name + "%").andWhere("isLocked", 0)
  },
  findByCateName(cate){
    return mapProduct().where("danh_muc.ten", "LIKE" ,"%" + cate + "%").andWhere("isLocked", 0)
  },
  findByCateId(id_cate){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0)
  },
  findByCateWithPaging(id_cate, offset, per_page){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0).offset(offset).limit(per_page);
  },
  countProduct(){
    return db("san_pham").count('* as count').where("isLocked",0)
  },  
  add(sanpham) {
    return db(table).insert(sanpham);
  },
  del(id) {
    return db(table).where("id_sp", id).del();
  },
  update(id, sanpham) {
    return db(table).where("id_sp", id).update(sanpham);
  },
  updateLuotDauGia(id, luot_daugia){
    return db(table).where("id_sp", id).update({
      luot_daugia
    })
  },updateStatus(id, isLocked){
    return db(table).where("id_sp", id).update({
      isLocked
    })
  }
};
