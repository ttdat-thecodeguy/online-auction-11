const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('express-async-errors');
const app = express();
const Authentiaction = require('./middlewares/auth');

require('dotenv').config()
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// const swaggerUi = require('swagger-ui-express'),
// swaggerDocument = require('./swagger.json')


///// user //// Dat
app.use('/', require('./routes/BaoMat'));
app.use('/api/tai-khoan', Authentiaction.requireUser, require('./routes/TaiKhoan'))
app.use('/api/san-pham' ,require('./routes/SanPham'))
app.use('/api/dau-gia',[Authentiaction.requireUser, Authentiaction.requireDiemDanhGia] ,require('./routes/DauGia'))

//// admin // Khương Nguyễn
app.use("/api/admin/quan-ly-nguoi-dung",[Authentiaction.requireUser, Authentiaction.requireAdmin], require("./routes/Admin/QLNguoiDung"))
app.use("/api/admin/quan-ly-san-pham",[Authentiaction.requireUser, Authentiaction.requireAdmin], require("./routes/Admin/QLSanPham"))
app.use("/api/admin/quan-ly-danh-muc",[Authentiaction.requireUser, Authentiaction.requireAdmin], require("./routes/Admin/QLDanhMuc"))

const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.status(404).json({
        message: 'endpoint not found'
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'server failure'
    });
});

app.listen(PORT, function() {
    console.log(`Application is running at http://localhost:${PORT}`);
});