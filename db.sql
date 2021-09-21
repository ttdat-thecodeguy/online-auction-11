-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Sep 21, 2021 at 09:54 AM
-- Server version: 5.7.28
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-auction`
--

-- --------------------------------------------------------

--
-- Table structure for table `anh_san_pham`
--

DROP TABLE IF EXISTS `anh_san_pham`;
CREATE TABLE IF NOT EXISTS `anh_san_pham` (
  `id_anh` int(11) NOT NULL AUTO_INCREMENT,
  `id_sp` int(11) NOT NULL,
  `ten` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_anh`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `anh_san_pham`
--

INSERT INTO `anh_san_pham` (`id_anh`, `id_sp`, `ten`) VALUES
(5, 24, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png.png'),
(6, 24, 'iphone-12-xanh-duongcb770ee9-0034-4f6a-bb66-c1c04b13d9b0.jpg'),
(7, 24, 'Iphone12-promax_qsljm8.jpg'),
(8, 25, 'iphone-5sc2eb9cf4-d3b5-4f26-994e-184bc6ff8774.png.png'),
(9, 25, 'ip-5443121e6-2e86-458e-878d-b82b1189e8da.jpg'),
(10, 25, 'apple-iphone-5s-ofic131394237-f4e3-4a8b-8ca2-2908a212d6b0.jpg'),
(11, 26, 'dell-dell-g3-15-3500-gaming-laptop-computer-config-160bac2c0-7994-48b6-9b1e-1011ed032b9d.jpg.jpg'),
(12, 26, 'dell-g3-15-3500-i5-70223130-082721-042709-600x600953b85b6-31d1-4e33-9355-69df74137789.jpg'),
(13, 26, 'dell-g3-15-134e67496-883b-48d8-86aa-c28a6472d9ac.jpg'),
(17, 28, '637318137488561447_xiaomi-redmi-9a-xanh-dd-bh0db2cb33-3b2a-4237-bb37-0b48366666e5.jpg.jpg'),
(18, 28, 'xiaomi-mi-9-se-1-600x60039973c02-8d96-4836-98b6-1f274e066480.jpg'),
(19, 28, 'xiaomi-mi-11-lite-4g-blue-600x60008332dcc-fb89-4c85-9bd6-15cc6583d3c0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cam_dau_gia`
--

DROP TABLE IF EXISTS `cam_dau_gia`;
CREATE TABLE IF NOT EXISTS `cam_dau_gia` (
  `id_sp` int(11) NOT NULL,
  `id_nguoi_dung` int(11) NOT NULL,
  PRIMARY KEY (`id_sp`,`id_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cap_danh_muc`
--

DROP TABLE IF EXISTS `cap_danh_muc`;
CREATE TABLE IF NOT EXISTS `cap_danh_muc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cap_danh_muc`
--

INSERT INTO `cap_danh_muc` (`id`, `ten`) VALUES
(0, 'Điện Thoại '),
(1, 'Máy Tính');

-- --------------------------------------------------------

--
-- Table structure for table `danh_gia`
--

DROP TABLE IF EXISTS `danh_gia`;
CREATE TABLE IF NOT EXISTS `danh_gia` (
  `id_danh_gia` int(11) NOT NULL AUTO_INCREMENT,
  `nguoi_danh_gia` int(11) NOT NULL,
  `nguoi_bi_danh_gia` int(11) NOT NULL,
  `nhan_xet` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `isDuong` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_danh_gia`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `danh_gia`
--

INSERT INTO `danh_gia` (`id_danh_gia`, `nguoi_danh_gia`, `nguoi_bi_danh_gia`, `nhan_xet`, `isDuong`) VALUES
(1, 3, 5, 'Thằng Này Méo đáng tin', 0),
(2, 3, 5, 'SHOP ĐƯỢC', 1),
(3, 1, 5, 'sau khi xem xét chúng tôi phát hiện sự gian lận nên lượt đấu giá này sẽ không được chấp nhận', 0),
(4, 1, 5, 'cảm ơn bạn đã tham gia đấu giá', 1);

-- --------------------------------------------------------

--
-- Table structure for table `danh_muc`
--

DROP TABLE IF EXISTS `danh_muc`;
CREATE TABLE IF NOT EXISTS `danh_muc` (
  `id_danh_muc` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `cap_danh_muc` int(11) NOT NULL,
  PRIMARY KEY (`id_danh_muc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `danh_muc`
--

INSERT INTO `danh_muc` (`id_danh_muc`, `ten`, `cap_danh_muc`) VALUES
(1, 'Điện thoại Lenovo', 0),
(2, 'Điện thoại HP', 0),
(3, 'Điện thoại IPhone', 0),
(4, 'Máy tính dell', 1),
(5, 'Máy tính Macbook', 1),
(6, 'Điện Thoại Xiaomi', 0);

-- --------------------------------------------------------

--
-- Table structure for table `dat_hang`
--

DROP TABLE IF EXISTS `dat_hang`;
CREATE TABLE IF NOT EXISTS `dat_hang` (
  `id_sp` int(11) NOT NULL,
  `id_nguoi_mua` int(11) NOT NULL,
  `id_nguoi_ban` int(11) NOT NULL,
  `gia_mua` int(11) NOT NULL,
  `ngay_dat_hang` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dat_hang`
--

INSERT INTO `dat_hang` (`id_sp`, `id_nguoi_mua`, `id_nguoi_ban`, `gia_mua`, `ngay_dat_hang`) VALUES
(24, 6, 0, 3020, '2021-09-15 10:31:46'),
(25, 3, 1, 9000, '2021-09-15 11:16:53');

-- --------------------------------------------------------

--
-- Table structure for table `dau_gia`
--

DROP TABLE IF EXISTS `dau_gia`;
CREATE TABLE IF NOT EXISTS `dau_gia` (
  `id_dau_gia` int(11) NOT NULL AUTO_INCREMENT,
  `id_sp` int(11) NOT NULL,
  `id_nguoi_ban` int(11) NOT NULL,
  `id_nguoi_dau_gia` int(11) NOT NULL,
  `gia_khoi_diem` int(11) NOT NULL,
  `id_tra_cao_nhat` int(11) NOT NULL,
  `gia_tra_cao_nhat` int(11) NOT NULL,
  `ngay_dat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ngay_ket_thuc` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_dau_gia`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dau_gia`
--

INSERT INTO `dau_gia` (`id_dau_gia`, `id_sp`, `id_nguoi_ban`, `id_nguoi_dau_gia`, `gia_khoi_diem`, `id_tra_cao_nhat`, `gia_tra_cao_nhat`, `ngay_dat`, `ngay_ket_thuc`, `status`) VALUES
(27, 24, 1, 3, 4500, 3, 1900, '2021-09-17 15:04:51', '2021-09-18 03:42:15', 2),
(28, 24, 1, 3, 4500, 3, 2100, '2021-09-17 15:05:06', '2021-09-18 03:42:15', 2),
(32, 24, 1, 3, 4500, 3, 3200, '2021-09-17 15:10:42', '2021-09-18 03:42:15', 2),
(33, 24, 1, 3, 4500, 3, 5800, '2021-09-17 15:11:17', '2021-09-18 03:42:15', 1),
(34, 24, 1, 5, 4500, 5, 5800, '2021-09-21 05:44:13', '2021-09-30 03:42:15', 2);

-- --------------------------------------------------------

--
-- Table structure for table `nang_cap_tk`
--

DROP TABLE IF EXISTS `nang_cap_tk`;
CREATE TABLE IF NOT EXISTS `nang_cap_tk` (
  `id_nguoi_dung` int(11) NOT NULL,
  `id_quyen_han_mong_muon` int(11) NOT NULL,
  PRIMARY KEY (`id_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nang_cap_tk`
--

INSERT INTO `nang_cap_tk` (`id_nguoi_dung`, `id_quyen_han_mong_muon`) VALUES
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `quyen_han`
--

DROP TABLE IF EXISTS `quyen_han`;
CREATE TABLE IF NOT EXISTS `quyen_han` (
  `id_quyen_han` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_quyen_han`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quyen_han`
--

INSERT INTO `quyen_han` (`id_quyen_han`, `ten`) VALUES
(1, 'Bidder'),
(2, 'Seller'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

DROP TABLE IF EXISTS `san_pham`;
CREATE TABLE IF NOT EXISTS `san_pham` (
  `id_sp` int(11) NOT NULL AUTO_INCREMENT,
  `anh` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_danh_muc` int(11) NOT NULL,
  `gia_dat` int(11) NOT NULL,
  `gia_hien_tai` int(11) NOT NULL,
  `gia_mua_ngay` int(11) NOT NULL,
  `buoc_gia` int(11) NOT NULL,
  `luot_daugia` int(11) NOT NULL DEFAULT '0',
  `isGiaHan` int(11) NOT NULL DEFAULT '0',
  `id_nguoi_ban` int(11) NOT NULL,
  `publish_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mo_ta` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `isLocked` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`id_sp`, `anh`, `ten`, `id_danh_muc`, `gia_dat`, `gia_hien_tai`, `gia_mua_ngay`, `buoc_gia`, `luot_daugia`, `isGiaHan`, `id_nguoi_ban`, `publish_date`, `end_date`, `mo_ta`, `isLocked`) VALUES
(24, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png', 'Điện Thoại IPhone 12 Promax', 3, 4500, 5800, 3000, 50, 2, 0, 1, '2021-09-15 03:42:15', '2021-09-30 03:42:15', 'Đẹp, thởi thượng', 0),
(25, 'iphone-5sc2eb9cf4-d3b5-4f26-994e-184bc6ff8774.png', 'Điện Thoại IPhone 5s', 3, 4000, 4000, 9000, 150, 0, 0, 1, '2021-09-15 03:42:26', '2021-09-21 03:42:26', 'Đẹp, thởi thượng', 0),
(26, 'dell-dell-g3-15-3500-gaming-laptop-computer-config-160bac2c0-7994-48b6-9b1e-1011ed032b9d.jpg', 'Máy Tính Dell G3', 4, 6000, 6000, 9000, 130, 0, 0, 1, '2021-09-15 03:42:28', '2021-09-30 03:42:28', 'Đẹp, thởi thượng', 0),
(28, '637318137488561447_xiaomi-redmi-9a-xanh-dd-bh0db2cb33-3b2a-4237-bb37-0b48366666e5.jpg', 'Điện Thoại Xiaomin 9SE', 6, 1300, 1300, 2400, 100, 0, 0, 1, '2021-09-15 03:42:31', '2021-09-28 03:42:31', 'Đẹp, thởi thượng', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

DROP TABLE IF EXISTS `tai_khoan`;
CREATE TABLE IF NOT EXISTS `tai_khoan` (
  `id_nguoi_dung` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `ho_ten` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_sinh` timestamp(6) NULL DEFAULT NULL,
  `dia_chi` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `mat_khau` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_quyen_han` int(11) NOT NULL DEFAULT '1',
  `OTP` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diem_danhgia_duong` int(11) NOT NULL DEFAULT '0',
  `diem_danhgia_am` int(11) NOT NULL DEFAULT '0',
  `expired` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_nguoi_dung`),
  UNIQUE KEY `UQ_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Người Dùng';

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`id_nguoi_dung`, `email`, `ho_ten`, `ngay_sinh`, `dia_chi`, `mat_khau`, `id_quyen_han`, `OTP`, `diem_danhgia_duong`, `diem_danhgia_am`, `expired`) VALUES
(1, 'nijigi1129@rebation.com', 'John Henry', '2019-07-03 10:00:00.000000', '123 hung vuong', '$2b$10$uBhaNvbi9tiUi2UOGAwBku4YUfZEtOE/2InHBuxFa46Vw.I9wLVoG', 2, NULL, 0, 0, '2021-09-08 03:15:51'),
(3, 'xegela5358@posiklan.com', 'abcf', NULL, '123 hung vuong', '$2b$10$I.bs9K2p1HJiQFPnbL3SJe10XpdYTe5Ftf49X6TtfdDeCXrS8oJuy', 1, NULL, 0, 0, '2021-09-08 03:23:35'),
(5, 'gahowa2784@posiklan.com', 'adminstrator', NULL, '123 hung vuong', '$2b$10$213eVEt2x/XP9gVUaii0BuXLEDWES/4jmXUONdd56Fl69U0KAwmfG', 1, NULL, 1, 2, '2021-09-08 17:35:17'),
(6, 'ttdat17ck1@gmail.com', 'hang', NULL, '123 hung vuong', '$2b$10$QGDfKZzUQhOyw/gH./Tp2.WN/18usVeJWT4GrPak1.zF0gCYfNY9O', 1, NULL, 0, 0, '2021-09-16 10:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `trang_thai`
--

DROP TABLE IF EXISTS `trang_thai`;
CREATE TABLE IF NOT EXISTS `trang_thai` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trang_thai`
--

INSERT INTO `trang_thai` (`id`, `ten`) VALUES
(1, 'Kích Hoạt'),
(2, 'Khóa'),
(3, 'Chờ');

-- --------------------------------------------------------

--
-- Table structure for table `yeu_thich`
--

DROP TABLE IF EXISTS `yeu_thich`;
CREATE TABLE IF NOT EXISTS `yeu_thich` (
  `id_nguoi_dung` int(11) NOT NULL,
  `id_san_pham` int(11) NOT NULL,
  PRIMARY KEY (`id_nguoi_dung`,`id_san_pham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `yeu_thich`
--

INSERT INTO `yeu_thich` (`id_nguoi_dung`, `id_san_pham`) VALUES
(1, 24),
(1, 25);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
