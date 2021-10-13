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
        "san_pham.gia_hien_tai",
        "san_pham.buoc_gia",
        "tai_khoan.email",
        "tai_khoan.id_nguoi_dung as id_nguoi_ban",
        "tai_khoan.diem_danhgia_duong as diem_duong",
        "tai_khoan.diem_danhgia_am as diem_am",
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
  findAllWithPaging(offset, limit){
    return db('san_pham').limit(limit).offset(offset);
  },
  findAll(){
    return db(table);
  },
  findAll(offset, per_page){
    return mapProduct().where("isLocked", 0).limit(per_page).offset(offset)
  },
  findAllKetThuc(){
    return db(table)
    .join("tai_khoan", "san_pham.id_nguoi_ban", "tai_khoan.id_nguoi_dung")
    .where("end_date","<",new Date(Date.now())).andWhere("isLocked", 0);
  },
  filterSanPham(condition, sort, size){
    return mapProduct().where("isLocked", 0).orderBy(condition, sort).limit(size)
  },
  filterAllWithPaging(offset, per_page,condition, sort){
    return mapProduct().where("isLocked", 0).orderBy(condition, sort).limit(per_page).offset(offset)
  },
  findByCateWithPaging(id_cate, offset, per_page){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0).offset(offset).limit(per_page);
  },
  filterAndSearchByNameWithPaging(name, offset, per_page, condition, sort){
    return mapProduct().where("san_pham.ten", "LIKE" ,"%" + name + "%").andWhere("isLocked", 0).offset(offset).limit(per_page).orderBy(condition, sort)
  },
  filterAndSearchByCateNameWithPaging(cate, offset, per_page, condition, sort){
    return mapProduct().where("danh_muc.ten", "LIKE" ,"%" + cate + "%").andWhere("isLocked", 0).offset(offset).limit(per_page).orderBy(condition, sort);
  },
  filterAndSearchByCateIdWithPaging(id_cate, offset, per_page, condition, sort){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0).offset(offset).limit(per_page).orderBy(condition, sort);
  },
  findImageById(id_sp){
    return db("anh_san_pham").where({"id_sp": id_sp})
  },
  findById(id) {
    return mapProduct()
    .where({"id_sp": id})   
  },
  findByNameWithPaging(name, offset, per_page){
    return mapProduct().where("san_pham.ten", "LIKE" ,"%" + name + "%").andWhere("isLocked", 0).offset(offset).limit(per_page);
  },
  countByName(name){
    return db(table).count('* as count').where("san_pham.ten", "LIKE" ,"%" + name + "%").andWhere("isLocked", 0).first()
  },
  findByProductSameCate(cate, size){
    return mapProduct().where("danh_muc.id_danh_muc", cate).andWhere("isLocked", 0).limit(size)
  },
  findByCateName(cate, offset, per_page){
    return mapProduct().where("danh_muc.ten", "LIKE" ,"%" + cate + "%").andWhere("isLocked", 0).offset(offset).limit(per_page);
  },
  countByCateName(cate){
    return mapProduct().count('* as count').where("danh_muc.ten", "LIKE" ,"%" + cate + "%").andWhere("isLocked", 0).first()
  },
  findByCateId(id_cate, offset, per_page){
    return mapProduct().where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0).offset(offset).limit(per_page);
  },
  countByCateId(id_cate){
    return mapProduct().count('* as count').where("danh_muc.id_danh_muc", id_cate).andWhere("isLocked", 0).first()
  },
  countProduct(){
    return db("san_pham").count('* as count').where("isLocked",0).first()
  },  
  countProductByCate(id_cate){
    return mapProduct().count('* as count').where("isLocked",0).andWhere("danh_muc.id_danh_muc", id_cate).first()
  },
  async add(sanpham) {
    sanpham.gia_hien_tai = sanpham.gia_dat
    return db(table).insert(sanpham);
  },
  del(id) {
    return db(table).where("id_sp", id).del();
  },
  update(id, sanpham) {
    return db(table).where("id_sp", id).update(sanpham);
  },
  updateGiaHT(id_sp, gia_hien_tai){
    return db(table).where("id_sp", id_sp).update({
      gia_hien_tai
    })
  },
  updateMoTa(id, mo_ta){
    return db(table).where("id_sp", id).update({
      mo_ta
    })
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
