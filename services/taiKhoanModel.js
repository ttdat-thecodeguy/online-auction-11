const db = require('../utils/db');

const table = "tai_khoan"

module.exports = {
  findAll() {
    return db(table);
  },
  findAccountWaitingUpgrade(){
    return db("nang_cap_tk")
      .join('tai_khoan','nang_cap_tk.id_nguoi_dung','tai_khoan.id_nguoi_dung')
      .join('quyen_han', 'nang_cap_tk.id_quyen_han_mong_muon','quyen_han.id_quyen_han' );
  },
  async findById(id) {
    const rows = await db('tai_khoan').where('id_nguoi_dung', id);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }, 
  async findByEmail(email) {
    const rows = await db('tai_khoan').where('email', email);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },    
  async findByOTP(otp) {
    const rows = await db('tai_khoan').where('OTP', otp);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },
  add(taikhoan) {
    return db(table).insert(taikhoan);
  },
  del(id) {
    return db(table)
      .where("id_nguoi_dung", id)
      .del();
  },
  updateNangDiemDanhGia(id, diem){
    return db(table)
      .where("id_nguoi_dung", id)
      .update("diem_danhgia_duong", diem);
  },
  updateHaDiemDanhGia(id, diem){
    return db(table)
      .where("id_nguoi_dung", id)
      .update("diem_danhgia_am", diem);
  },
  update(id, taikhoan) {
    return db(table)
      .where("id_nguoi_dung", id)
      .update(taikhoan);
  },
  updateMatKhau(id, mat_khau){
    return db(table)
      .where("id_nguoi_dung", id)
      .update({
        mat_khau
      });
  },
  updateOTP (id, OTP) {
    return db(table)
    .where("id_nguoi_dung", id)
      .update({
        OTP
      });
  },
  /*
    Họ tên
    Email liên lạc
    Ngày tháng năm sinh
  */
  updateInfo(id, account){
    return db(table)
    .where("id_nguoi_dung", id)
      .update({
        email: account.email,
        ho_ten: account.ho_ten,
        ngay_sinh: account.ngay_sinh
      });
  }
};
