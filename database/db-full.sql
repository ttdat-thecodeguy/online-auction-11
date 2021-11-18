-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Nov 18, 2021 at 03:01 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `anh_san_pham`
--

INSERT INTO `anh_san_pham` (`id_anh`, `id_sp`, `ten`) VALUES
(5, 24, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png'),
(6, 24, 'iphone-12-xanh-duongcb770ee9-0034-4f6a-bb66-c1c04b13d9b0.jpg'),
(7, 24, 'Iphone12-promax_qsljm8.jpg'),
(8, 25, 'iphone-5sc2eb9cf4-d3b5-4f26-994e-184bc6ff8774.png'),
(9, 25, 'ip-5443121e6-2e86-458e-878d-b82b1189e8da.jpg'),
(10, 25, 'apple-iphone-5s-ofic131394237-f4e3-4a8b-8ca2-2908a212d6b0.jpg'),
(11, 26, 'dell-dell-g3-15-3500-gaming-laptop-computer-config-160bac2c0-7994-48b6-9b1e-1011ed032b9d.jpg'),
(12, 26, 'dell-g3-15-3500-i5-70223130-082721-042709-600x600953b85b6-31d1-4e33-9355-69df74137789.jpg'),
(13, 26, 'dell-g3-15-134e67496-883b-48d8-86aa-c28a6472d9ac.jpg'),
(17, 28, '637318137488561447_xiaomi-redmi-9a-xanh-dd-bh0db2cb33-3b2a-4237-bb37-0b48366666e5.jpg'),
(18, 28, 'xiaomi-mi-9-se-1-600x60039973c02-8d96-4836-98b6-1f274e066480.jpg'),
(19, 28, 'xiaomi-mi-11-lite-4g-blue-600x60008332dcc-fb89-4c85-9bd6-15cc6583d3c0.jpg'),
(20, 29, 'samsung-galaxy-s21-5g-Tím-3160b9b927-1f65-4cfe-ad6d-5426de60abee.jpg'),
(21, 29, 'samsung-galaxy-s21-5g-Tr�ng-2123b40042-23fa-48d6-b4bf-1740d5ac53d6.jpg'),
(22, 29, 'samsung-galaxy-s21-5g-Tr�ng-3163e479da-07ba-41b7-a754-05da38914441.jpg'),
(23, 30, 'j7-den-hongde3c347d-9a36-4e30-ba13-18711839e4a6.jpg'),
(25, 30, 'samsung-galaxy-j7-pro-vang-dongd9d08a41-be49-42a2-b9fd-d737cbfbdeab.png'),
(26, 31, 'j2-prime02f95ead-540b-4fa3-a6bb-fc10165eee69.jpeg'),
(27, 31, 'samsung-galaxy-j2-prime-vanghong-1-26f2bd318-8054-45d1-ab95-3178f2e2bc19.jpg'),
(28, 31, 'samsung-galaxy-j2-prime1a2e1ea8-f000-4de1-864d-5dbc024f7633.jpg'),
(29, 32, 'rog_5_15bc69c57-e4a6-471b-86de-00bf4179522e.jpg'),
(30, 32, 'asus-rog-phone-5-3495ee242-40e8-4314-bd98-d3d3bbb97a4d.jpg'),
(31, 32, 'asus-rog-phone-5-1ebbbc33b-2b1c-405f-9dff-dd09acad2e0f.jpg'),
(32, 32, 'asus-rog-phone-59b48733f-c9ee-42e7-b757-bb7f297351d7.jpg'),
(33, 33, 'asus-rog-phone-59b48733f-c9ee-42e7-b757-bb7f297351d7.jpg'),
(34, 33, 'rog_5_15bc69c57-e4a6-471b-86de-00bf4179522e.jpg'),
(35, 33, 'asus-rog-phone-5-1ebbbc33b-2b1c-405f-9dff-dd09acad2e0f.jpg'),
(36, 34, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg'),
(37, 34, 'laptop-lenovo-gaming-legion-5-ryzen-5_3_175e6e00-e139-4028-8e2c-06470be7473d.jpg'),
(38, 34, 'laptop-lenovo-gaming-legion-5-ryzen-5_5_kspb230b20e-f880-4498-b805-285dc023d122.jpg'),
(39, 35, 'laptop-lenovo-gaming-legion-5-ryzen-5_5_kspb230b20e-f880-4498-b805-285dc023d122.jpg'),
(40, 36, 'laptop-lenovo-gaming-legion-5-ryzen-5_5_kspb230b20e-f880-4498-b805-285dc023d122.jpg'),
(41, 35, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg'),
(42, 36, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg'),
(43, 37, 'Iphone12-promax_qsljm8.jpg'),
(44, 37, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png'),
(45, 37, 'Iphone12-promax_qsljm8.jpg'),
(46, 38, 'Iphone12-promax_qsljm8.jpg'),
(47, 38, 'iphone-12-xanh-duongcb770ee9-0034-4f6a-bb66-c1c04b13d9b0.jpg'),
(48, 38, 'iphone-12-xanh-duongcb770ee9-0034-4f6a-bb66-c1c04b13d9b0.jpg'),
(49, 39, 'Iphone12-promax_qsljm8.jpg'),
(50, 39, 'iphone-12-xanh-duongcb770ee9-0034-4f6a-bb66-c1c04b13d9b0.jpg'),
(51, 39, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png'),
(55, 45, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_f99078b2-2a54-4a6b-b696-c5030721b35e.jpg'),
(65, 45, 'laptop-lenovo-gaming-legion-5-ryzen-5_3_c0876be8-457c-4f9a-b5d2-7fb6f89873a8.jpg'),
(75, 45, 'laptop-lenovo-gaming-legion-5-ryzen-5_5_kspcc218b28-c75a-449c-965a-39d80758608e.jpg'),
(85, 55, 'macbook-pro-2021-006_1b35d372c-f8ac-4249-8ff6-fefe5043740c'),
(95, 55, 'macbook-pro-2021-001_150f16e11-21b9-49f7-a41a-fba14bc421d1'),
(105, 55, 'macbook-pro-2021-007_19e0be0c1-8c96-4963-a6a1-ca940178f122'),
(115, 65, 'hp-envy-13-2020-111af3259-603f-4a8b-8311-f39c57b24698'),
(125, 65, 'hp-envy-13-2020-21dc9585b-1f18-44f0-b3f6-b47389324974'),
(135, 65, 'hp-envy-13-2020-119d736cdd-6d61-41da-8356-172ab31a1c6e'),
(145, 75, 'lenovolegion2pro-2dad147db-8d1e-4d0c-8ce1-8cf4207a73ca'),
(155, 75, 'lenovolegion2pro26508cf0-1f15-466f-9eef-129f52746bf9'),
(165, 75, 'lenovo-legion90fcf049-9d47-42d4-95e2-15ce7acc3056'),
(175, 85, 'acer-nitro-5_11f7b7d58-2858-49a9-b228-4a569d4c478c'),
(185, 85, 'acer-nitro-5b9513748-8372-47ae-8014-095452203e0a');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `danh_gia`
--

INSERT INTO `danh_gia` (`id_danh_gia`, `nguoi_danh_gia`, `nguoi_bi_danh_gia`, `nhan_xet`, `isDuong`) VALUES
(1, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(2, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(3, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(4, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(5, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(6, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(7, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(8, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(9, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(10, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(11, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1),
(12, 1, 96, 'cảm ơn bạn đã tham gia đấu giá', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `danh_muc`
--

INSERT INTO `danh_muc` (`id_danh_muc`, `ten`, `cap_danh_muc`) VALUES
(1, 'Điện thoại Lenovo', 0),
(2, 'Điện thoại HP', 0),
(3, 'Điện thoại IPhone', 0),
(4, 'Máy tính dell', 1),
(5, 'Máy tính Macbook', 1),
(6, 'Điện Thoại Xiaomi', 0),
(7, 'Điện Thoại Samsung', 0),
(8, 'Rog Phone', 0),
(9, 'Máy Tính Lenovo', 1),
(10, 'Máy tính Mac', 1),
(11, 'máy tính Acer', 1),
(35, 'Kiểm tra', 0),
(45, 'Máy Tính HP', 1);

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
  `status` int(11) NOT NULL DEFAULT '1',
  `ngay_dat_hang` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `mo_ta` text COLLATE utf8_unicode_ci NOT NULL,
  `isLocked` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `san_pham`
--

INSERT INTO `san_pham` (`id_sp`, `anh`, `ten`, `id_danh_muc`, `gia_dat`, `gia_hien_tai`, `gia_mua_ngay`, `buoc_gia`, `luot_daugia`, `isGiaHan`, `id_nguoi_ban`, `publish_date`, `end_date`, `mo_ta`, `isLocked`) VALUES
(24, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png', 'Điện Thoại IPhone 12 Promax', 3, 4500, 6000, 30000, 50, 0, 0, 1, '2021-09-14 20:42:15', '2021-11-20 20:42:15', 'Đẹp, thởi thượng', 0),
(25, 'iphone-5sc2eb9cf4-d3b5-4f26-994e-184bc6ff8774.png', 'Điện Thoại IPhone 5s', 3, 4000, 4000, 90000, 150, 0, 0, 1, '2021-09-14 20:42:26', '2021-11-20 20:42:26', 'Đẹp, thởi thượng', 1),
(26, 'dell-dell-g3-15-3500-gaming-laptop-computer-config-160bac2c0-7994-48b6-9b1e-1011ed032b9d.jpg', 'Máy Tính Dell G3', 4, 6000, 6000, 90000, 130, 0, 0, 1, '2021-09-14 20:42:28', '2021-10-29 20:42:28', 'Đẹp, thởi thượng, Vừa Vặn Với Mọi Phân Khúc', 0),
(28, '637318137488561447_xiaomi-redmi-9a-xanh-dd-bh0db2cb33-3b2a-4237-bb37-0b48366666e5.jpg', 'Điện Thoại Xiaomin 9SE', 6, 1300, 1300, 24000, 100, 0, 0, 1, '2021-09-14 20:42:31', '2022-09-27 20:42:31', 'Đẹp, thởi thượng', 0),
(29, 'samsung-galaxy-s21-5g-Tím-3160b9b927-1f65-4cfe-ad6d-5426de60abee.jpg', 'Điện Thoại Samsung Galaxy S21 ', 7, 1299, 1299, 12990, 100, 0, 0, 1, '2021-10-01 00:31:39', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(30, 'j7-den-hongde3c347d-9a36-4e30-ba13-18711839e4a6.jpg', 'Điện Thoại Samsung J7 Prime', 7, 1199, 1199, 13990, 200, 0, 0, 1, '2021-10-01 00:33:04', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(31, 'j2-prime02f95ead-540b-4fa3-a6bb-fc10165eee69.jpeg', 'Điện Thoại Samsung J2 Prime', 7, 200, 200, 2000, 120, 0, 0, 1, '2021-10-01 00:34:02', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(32, 'rog_5_15bc69c57-e4a6-471b-86de-00bf4179522e.jpg', 'Rog Phone 5', 8, 4000, 4000, 500000, 400, 0, 0, 1, '2021-10-01 00:42:48', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(33, 'asus-rog-phone-5-1ebbbc33b-2b1c-405f-9dff-dd09acad2e0f.jpg', 'Rog Phone 3 Cũ Tân Trang', 8, 3700, 4000, 520000, 400, 0, 0, 1, '2021-10-01 00:42:48', '2021-12-11 10:00:00', 'Đẹp, thởi thượng Phù Hợp Với Nhiều Phân Khúc Giá <p>Nhưng Mà Giá Hơi Đắt</p>\n', 0),
(34, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg', 'Lenovo IDEA Pad 15ABR', 9, 2750, 2750, 340000, 700, 0, 0, 1, '2021-10-01 00:50:57', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(35, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg', 'Lenovo Thinkpad', 9, 1750, 1750, 50000, 7800, 0, 0, 1, '2021-10-01 00:50:57', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 0),
(36, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_d9db62ee-9840-4226-97ce-2bdb5271730f.jpg', 'Lenovo IDEA Pad 13ABR', 9, 4750, 4750, 340000, 700, 0, 0, 1, '2021-10-01 00:50:57', '2021-12-11 10:00:00', 'Đẹp, thởi thượng', 1),
(37, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png', 'Điện Thoại IPhone 12 Promax 256 GB Cũ', 3, 3450, 3450, 28000, 100, 0, 0, 1, '2021-09-14 20:42:15', '2021-11-20 20:42:15', 'Đẹp, thởi thượng', 0),
(38, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png', 'Điện Thoại IPhone 12 Thường', 3, 4700, 4700, 58000, 100, 0, 0, 1, '2021-09-14 20:42:15', '2021-11-10 20:42:15', 'Đẹp, thởi thượng', 0),
(39, 'iphone-12-pro-max100dd7f1-973a-4640-9c8d-d66e93ee3c8e.png', 'Điện Thoại IPhone 12 Mini', 3, 6600, 6600, 660000, 100, 0, 0, 1, '2021-09-14 20:42:15', '2021-12-20 20:42:15', 'Đẹp, thởi thượng', 0),
(45, 'laptop-lenovo-gaming-legion-5-ryzen-5_2_f99078b2-2a54-4a6b-b696-c5030721b35e.jpg', 'Lenovo IDEA Pad', 9, 2750, 2750, 340000, 700, 0, 0, 1, '2021-10-01 01:37:03', '2021-12-20 20:42:15', 'Đẹp, thởi thượng', 0),
(55, 'macbook-pro-2021-006_1b35d372c-f8ac-4249-8ff6-fefe5043740c.jpg', 'Macbook Pro 2021', 5, 6700, 6700, 15000, 220, 0, 0, 1, '2021-10-30 20:55:06', '2021-11-29 20:49:00', '<h2 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 21px;font-family: sans-serif;\"><strong>Macbook Pro 14 inch - Chiếc Macbook đáng mong đợi nhất 2021</strong></span></h2>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Kế thừa những tinh hoa từ đời MacBook tốt nhất cùng với những nâng cấp đáng kể trong nhiều năm qua,</span> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><strong>Macbook Pro 14 inch</strong></span> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">dự kiến sẽ là mẫu laptop làm cho giới công nghệ \"phát sốt\", cũng như là cỗ máy xử lý công việc tối ưu hiệu quả.</span>&nbsp;</p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Thiết kế lưng máy phẳng tối giản, màn hình XDR Retina 14 inch rực rỡ</strong></span></h3>\n<p style=\"text-align:start;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-14-pro-1.jpg\" alt=\"Macbook Pro 14 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Máy sẽ mang kiểu dáng được Apple tái thiết kế lại cho dòng</span> <a href=\"https://cellphones.com.vn/laptop/mac/macbook-pro.html\" target=\"_self\"><span style=\"color: rgb(215,0,24);background-color: transparent;font-size: 15px;font-family: sans-serif;\">MacBook Pro</span></a> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">năm 2021. MacBook Pro 14 inch 2021 sẽ được làm phẳng tối giản ở các cạnh nhằm tạo vẻ hiện đại cho máy.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Đặc biệt, máy sẽ được trang bị khe cắm thẻ SDXC. Đây chính là điểm ưu đối với các nhiếp ảnh gia hoặc người dùng không chuộng cổng USB-C để sao lưu dữ liệu.</span><br><br><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Macbook Pro 14 2021 sẽ có màn hình kích thước 14 inch và sử dụng công nghệ màn hình Liquid Retina XDR tiên tiến. Tấm nền sẽ cải thiện độ sáng và độ bão hòa trên màn hình một cách đáng kể, qua đó giúp cho những công việc thiết kế đồ họa hay giải trí trở nên tốt hơn.</span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Bộ vi xử lý hiệu năng mạnh mẽ cần thiết cho mọi công việc</strong></span></h3>\n<p style=\"text-align:start;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-14-pro-2.jpg\" alt=\"Macbook Pro 14 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Thời gian gần đây Apple đã tự mình phát triển thành công bộ vi xử lý riêng, mang tên Apple M1 Pro chip, cho các dòng MacBook của hãng. Và đối với MacBook Pro 14 inch 2021, Apple mang đến cho dòng máy này con chip Apple M1 Pro Chip - thế hệ nối tiếp của Apple M1 trước đó.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Chip Apple có lõi bên trong và kết hợp với chip đồ họa riêng biệt mạnh gấp nhiều lần trước đó, giúp cho máy hoàn toàn phù hợp để sử dụng phần mềm đồ họa nặng, cũng như vận hành mượt mà những tựa game cấu hình cao.</span><br><br><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Máy được Apple trang bị công nghệ hiện đại chứa đựng RAM cùng vị trí như GPU và CPU, do đó mà với dung lượng RAM ổn định, chiếc máy vẫn sẽ vận hành với hiệu năng tốt nhất.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Ngoài ra, cũng đáng chú ý đó là Mac Pro 2021 14 inch sẽ hoàn toàn tương thích với công nghệ Wi-Fi 6 mới nhất. Bởi vì các đời MacBook Pro chạy chip M1 trước đó vốn đã có sẵn Wi-Fi 6, nên sẽ không ngạc nhiên khi MacBook Pro 14 2021 cũng được lắp đặt khả năng kết nối mới nhất này.</span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Thời lượng pin đáp ứng làm việc và giải trí</strong></span></h3>\n<p style=\"text-align:start;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-14-pro-3.jpg\" alt=\"Macbook Pro 14 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Hẳn bạn còn nhớ MacBook Pro chạy chip M1 trước đó có thời lượng sử dụng lên đến nhiều giờ. Vì thế bạn hoàn toàn yên tâm về thời gian sử dụng, bởi MacBook Pro 2021 14 inch sẽ có viên pin cung cấp cho máy khi hoạt động liên tục. Kết hợp cùng với khả năng giảm lượng pin tiêu thụ trên chip, có thể khẳng định thời lượng pin trên MacBook Pro 14 inch 2021 sẽ làm hài lòng tất cả người dùng.</span><br><br><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Ngoài ra, cũng đáng chú ý rằng âm thanh trên Macbook Pro 14 inch cũng được nâng cấp đáng kể. Âm thanh của máy được tinh chỉnh nhằm tạo âm thanh cân bằng hơn, bass sâu hơn, và tích hợp microphone chống ồn giúp cho cuộc trò chuyện video call trở nên suôn sẻ &amp; rõ tiếng.</span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Hiệu năng tản nhiệt ổn định, tản nhiệt hiệu quả</strong></span></h3>\n<p style=\"text-align:start;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-14-pro-4.jpg\" alt=\"Macbook Pro 14 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Phần tản nhiệt chính với cấu trúc quạt bên trong, cũng như bảng mạch chủ tạo không gian thoát nhiệt hiệu quả hơn. Nhờ đó, bạn có thể yên tâm sử dụng MacBook Pro 14 inch và giải trí hoặc làm việc đồ họa nặng mà không phải lo nóng máy. Hệ thống tản nhiệt sẽ làm cho trải nghiệm dùng máy của bạn ổn định hơn nhiều lần.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Một chi tiết khác cũng đáng chú ý đó là cổng MagSafe. Apple đã quyết định mang cổng MagSafe lên dòng MacBook Pro mới, mà khởi đầu chính là MacBook Pro 14 inch. </span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Hơn nữa, với sự phổ biến của MagSafe đối với người dùng iPhone, không ngạc nhiên khi sắp tới Apple sẽ trang bị cổng MagSafe cho MacBook Pro 2021 14 inch để đảm bảo người dùng có thể sử dụng cùng loại phụ kiện cho nhiều thiết bị.</span></p>\n<h2 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 21px;font-family: sans-serif;\"><strong>Mua Macbook Pro 14 inch 2021 tại Online Auction</strong></span></h2>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Có thể thấy, đây hứa hẹn sẽ là chiếc laptop hấp dẫn nhất trong năm 2021, và sẽ là thiết bị đồng hành cùng bạn trong mọi công việc. Để sớm có ngay trong tay chiếc Macbook Pro 14 inch 2021 chính hãng Apple Việt Nam với giá ưu đãi cùng nhiều phần quà hấp dẫn, bạn hãy đến với hệ thống CellphoneS và đặt trước ngay.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Hệ thống CellphoneS mang đến cho bạn loạt sản phẩm mới nhất đến từ Apple và các thương hiệu điện tử đình đám hiện nay. Bạn có thể đến trực tiếp cửa hàng CellphoneS gần nhất tại TPHCM và HN để trải nghiệm sản phẩm, hoặc gọi đến hotline 1800.2097 để được hướng dẫn cách đặt trước Macbook Pro 14 inch.</span>&nbsp;</p>\n', 0),
(65, 'hp-envy-13-2020-111af3259-603f-4a8b-8311-f39c57b24698.jpg', 'Laptop HP Envy 13-BA1028TU 2K0B2PA', 45, 7200, 7200, 15000, 800, 0, 0, 1, '2021-10-30 21:13:43', '2021-11-23 21:11:10', '<h2 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 21px;font-family: sans-serif;\"><strong>Laptop HP Envy 13-BA1028TU 2K0B2PA – Laptop văn phòng mạnh mẽ</strong></span></h2>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Nếu phải hỏi đâu là chiếc laptop mỏng và nhẹ nhất thị trường hiện nay thì</span> <a href=\"https://cellphones.com.vn/laptop/hp/envy.html\" target=\"_blank\"><span style=\"color: rgb(215,0,24);background-color: transparent;font-size: 15px;font-family: sans-serif;\"><strong>laptop HP Envy</strong></span></a> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><strong>13-BA1028TU 2K0B2PA</strong></span> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">là sản phẩm nghĩ ngay đến đầu tiên. Nhưng ngoài công nghệ mỏng nhẹ thì cấu hình hoạt động của nó như thế nào, hãy cùng chúng tôi tìm hiểu qua nhé.</span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Vi xử lý mạnh mẽ: Core i5, Intel Iris Xe, 8 GB RAM</strong></span></h3>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Laptop HP Envy 13-BA1028TU 2K0B2PA được trang bị CPU Intel Core i5 gen 11 với 4 nhân 8 luồng xung nhịp trung bình 2.40 GHz. Với khả năng Boost tối đa lên đến 4.2 GHz giúp cho chiếc laptop này được đánh giá trong top các laptop văn phòng mạnh mẽ nhất.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Đi kèm với đó là GPU Intel Iris Xe cung cấp khả năng xử lý đồ họa nên bạn có thể thực hiện những tác vụ công việc hằng ngày, mọi công việc chất đống và giải trí với tựa game nhẹ nhàng một cách ổn định và mượt mà.</span></p>\n<p style=\"text-align:justify;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/HP/laptop-hp-envy-13-ba1028tu-1-min.jpg\" alt=\"Laptop HP Envy 13-BA1028TU 2K0B2PA \" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Nhằm củng cố thêm sức mạnh đó là 8 GB RAM giúp tạo khả năng đa nhiệm ổn định, hiển nhiên bạn có thể mở hàng loạt tab Chrome và ứng dụng chỉnh sửa ảnh mà vẫn không có tình trạng giật lag. Bên cạnh đó là 512 GB SSD giúp bạn tha hồ lưu trữ và cho hiệu suất làm việc nhanh chóng.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><em>&gt;&gt;&gt;</em></span> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><strong><em>Xem thêm:</em></strong></span> <a href=\"https://cellphones.com.vn/laptop-hp-envy-13-ba1027tu.html\" target=\"_blank\"><span style=\"color: rgb(215,0,24);background-color: transparent;font-size: 15px;font-family: sans-serif;\"><em>Laptop HP Envy NEW 2020 13-BA1027TU 2K0B1PA</em></span></a><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><em>  mỏng nhẹ, cao cấp</em></span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Thiết kế sang trọng, mỏng nhẹ, màn hình 13.3 inches, FullHD</strong></span></h3>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Laptop HP Envy 13-BA1028TU 2K0B2PA được áp dụng bởi những khối kim loại và tạo hình nguyên khối chắc chắn không kém phần sang trọng. Độ dày 16.9 mm và độ nhẹ chỉ 1.236 kg cực kỳ gọn và nhẹ, bạn sẽ không có cảm giác khi bỏ nó vào trong balo hay túi xách nữa đấy.</span></p>\n<p style=\"text-align:justify;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/laptop/HP/laptop-hp-envy-13-ba1028tu-2-min.jpg\" alt=\"Laptop HP Envy 13-BA1028TU 2K0B2PA\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Điểm ấn tượng đó chính là màn hình siêu mỏng với hai cạnh bên chỉ 5mm và phần viền chỉ 14mm. Kích thước là 13.3 inches gọn đi kèm độ phân giải FullHD giúp hiển thị chân thực và độ phủ màu 99%sRGB và 72% NTSC tái tạo màu sắc rõ nét và sinh động.</span>&nbsp;</p>\n', 0),
(75, 'lenovolegion2pro-2dad147db-8d1e-4d0c-8ce1-8cf4207a73ca.jpg', 'Điện Thoại Lenovo Legion 3', 1, 5600, 5600, 16000, 180, 0, 0, 1, '2021-10-30 21:18:39', '2021-11-25 21:15:00', '<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Đúng như các thông tin rò rỉ trước đó,</span> <a href=\"https://fptshop.com.vn/may-tinh-xach-tay/lenovo\" target=\"_self\"><span style=\"color: rgb(1,104,250);background-color: transparent;font-size: 18px;font-family: Roboto, sans-serif;\">Lenovo</span></a> <span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">hôm nay đã chính thức ra mắt chiếc smartphone chuyên game thứ hai của mình, có tên gọi là Legion Phone Duel 2. Sản phẩm này đi kèm với thiết kế được làm mới, dung lượng pin lớn hơn và một loạt tính năng mới.</span></p>\n<h2 style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 3rem;font-family: Roboto, sans-serif;\">Thiết kế Legion Phone Duel 2</span></h2>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-1.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 1)\" style=\"height: 925px;width: 970px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Như tên gọi cho thấy, Legion Phone Duel 2 là mẫu máy kế nhiệm của</span> <a href=\"https://fptshop.com.vn/dien-thoai\" target=\"_self\"><span style=\"color: rgb(1,104,250);background-color: transparent;font-size: 18px;font-family: Roboto, sans-serif;\">điện thoại</span></a> <span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Phone Duel ra mắt từ năm ngoái. Điện thoại này được kế thừa 2 điểm nhấn về thiết kế của thế hệ đầu tiên, bao gồm 2 cổng sạc</span> <a href=\"https://fptshop.com.vn/tin-tuc/danh-gia/usb-type-c-la-gi-tim-hieu-usb-type-c-57333\" target=\"_self\"><span style=\"color: rgb(1,104,250);background-color: transparent;font-size: 18px;font-family: Roboto, sans-serif;\">USB-C</span></a> <span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">và cụm camera selfie pop-up nằm ở cạnh phải.</span> <a href=\"https://fptshop.com.vn/may-tinh-xach-tay/lenovo-legion-gaming\" target=\"_self\"><span style=\"color: rgb(1,104,250);background-color: transparent;font-size: 18px;font-family: Roboto, sans-serif;\">Lenovo Legion</span></a> <span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Phone Duel 2 được nhà sản xuất này định hướng sử dụng theo chiều ngang hơn là theo chiều dọc, do đó hầu hết các linh kiện và thiết kế của máy được đặt theo chiều ngang, bao gồm camera camera selfie.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Chưa hết, điểm nổi bật trong thiết kế của Legion Phone Duel 2 còn đến từ hệ thống 2 tản nhiệt, bao gồm 2 quạt tản nhiệt hoạt động độc lập cùng một lúc ở 2 phía khác nhau của chiếc điện thoại, kèm theo đó là một hệ thống tản nhiệt buồng hơi vapor chamber.</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-2.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 2)\" style=\"height: 531px;width: 960px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Lenovo cho biết hệ thống tản nhiệt này bao gồm một quạt hút với 29 cánh và 12,500 vòng/phút trong khi quạt kia là quạt đầu ra lấy không khí nóng ra ngoài. Lenovo cho biết quạt có độ ồn 24.7dB và tuổi thọ lên đến 50,000 giờ, tức là gần 6 năm.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Cụm camera chính của Lenovo Legion Phone Duel 2 cũng được đặt ở vị trí độc đáo ngay chính giữa mặt lưng, bao gồm 2 ống kính. Nó còn bao gồm cả dải đèn LED RGB đổi màu tùy chỉnh và logo \"Legion\".</span></p>\n<h2 style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 3rem;font-family: Roboto, sans-serif;\">Thông số kỹ thuật</span></h2>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Lenovo cho biết, điện thoại Legion Phone Duel 2 mới được trang bị màn hình kích thước khá lớn, lên tới 6.92 inch, độ phân giải Full HD+ (2,460 x 1,080 pixel), có tần số quét 144Hz cũng như tốc độ lấy mẫu cảm ứng 720Hz và thời gian phản hồi 3.8ms. Màn hình này sử dụng tấm nền OLED với độ sáng tối đa 1,300 nits, hỗ trợ HDR 8-bit với chipset Pixelworks i6 và được bảo vệ bởi kính cường lực Gorilla Glass 5.</span></p>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Bên trong, Legion Phone Duel 2 được cung cấp sức mạnh xử lý đến từ con chip</span> <a href=\"https://fptshop.com.vn/tin-tuc/danh-gia/tim-hieu-vi-xu-ly-snapdragon-888-129051\" target=\"_self\"><span style=\"color: rgb(1,104,250);background-color: transparent;font-size: 18px;font-family: Roboto, sans-serif;\">Snapdragon 888</span></a><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">, đi kèm dung lượng RAM lên tới 18GB LPDDR5 và bộ nhớ 512GB UFS 3.1. Máy chạy sẵn trên Android 11 với giao diện Lenovo ZUI 12.5.</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-4.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 3)\" style=\"height: 960px;width: 929px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Về camera, Legion Phone Duel 2 có cảm biến chính OmniVision 64MP f/1.9 với kích thước điểm ảnh 1.0 µm và đi kèm với camera góc siêu rộng 16MP f/2.2, cho góc chụp lên tới 123°. Smartphone này không có cảm biến độ sâu, máy ảnh tele hoặc máy ảnh macro. Camera trước của nó đã được nâng cấp lên độ phân giải 44MP f/2.0 nhưng vẫn trượt ra giữa khung hình.</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-9.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 7)\" style=\"height: 640px;width: 960px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Legion Phone Duel 2 có thể quay video 8K ở tốc độ 24 khung hình/giây và 4K ở tốc độ 60 khung hình/giây. Nó cũng có thể quay video chuyển động chậm ở 1080p ở tốc độ 240 khung hình/giây và quay ở định dạng RAW cũng như hỗ trợ Audio Zoom.</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-5.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 4)\" style=\"height: 960px;width: 960px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Chưa hết, Legion Phone Duel 2 còn được trang bị loa âm thanh nổi ở mặt trước với Dolby Atmos và chế độ trò chơi giúp nâng cao trải nghiệm âm thanh khi chơi game. Có bốn micro giảm tiếng ồn và một bộ khuếch đại thông minh kép. Nó hỗ trợ Wi-Fi 6 để kết nối.</span></p>\n<p style=\"text-align:center;\"></p>\n<img src=\"https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/133768/Originals/Lenovo-Legion-Phone-2-Pro-7.jpg\" alt=\"Thông tin Lenovo Legion Phone Duel 2 (ảnh 6)\" style=\"height: 640px;width: 960px\"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: Roboto, sans-serif;\">Lenovo Legion Phone Duel 2 cũng được trang bị tới 2 viên pin độc lập có thể được sạc thông qua 2 cổng USB-C với tổng công suất sạc 90W. Củ sạc đi kèm máy là củ sạc 90W có 2 cổng USB-C output và kèm theo 2 sợi cáp USB-C. Trong trường hợp cần sạc lại năng lượng cho máy một cách nhanh chóng, người dùng có thể sử dụng 2 sợi cáp để sạc từ 2 cổng sạc cho công suất sạc siêu nhanh. Theo Lenovo, với 2 cổng sạc, máy có thể sạc đầy 2 viên pin 2750mAh chỉ trong 30 phút và cho thời lượng chơi game tới 8 giờ.</span>&nbsp;</p>\n', 0),
(85, 'acer-nitro-5_11f7b7d58-2858-49a9-b228-4a569d4c478c.jpg', 'Acer Nitro 5 ', 11, 8900, 8900, 27000, 100, 0, 0, 1, '2021-10-31 01:52:59', '2021-11-26 01:51:15', '<h2 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 21px;font-family: sans-serif;\"><strong>Màn hình gaming Acer Nitro VG270 S 27 inch - Tối giản và ấn tượng</strong></span></h2>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><em>Mang thiết kế không chỉ tối giản, mà còn ấn tượng ở mọi góc độ,</em></span> <a href=\"https://cellphones.com.vn/man-hinh/acer.html\" target=\"_blank\"><span style=\"color: rgb(215,0,24);background-color: transparent;font-size: 15px;font-family: sans-serif;\"><strong><em>màn hình gaming Acer</em></strong></span></a> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><strong><em>Nitro VG270 S 27 inch</em></strong></span> <span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\"><em>sẽ mang đến những giờ phút chiến game đầy chân thực dành cho bạn.</em></span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Thiết kế viền siêu mỏng cùng chân đế nổi bật</strong></span></h3>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Màn hình gaming Acer Nitro VG270 S có kích thước tổng 27 inch, độ phân giải Full HD với tốc độ làm tươi 165 Hz cho hình ảnh sắc nét trên từng chi tiết. Đặc biệt, Acer Nitro VG270 S còn có thiết kế viền siêu mỏng ở hai cạnh trái, phải và cạnh trên giúp tạo nên trải nghiệm quan sát đầy ấn tượng cho bạn.</span></p>\n<p style=\"text-align:justify;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/accessories/man-hinh-gaming-acer-nitro-vg270ys-27-inch-1.jpg\" alt=\"Màn hình gaming Acer Nitro VG270 S 27 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Phần chân đế của màn hình Acer Nitro VG270 S mang hình dạng chữ V, cùng phần viền đỏ nền đen giúp làm nên vẻ ngoài hầm hố cho chiếc monitor. Ngoài ra hai phần cạnh của màn hình còn được tích hợp thêm hệ thống loa ngoài tỏa ra âm thanh chân thực, rất hữu ích trong trường hợp bạn không có sẵn dàn âm thanh.</span></p>\n<h3 style=\"text-align:justify;\"><span style=\"color: rgb(10,38,60);background-color: rgb(255,255,255);font-size: 1.75rem;font-family: sans-serif;\"><strong>Tương thích với đế VESA, hỗ trợ đồng bộ FreeSync</strong></span></h3>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Màn hình gaming Acer Nitro VG270 S được tích hợp hai cổng HDMI và một cổng DisplayPort giúp bạn kết nối đến dàn PC, hoặc thậm chí thiết lập nên hệ thống màn hình kép đa nhiệm. Màn hình còn tương thích với đế VESA, cho phép bạn lắp đặt màn hình Acer Nitro VG270 S lên tường hỗ trợ tất cả nhu cầu sử dụng.</span></p>\n<p style=\"text-align:justify;\"></p>\n<img src=\"https://cdn.cellphones.com.vn/media/wysiwyg/accessories/man-hinh-gaming-acer-nitro-vg270ys-27-inch-2.jpg\" alt=\"Màn hình gaming Acer Nitro VG270 S 27 inch\" style=\"height: ;width: \"/>\n<p style=\"text-align:justify;\"><span style=\"color: rgb(68,68,68);background-color: rgb(255,255,255);font-size: 15px;font-family: sans-serif;\">Nhằm tăng chất lượng hình ảnh gaming, màn hình Acer Nitro VG270 S còn hỗ trợ cả công nghệ đồng bộ FreeSync. Qua đó hình ảnh hiển thị trên monitor sẽ luôn mượt mà, không bị giật hoặc rè, cho trải nghiệm giải trí hảo hạng.</span>&nbsp;</p>\n', 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Người Dùng';

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`id_nguoi_dung`, `email`, `ho_ten`, `ngay_sinh`, `dia_chi`, `mat_khau`, `id_quyen_han`, `OTP`, `diem_danhgia_duong`, `diem_danhgia_am`, `expired`) VALUES
(1, 'seller01@gmail.com', 'John Henry a', '2021-10-19 10:00:00.000000', '123 hung vuong', '$2b$10$pDXC0M001TiDqjFAN0HMLuhnTV1cemUWl967tI9UgewIliw62nPM6', 2, NULL, 4, 5, '2021-09-07 20:15:51'),
(6, 'ttdat17ck1@gmail.com', 'Nguyễn Phương Hằng', '2021-05-02 10:00:00.000000', '123 hung vuong', '$2b$10$mgCKOgjtp4N0eIyt0PU2kOujw/xntuNt.L6.VnLdIkDm8kDrCps9O', 2, NULL, 11, 2, '2021-09-16 03:03:07'),
(15, 'hellking9000@gmail.com', 'Dat Truong Thanh', '2019-07-03 17:00:00.000000', '234, Quang Trung', '$2b$10$lPng85X0JugT.muzLyrGe.s6LBqFgLo/nlUDk.hrbGyuGCL1mzpSK', 1, NULL, 4, 1, '2021-10-02 01:19:17'),
(85, 'ngocmy.truong29trade@gmail.com', 'Truong My', NULL, '13123', '$2b$10$9hskGEK8evSL9svsmJtcFeZkhWmXlP/OATd9EF4PHVAp/BqfPfGwS', 2, NULL, 0, 0, '2021-10-17 12:57:59'),
(95, 'admin@aution.com', 'Super Admin', NULL, '123, Hùng Vương', '$2b$10$YGNy.M1V5d14LrWbAyta7ucV.2BAfErHEPE33mbwGVKEUvAleu5GO', 3, NULL, 0, 0, '2021-10-17 12:57:59'),
(96, 'nelened462@gyn5.com', 'seller05', NULL, '123 hung vuong', '$2b$10$lGAlVOIa2geQG3BTLI1ZQODpwc6ys9oaUTrJnc06c8JUXCkLfpb/2', 1, NULL, 12, 0, '2021-11-12 09:54:09');

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
-- Table structure for table `trang_thai_dathang`
--

DROP TABLE IF EXISTS `trang_thai_dathang`;
CREATE TABLE IF NOT EXISTS `trang_thai_dathang` (
  `id_trang_thai` int(11) NOT NULL AUTO_INCREMENT,
  `ten_trang_thai` varchar(200) NOT NULL,
  PRIMARY KEY (`id_trang_thai`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trang_thai_dathang`
--

INSERT INTO `trang_thai_dathang` (`id_trang_thai`, `ten_trang_thai`) VALUES
(1, 'Chờ Xử Lí'),
(2, 'Giao Thành Công'),
(3, 'Hủy Bỏ');

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
(1, 33),
(1, 55),
(6, 24),
(6, 29),
(6, 33),
(6, 38),
(15, 33);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
