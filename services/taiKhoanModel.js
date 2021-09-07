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
  resetOTP (id) {
    return db(table)
    .where("id_nguoi_dung", id)
      .update({
        OTP: null
      });
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
  }
};
