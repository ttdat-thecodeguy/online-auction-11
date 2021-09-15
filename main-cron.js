const CronJob = require("cron").CronJob;
const mailer = require("./utils/mailer");

const sanPhamModel = require("./services/sanPhamModel");
const dauGiaModel = require("./services/dauGiaModel");
const donHangModel = require("./services/datHangModel");


const taiKhoanModel = require("./services/taiKhoanModel");


const every_day_at_6h = "0 6 * * *";
const every_2_sec = "*/2 * * * * *";

const CRON_PATTERN = process.env.CRON_PATTERN || every_2_sec; //Every day on the 6 am, at noon

var job = new CronJob(
  CRON_PATTERN,
  async function () {
    const products = await sanPhamModel.findAllKetThuc();

    console.log(products.length);

    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        let email_nguoi_ban = products[i].email
        let hoten_nguoi_ban = products[i].ho_ten

        let cao_nhat = await dauGiaModel.findDauGiaCaoNhatKhiKetThuc(
          products[i].id_sp
        );
        if (cao_nhat != null) {
          const don_hang = {
            id_sp: cao_nhat.id_sp,
            id_nguoi_mua: cao_nhat.id_tra_cao_nhat,
            id_nguoi_ban: cao_nhat.id_nguoi_ban,
            gia_mua: cao_nhat.gia_khoi_diem,
            ngay_dat_hang: new Date(),
          };
          //mailer to nguoiban + nguoithang
          const nguoi_thang = await taiKhoanModel.findById(cao_nhat.id_tra_cao_nhat)
                    
          await mailer.send({
            from: "online.auction.11team@gmail.com",
            to: `${nguoi_thang.email}`,
            subject: "OnlineAuction11: Chúc Mừng Nhà Vô Địch.",
            html: `
                  Xin chào ${nguoi_thang.ho_ten}, Chúc Mừng bạn đã chiến thắng trong cuộc đấu giá với sản phẩm ${products[i].ten}.
                 
                  <ul> 
                      <li>giá mua: ${don_hang.gia_mua}</li>
                      <li>ngày đặt: ${don_hang.ngay_dat_hang}</li>
                      <li style="color:red">
                          đơn hàng sẽ gởi đến bạn sau 48 tiếng
                      </li>
                  <ul>
                  (Đây là thư tự động vui lòng không phản hồi)
                  `,
          });


          await mailer.send({
            from: "online.auction.11team@gmail.com",
            to: `${email_nguoi_ban}`,
            subject: `OnlineAuction11: Món Hàng ${products[i].ten} của bạn đã kết thúc và có người thắng.`,
            html: `
                  Xin chào ${hoten_nguoi_ban}, Món hàng ${products[i].ten} của bạn đã kết thúc.
                  <br> 
                      Vui lòng kiểm tra danh sách đơn hàng để biết thêm chi tiết
                  <br>
                  (Đây là thư tự động vui lòng không phản hồi)
                  `,
          });


          await donHangModel.themDonHang(don_hang);

          /// khóa toàn bộ cuộc đấu giá trước lại
          await dauGiaModel.updateStatus(products[i].id_sp, 1)
          
          /// khóa toàn bộ sản phẩm lại
          await sanPhamModel.updateStatus(products[i].id_sp, 1);
        } else {
          /// mailer to nguoiban
          await mailer.send({
            from: "online.auction.11team@gmail.com",
            to: `${email_nguoi_ban}`,
            subject: `OnlineAuction11: Món Hàng ${products[i].ten} của bạn đã kết thúc và không có ai đấu giá.`,
            html: `
                  Xin chào ${hoten_nguoi_ban}, Món hàng ${products[i].ten} của bạn đã kết thúc.
                  <br> 
                      Chúng tôi rất tiếc khi không có người đấu giá, bạn có thể mở lại cuộc đấu giá trong trình quản lí trang web
                  <br>
                  (Đây là thư tự động vui lòng không phản hồi)
                  `,
          });
        }
      }
    }
  },
  null,
  true,
  "Asia/Ho_Chi_Minh"
);
job.start();
