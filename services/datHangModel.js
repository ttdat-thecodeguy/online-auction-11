const db = require('../utils/db');

module.exports = {
  ThongKeDonHang(id_nguoi_ban){
    return db("dat_hang")
            .join("trang_thai_dathang", "dat_hang.status", "trang_thai_dathang.id_trang_thai")
            .join("tai_khoan", "dat_hang.id_nguoi_mua","tai_khoan.id_nguoi_dung")
            .join("san_pham", "dat_hang.id_sp", "san_pham.id_sp")
            .where("dat_hang.id_nguoi_ban", id_nguoi_ban)
            .select("san_pham.id_sp", "san_pham.ten", "tai_khoan.id_nguoi_dung" ,"tai_khoan.ho_ten", "trang_thai_dathang.ten_trang_thai", "dat_hang.gia_mua", "dat_hang.ngay_dat_hang")
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
