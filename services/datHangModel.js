const db = require('../utils/db');

module.exports = {
  ThongKeDonHang(id_nguoi_ban){
    return db("dat_hang")
            .join("trang_thai_dathang", "dat_hang.status", "trang_thai_dathang.id_trang_thai")
            .where("dat_hang.id_nguoi_ban", id_nguoi_ban)
  },
  themDonHang(donhang){
    return db("dat_hang").insert(donhang);
  },
  capNhatTrangThai(id_nguoi_mua, id_sp, id_nguoi_ban ,status){
    return db('dat_hang').where({ 
      id_nguoi_mua,
      id_sp,
      id_nguoi_ban
    }).update({
      status
    })
  },
};
