const db = require('../utils/db');

const table = "dau_gia"

module.exports = {
    countDauGiaBySanPham(id_sp){
        return db(table).count('* as count').where("id_sp", id_sp)
    },
    add(dau_gia){
        return db(table).insert(dau_gia)
    },
    
    async findDauGiaCaoNhat(id_sp){
        let max = await db(table).where("id_sp", id_sp).max('gia_tra_cao_nhat as gia_cao_nhat').first()

        return db(table).where({"id_sp":id_sp,
                                   "gia_tra_cao_nhat":max.gia_cao_nhat}).first()
    },
    async findDauGiaCaoNhatKhiKetThuc(id_sp){
        let max = await db(table).where("id_sp", id_sp).max('gia_tra_cao_nhat as gia_cao_nhat').first()

        return db(table)  
        .where({"id_sp":id_sp,
                "gia_tra_cao_nhat":max.gia_cao_nhat,
                 "status":1}).andWhere(
                                       "ngay_ket_thuc", "<", new Date(Date.now())
                                   ).first()
    },
    updateStatus(id_sp, status){
        return db(table).where("id_sp",id_sp).update({
            status
        })
    }
};
