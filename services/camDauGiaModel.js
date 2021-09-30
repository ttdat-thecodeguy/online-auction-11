const db = require('../utils/db');

const table = "cam_dau_gia"

module.exports = {
  findAll() {
    return db(table);
  },
  findNguoiDung(id_nguoi_dung, id_sp){
    return db(table).where({"id_nguoi_dung":id_nguoi_dung, "id_sp": id_sp }).first()
  },
  add(camDauGia) {
    return db(table).insert(camDauGia);
  },
};
