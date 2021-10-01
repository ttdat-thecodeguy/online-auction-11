const db = require('../utils/db');

const table = "dau_gia"

module.exports = {
    countDauGiaBySanPham(id_sp){
        return db(table).count('* as count').where({"id_sp": id_sp, status: 1}).first()
    },
    findByIdDauGia(id_dau_gia){
        return db(table).where({"id_dau_gia": id_dau_gia}).first()
    },
    findByNguoiDauGia(id){
        return db(table).join("san_pham", "dau_gia.id_sp", "san_pham.id_sp")
                        .join("trang_thai", "dau_gia.status", "trang_thai.id")
                        .select("san_pham.ten as ten_sp", "dau_gia.gia_tra_cao_nhat as gia_tra", "dau_gia.gia_khoi_diem as gia_mua", "dau_gia.status", "trang_thai.ten as ten_status", "dau_gia.ngay_dat")
    },
    findByStatus(id_nguoi_ban, status){
        return db(table).where({"id_nguoi_ban":id_nguoi_ban,"status": status})
    },
    async findByIdSanPham(id_sp){
        return db(table).join('tai_khoan','dau_gia.id_tra_cao_nhat','tai_khoan.id_nguoi_dung')
        .select('tai_khoan.id_nguoi_dung as id_mua', 'dau_gia.ngay_dat', 'tai_khoan.ho_ten', 'dau_gia.gia_khoi_diem as gia_hien_tai')        
        .where({"id_sp": id_sp, status: 1})
    },
    async findDauGiaCaoNhat(id_sp){
        let max = await db(table).where({"id_sp":id_sp, status: 1}).max('gia_tra_cao_nhat as gia_cao_nhat').first()
        return db(table)
                .join("tai_khoan", "dau_gia.id_nguoi_dau_gia", "tai_khoan.id_nguoi_dung")
                .where({"id_sp":id_sp,status: 1,
                                   "gia_tra_cao_nhat":max.gia_cao_nhat}).first()
    },
    async findDauGiaCaoNhatKhiKetThuc(id_sp){
        let max = await db(table).where({"id_sp": id_sp, status: 1}).max('gia_tra_cao_nhat as gia_cao_nhat').first()

        return db(table)  
        .where({"id_sp":id_sp,
                "gia_tra_cao_nhat":max.gia_cao_nhat,
                 "status":1}).andWhere(
                                       "ngay_ket_thuc", "<", new Date(Date.now())
                                   ).first()
    },
    add(dau_gia){
        return db(table).insert(dau_gia)
    },
    updateDauGia(id, dau_gia){
        return db(table).where({"id_dau_gia": id}).update(dau_gia)
    },
    updateStatus(id_sp, status){
        return db(table).where("id_sp",id_sp).update({
            status
        })
    },
    updateStatusById(id_dau_gia, status){
        return db(table).where("id_dau_gia",id_dau_gia).update({
            status
        })
    },
    khoaDauGiaCaoNhat(id_sp, id_nguoi_ra_gia){
        return db(table)  
        .where({"id_sp":id_sp,"id_nguoi_dau_gia":id_nguoi_ra_gia,"status": 1}).update({status: 2})
    }
};
