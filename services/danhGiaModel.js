const db = require('../utils/db');

const table = "danh_gia"

module.exports = {
  findAll() {
    return db(table);
  },
  findByNguoiDanhGia(nguoi_danh_gia){
    return db(table).join("tai_khoan", "danh_gia.nguoi_bi_danh_gia","tai_khoan.id_nguoi_dung")
            .where("nguoi_danh_gia", nguoi_danh_gia)
            .select("tai_khoan.email", "tai_khoan.ho_ten", "tai_khoan.diem_danhgia_duong", "tai_khoan.diem_danhgia_am", "danh_gia.nhan_xet","danh_gia.isDuong")
  },
  findByNguoiBiDanhGia(nguoi_bi_danh_gia){
    return db(table).join("tai_khoan", "danh_gia.nguoi_danh_gia","tai_khoan.id_nguoi_dung")
            .where("nguoi_bi_danh_gia", nguoi_bi_danh_gia)
            .select("tai_khoan.email", "tai_khoan.ho_ten", "tai_khoan.diem_danhgia_duong", "tai_khoan.diem_danhgia_am", "danh_gia.nhan_xet","danh_gia.isDuong")
  },
  isDaDanhGia(id, target){
    return db(table).where({"nguoi_danh_gia": id, "nguoi_bi_danh_gia": target}).first();
  },
  add(danhgia) {
    return db(table).insert(danhgia);
  },
  del(id_danh_gia) {
    return db(table)
      .where("id_danh_gia", id_danh_gia)
      .del();
  },
  update(id_danh_gia, danhgia) {
    return db(table)
      .where("id_danh_gia", id_danh_gia)
      .update(danhgia);
  }
};
