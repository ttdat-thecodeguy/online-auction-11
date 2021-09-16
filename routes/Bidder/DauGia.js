const express = require("express");
const router = express.Router();

const sanPhamModel = require("../../services/sanPhamModel");
const dauGiaModel = require("../../services/dauGiaModel");

router.post("/tham-gia", async function (req, res) {
  /*  
        id_sp,
        gia_dat
    */
  const id = req.accessTokenPayload.id || 0;
  const sp_daugia = req.body;
  const id_sp = sp_daugia.id_sp || 0;
  const dat_gia = sp_daugia.gia_dat;

  let sp = await sanPhamModel.findById(id_sp);
  
  if(sp.length != 0){
      sp = sp[0]
  }

  let now = new Date(Date.now());
  let expired = new Date(sp.end_date);


  if (now > expired) {
    res.json({
      messeage: "your product is expired",
      isWin: false
    });
  }
  if ( (sp.gia_dat + sp.buoc_gia) > dat_gia) {
    return res.json({
        messeage: "lose. need higher price",
        isWin: false
      })
  }
  let luot_dau_gia = await dauGiaModel.countDauGiaBySanPham(id_sp);

  ///// set lại giá đặt nếu giá đặt = 0
  let gia_dat = sp.gia_dat == 0 ? (sp.buoc_gia == 0 ? 10000 : sp.buoc_gia ) : sp.gia_dat

  if(sp.gia_dat == 0){
      if(sp.buoc_gia == 0) gia_dat = 10000;
      else gia_dat = sp.buoc_gia;
  } else{
      gia_dat = sp.gia_dat
  }

  console.log(gia_dat)
  
  // khởi tạo kết quả
  let dau_gia_rs = {
    id_sp,
    gia_khoi_diem: parseInt(2000),
    id_tra_cao_nhat: id,
    gia_tra_cao_nhat: dat_gia,
    id_nguoi_ban: sp.id_nguoi_ban,
    ngay_ket_thuc: sp.end_date
  };


  /// nếu chưa có lượt đấu giá nào cho sp này
  if (luot_dau_gia == 0) {
    await dauGiaModel.add(dau_gia_rs);

    /// tăng lượt đấu giá
    let luotdaugia = luot_dau_gia + 1;
    await sanPhamModel.updateLuotDauGia(luotdaugia);

    return res.json({ messeage: "win", isWin: true, gia_hien_tai: gia_dat}).status(200).end();
  } 
  else {
    // find người đấu giá cao nhất
    let cao_nhat = await dauGiaModel.findDauGiaCaoNhat(id_sp);

    console.log(cao_nhat)

    if(  (cao_nhat.gia_tra_cao_nhat + sp.buoc_gia) > dat_gia){
        dau_gia_rs.gia_khoi_diem = dat_gia;
        dau_gia_rs.id_tra_cao_nhat = cao_nhat.id_tra_cao_nhat
        //// khi giá khởi điểm của top ở dưới mức đặt giá
        //// nâng giá khởi điểm
        if(cao_nhat.gia_khoi_diem < dat_gia){
           await dauGiaModel.add(dau_gia_rs);

           let luotdaugia = luot_dau_gia + 1;
           await sanPhamModel.updateLuotDauGia(luotdaugia);

        }

        return res.json({
            messeage: "lose. need higher price",
            isWin: false,
            gia_hien_tai: dau_gia_rs.gia_khoi_diem
        })
    } else{
        /// gán giá khởi điểm (giá mask hay giá mua từ người cũ)
        dau_gia_rs.gia_khoi_diem = cao_nhat.gia_tra_cao_nhat;

        await dauGiaModel.add(dau_gia_rs);

        //// tăng lượt đấu giá
        let luotdaugia = luot_dau_gia + 1;
        await sanPhamModel.updateLuotDauGia(luotdaugia);

        // thông báo thắng cuộc
        return res.json({ messeage: "win", isWin: true, gia_hien_tai: cao_nhat.gia_tra_cao_nhat}).status(200).end();
    }
  }
});

///////////// API CHỈ ĐỂ TEST

router.get("/update-status", async(req, res)=>{
    const id = req.query.id_sp;
    const status = req.query.status;
    await dauGiaModel.updateStatus(id, status)
    res.json({
      messeage: "update successfully"
    }).end()
})



module.exports = router;
