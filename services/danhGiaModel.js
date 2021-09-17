const db = require('../utils/db');

const table = "danh_gia"

module.exports = {
  findAll() {
    return db(table);
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
