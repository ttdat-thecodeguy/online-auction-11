const db = require('../utils/db');

const table = "dau_gia"

module.exports = {
    countDauGiaBySanPham(id_sp){
        return db(table).count('* as count').where({"id_sp": id_sp, status: 1}).first()
    },
    async findByIdSanPham(id_sp){
        return db(table).join('tai_khoan','dau_gia.id_tra_cao_nhat','tai_khoan.id_nguoi_dung')
        .select('tai_khoan.id_nguoi_dung as id_mua', 'dau_gia.ngay_dat', 'tai_khoan.ho_ten', 'dau_gia.gia_khoi_diem as gia_hien_tai')        
        .where({"id_sp": id_sp, status: 1})
    },
    async findDauGiaCaoNhat(id_sp){
        let max = await db(table).where({"id_sp":id_sp, status: 1}).max('gia_tra_cao_nhat as gia_cao_nhat').first()
        return db(table).where({"id_sp":id_sp,status: 1,
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
    updateStatus(id_sp, status){
        return db(table).where("id_sp",id_sp).update({
            status
        })
    },
    async khoaDauGiaCaoNhat(id_sp){
        let max = await db(table).where({"id_sp": id_sp, status: 1}).max('gia_tra_cao_nhat as gia_cao_nhat').first()

        return db(table)  
        .where({"id_sp":id_sp,
                "gia_tra_cao_nhat":max.gia_cao_nhat,
                 "status":1}).andWhere(
                                       "ngay_ket_thuc", "<", new Date(Date.now())
                                   ).update({
                                       status: 2
                                   })
    }
};
