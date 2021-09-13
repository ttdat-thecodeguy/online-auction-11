const db = require('../utils/db');

module.exports = {
    countDauGiaBySanPham(id_sp){
        return db("dau_gia").count('* as count').where("id_sp", id_sp)
    },
    add(dau_gia){
        return db("dau_gia").insert(dau_gia)
    },
    
    async findDauGiaCaoNhat(id_sp){
        let max = await db("dau_gia").where("id_sp", id_sp).max('gia_tra_cao_nhat as gia_cao_nhat').first()

        return db("dau_gia").where({"id_sp":id_sp,
                                   "gia_tra_cao_nhat":max.gia_cao_nhat}).first()
    }
};
