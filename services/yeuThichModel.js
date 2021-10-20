const db = require('../utils/db');

const table = "yeu_thich"

function mapProduct() {
    return db(table).join("san_pham", "yeu_thich.id_san_pham","san_pham.id_sp")
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
  findAll() {
    return mapProduct()    
  },
  findByIdNguoiDung(id){
    return mapProduct().where("yeu_thich.id_nguoi_dung",id)
  },
  findYeuThich(id, idNguoiDung){
    return db(table).where({'id_san_pham': id, 'id_nguoi_dung': idNguoiDung}).first()
  },
  add(id_nguoi_dung,id_san_pham) {
    return db(table).insert({
        id_nguoi_dung,
        id_san_pham
    });
  },
  del(id_san_pham, id_nguoi_dung) {
    return db(table).where({ "id_nguoi_dung": id_nguoi_dung, "id_san_pham": id_san_pham }).del()
  },
  update(id, yeuthich) {
    return db(table)
      .where("id", id)
      .update(yeuthich);
  }
};
