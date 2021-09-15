const db = require('../utils/db');

module.exports = {
  ThongKeDonHang(id_nguoi_ban){
    return db("dat_hang")
            .where("dat_hang.id_nguoi_ban", id_nguoi_ban)
  },
  themDonHang(donhang){
    return db("dat_hang").insert(donhang);
  }
};
