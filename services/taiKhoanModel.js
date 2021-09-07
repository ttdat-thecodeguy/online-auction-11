const db = require('../utils/db');

const table = "tai_khoan"

module.exports = {
  findAll() {
    return db(table);
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
