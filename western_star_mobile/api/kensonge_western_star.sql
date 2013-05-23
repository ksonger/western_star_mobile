-- phpMyAdmin SQL Dump
-- version 3.4.11.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 22, 2013 at 05:41 PM
-- Server version: 5.5.31
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kensonge_western_star`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  `src` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `thumbnail` text NOT NULL,
  `metaTag` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=80 ;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `type`, `src`, `title`, `description`, `thumbnail`, `metaTag`) VALUES
(1, 'pdf', 'ws_assets/brochures/CumminsAssets/Cummins2013-ISL9&ISB6.7CoverageBrochure.pdf', 'Cummins ISL9 & ISL6', 'A sample description here.', '1', 'vocational:components:models:4700:engines:isl9'),
(2, 'pdf', 'ws_assets/brochures/CumminsAssets/Cummins2013-ISL9Brochure.pdf', 'Cummins ISL9 Brochure', 'A sample description here.', '2', 'highway:components:engines:isl9'),
(3, 'pdf', 'ws_assets/brochures/CumminsAssets/Cummins2013-ISX15&ISX12CoverageBrochure.pdf', 'Cummins ISX15 & ISX12', 'A sample description here.', '3', 'vocational:components:engines:isx15'),
(4, 'pdf', 'ws_assets/brochures/CumminsAssets/Cummins2013-ISX15Brochure.pdf', 'Cummins ISX15 Brochure', 'A sample description here.', '4', 'vocational:models:4900:components:engines:isx15'),
(5, 'pdf', 'ws_assets/brochures/CumminsAssets/Cummins-DriverTipsBrochure.pdf', 'Cummins Driver Tips', 'A sample description here.', '5', 'highway:models:6900:components:engines'),
(6, 'pdf', 'ws_assets/brochures/DetroitAssets/1.13-DD13-Spec-Sheet-FNL2-DDC-6213.pdf', 'DD13 Spec Sheet', 'A sample description here.', '6', 'highway:models:6900:components:engines:dd13'),
(7, 'photo', 'ws_assets/photos/WS_Con_4700SB_Day_Crane_03r.jpg', 'Day Crane', 'A sample description here.', '7', 'vocational:construction'),
(8, 'photo', 'ws_assets/photos/WS_Con_4700SB_Day_Dump_08r.jpg', 'Day Dump Truck', 'A sample description here.', '8', 'vocational:heavy_haul'),
(9, 'photo', 'ws_assets/photos/WS_Con_4700SB_Day_Rolloff_05r.jpg', 'Day Rolloff', 'A sample description here.', '9', 'vocational_municipal'),
(10, 'photo', 'ws_assets/photos/WS_Con_4700SF_Day_dump_05r.jpg', 'Day Dump Truck', 'A sample description here.', '10', 'vocational:towing'),
(11, 'photo', 'ws_assets/photos/WS_Con_4700SF_Day_Mixer_06r.jpg', 'Day Mixer Truck', 'A sample description here.', '11', 'vocational:mining'),
(12, 'photo', 'ws_assets/photos/WS_Con_4800SB_Day_Mixer_02r.jpg', 'Day Mixer Truck', 'A sample description here.', '12', 'vocational:logging'),
(13, 'photo', 'ws_assets/photos/WS_Con_4800SF_Day_Dump_02r.jpg', 'Day Dump Truck', 'A sample description here.', '13', 'highway:sleepers'),
(14, 'photo', 'ws_assets/photos/WS_Con_4800SF_Day_Mixer_01r.jpg', 'Day Mixer Truck', 'A sample description here.', '14', 'highway:bulk_haul'),
(15, 'photo', 'ws_assets/photos/WS_Con_4900SF_Day_Mixer_02r.jpg', 'Day Mixer Truck', 'A sample description here.', '15', 'highway:long_haul'),
(16, 'photo', 'ws_assets/photos/WS_Hwy_4700SB_Day_Bulk_Haul_01r.jpg', 'Day Bulk Haul', 'A sample description here.', '16', 'highway:auto_haul'),
(17, 'photo', 'ws_assets/photos/WS_Hwy_4700SB_Day_Bulk_Haul_03r.jpg', 'Day Bulk Haul', 'A sample description here.', '17', 'highway:lw_options'),
(18, 'video', 'ws_assets/videos/Interior.mp4', 'Panorama of Truck Interior', 'A sample description here.', '18', 'highway:4700'),
(19, 'video', 'ws_assets/videos/Western_Star_roll_off_truck.mp4', 'WS Rolloff Truck', 'A sample description here.', '19', 'highway:fe_options'),
(20, 'video', 'ws_assets/videos/Serious_Passion_for_Custom_Trucks.mp4', 'WS Trucks - Serious Passion for Custom Trucks', 'A sample description here.', '20', 'models:twin_steer');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `key` int(11) NOT NULL AUTO_INCREMENT,
  `id` text NOT NULL,
  `src` text NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`key`, `id`, `src`) VALUES
(1, 'home_button_middle', 'ws_assets/images/home/home_button_middle.png'),
(2, 'home_collage', 'ws_assets/images/home/home_collage.jpg'),
(6, 'home_collage_portrait', 'ws_assets/images/home/home_collage_portrait.png'),
(5, 'home_collage', 'ws_assets/images/home/home_collage.png'),
(7, 'home_icon_1', 'ws_assets/images/home/home_icon_1.png'),
(8, 'home_icon_2', 'ws_assets/images/home/home_icon_2.png'),
(9, 'home_icon_3', 'ws_assets/images/home/home_icon_3.png'),
(10, 'home_icon_4', 'ws_assets/images/home/home_icon_4.png'),
(11, 'lang_check', 'ws_assets/images/lang_menu/lang_check.png'),
(12, 'lang_menu_bottomleft', 'ws_assets/images/lang_menu/lang_menu_bottomleft.png'),
(13, 'lang_menu_bottommiddle', 'ws_assets/images/lang_menu/lang_menu_bottommiddle.png'),
(14, 'lang_menu_bottomright', 'ws_assets/images/lang_menu/lang_menu_bottomright.png'),
(15, 'lang_menu_middle', 'ws_assets/images/lang_menu/lang_menu_middle.png'),
(16, 'lang_menu_middleleft', 'ws_assets/images/lang_menu/lang_menu_middleleft.png'),
(17, 'lang_menu_middleright', 'ws_assets/images/lang_menu/lang_menu_middleright.png'),
(18, 'lang_menu_topleft', 'ws_assets/images/lang_menu/lang_menu_topleft.png'),
(19, 'lang_menu_topmiddle', 'ws_assets/images/lang_menu/lang_menu_topmiddle.png'),
(20, 'lang_menu_topright', 'ws_assets/images/lang_menu/lang_menu_topright.png'),
(21, 'library_background', 'ws_assets/images/library/library_background.png'),
(22, 'search_box', 'ws_assets/images/library/search_box.png'),
(23, 'login_background', 'ws_assets/images/login/login_background.png'),
(24, 'login_box_left', 'ws_assets/images/login/login_box_left.png'),
(25, 'login_box_middle', 'ws_assets/images/login/login_box_middle.png'),
(26, 'login_box_right', 'ws_assets/images/login/login_box_right.png'),
(27, 'login_btn_left', 'ws_assets/images/login/login_btn_left.png'),
(28, 'login_btn_middle', 'ws_assets/images/login/login_middle.png'),
(29, 'login_btn_right', 'ws_assets/images/login/login_btn_right.png'),
(30, 'icon_calculators_off', 'ws_assets/images/tabstrip/icon_calculators_off.png'),
(31, 'icon_calculators_on', 'ws_assets/images/tabstrip/icon_calculators_on.png'),
(32, 'icon_home_off', 'ws_assets/images/tabstrip/icon_home_off.png'),
(33, 'icon_home_on', 'images/tabstrip/icon_home_on.png'),
(34, 'icon_interiors_off', 'images/tabstrip/icon_interiors_off.png'),
(35, 'icon_interiors_on', 'images/tabstrip/icon_interiors_on.png'),
(36, 'icon_library_off', 'images/tabstrip/icon_library_off.png'),
(37, 'icon_library_on', 'images/tabstrip/icon_library_on.png'),
(38, 'icon_wst_off', 'images/tabstrip/icon_wst_off.png'),
(39, 'icon_wst_on', 'images/tabstrip/icon_wst_on.png'),
(40, 'tabstrip', 'images/tabstrip/tabstrip.png'),
(41, 'tabstrip_active', 'images/tabstrip/tabstrip_active.png'),
(42, 'lang_button_left', 'images/lang_button_left.png'),
(43, 'lang_button_middle', 'images/lang_button_middle.png'),
(44, 'lang_button_right', 'images/lang_button_right.png'),
(45, 'main_background', 'images/main_background.png'),
(46, 'ws_logo', 'images/ws_logo.png'),
(47, 'utility_bar_middle', 'images/utility_bar_middle.png');

-- --------------------------------------------------------

--
-- Table structure for table `interiors_categories`
--

DROP TABLE IF EXISTS `interiors_categories`;
CREATE TABLE IF NOT EXISTS `interiors_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `title` text NOT NULL,
  `subcategories` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `interiors_categories`
--

INSERT INTO `interiors_categories` (`id`, `name`, `image`, `title`, `subcategories`) VALUES
(1, 'day_cab', 'ws_assets/interiors/categories/btn_conf01.jpg', 'interiors_categories_day_cab', '1,2,3,4'),
(2, 'high_sleeper', 'ws_assets/interiors/categories/btn_conf02.jpg', 'interiors_categories_high_sleeper', '5,6,7,8'),
(3, 'low_sleeper', 'ws_assets/interiors/categories/btn_conf03.jpg', 'interiors_categories_low_sleeper', '9,10,11,12,13');

-- --------------------------------------------------------

--
-- Table structure for table `interiors_images`
--

DROP TABLE IF EXISTS `interiors_images`;
CREATE TABLE IF NOT EXISTS `interiors_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `view` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=159 ;

--
-- Dumping data for table `interiors_images`
--

INSERT INTO `interiors_images` (`id`, `name`, `image`, `view`) VALUES
(1, 'Cab_Day_Base_3q_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_3q_01.jpg', '3q'),
(2, 'Cab_Day_Base_3q_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_3q_02.jpg', '3q'),
(3, 'Cab_Day_Base_3q_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_3q_03.jpg', '3q'),
(4, 'Cab_Day_Base_3q_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_3q_04.jpg', '3q'),
(5, 'Cab_Day_Base_Dash_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Dash_01.jpg', 'dash'),
(6, 'Cab_Day_Base_Dash_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Dash_02.jpg', 'dash'),
(7, 'Cab_Day_Base_Dash_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Dash_03.jpg', 'dash'),
(8, 'Cab_Day_Base_Rear_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_01.jpg', 'rear'),
(9, 'Cab_Day_Base_Rear_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_02.jpg', 'rear'),
(10, 'Cab_Day_Base_Rear_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_03.jpg', 'rear'),
(11, 'Cab_Day_Base_Rear_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_04.jpg', 'rear'),
(12, 'Cab_Day_Base_Rear_05', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_05.jpg', 'rear'),
(13, 'Cab_Day_Base_Rear_06', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_06.jpg', 'rear'),
(14, 'Cab_Day_Base_Rear_07', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_07.jpg', 'rear'),
(15, 'Cab_Day_Base_Rear_08', 'ws_assets/interiors/galleries/day_cab/Cab_Day_Base_Rear_08.jpg', 'rear'),
(16, 'Cab_Day_MLRed_3q_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_3q_01.jpg', '3q'),
(17, 'Cab_Day_MLRed_3q_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_3q_02.jpg', '3q'),
(18, 'Cab_Day_MLRed_3q_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_3q_03.jpg', '3q'),
(19, 'Cab_Day_MLRed_3q_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_3q_04.jpg', '3q'),
(20, 'Cab_Day_MLRed_Dash_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Dash_01.jpg', 'dash'),
(21, 'Cab_Day_MLRed_Dash_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Dash_02.jpg', 'dash'),
(22, 'Cab_Day_MLRed_Rear_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_01.jpg', 'rear'),
(23, 'Cab_Day_MLRed_Rear_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_02.jpg', 'rear'),
(24, 'Cab_Day_MLRed_Rear_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_03.jpg', 'rear'),
(25, 'Cab_Day_MLRed_Rear_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_04.jpg', 'rear'),
(26, 'Cab_Day_MLRed_Rear_05', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_05.jpg', 'rear'),
(27, 'Cab_Day_MLRed_Rear_06', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_06.jpg', 'rear'),
(28, 'Cab_Day_MLRed_Rear_07', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_07.jpg', 'rear'),
(29, 'Cab_Day_MLRed_Rear_08', 'ws_assets/interiors/galleries/day_cab/Cab_Day_MLRed_Rear_08.jpg', 'rear'),
(30, 'Cab_Day_PFGreen_3q_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_3q_02.jpg', '3q'),
(31, 'Cab_Day_PFGreen_3q_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_3q_03.jpg', '3q'),
(32, 'Cab_Day_PFGreen_3q_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_3q_04.jpg', '3q'),
(33, 'Cab_Day_PFGreen_Dash_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Dash_01.jpg', 'dash'),
(34, 'Cab_Day_PFGreen_Dash_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Dash_02.jpg', 'dash'),
(35, 'Cab_Day_PFGreen_Rear_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_01.jpg', 'rear'),
(36, 'Cab_Day_PFGreen_Rear_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_02.jpg', 'rear'),
(37, 'Cab_Day_PFGreen_Rear_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_03.jpg', 'rear'),
(38, 'Cab_Day_PFGreen_Rear_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_04.jpg', 'rear'),
(39, 'Cab_Day_PFGreen_Rear_05', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_05.jpg', 'rear'),
(40, 'Cab_Day_PFGreen_Rear_06', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_06.jpg', 'rear'),
(41, 'Cab_Day_PFGreen_Rear_07', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_07.jpg', 'rear'),
(42, 'Cab_Day_PFGreen_Rear_08', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_Rear_08.jpg', 'rear'),
(43, 'Cab_Day_PBuck_3q_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_3q_01.jpg', '3q'),
(44, 'Cab_Day_PBuck_3q_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_3q_02.jpg', '3q'),
(45, 'Cab_Day_PBuck_Dash_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_Dash_01.jpg', 'dash'),
(46, 'Cab_Day_PBuck_Rear_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_Rear_01.jpg', 'rear'),
(47, 'Cab_Day_PBuck_Rear_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_Rear_02.jpg', 'rear'),
(48, 'Cab_Day_PBuck_Rear_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_Rear_03.jpg', 'rear'),
(49, 'Cab_Day_PBuck_Rear_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PBuck_Rear_04.jpg', 'rear'),
(50, 'Cab_Day_SMGray_3q_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_3q_01.jpg', '3q'),
(51, 'Cab_Day_SMGray_3q_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_3q_02.jpg', '3q'),
(52, 'Cab_Day_SMGray_3q_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_3q_03.jpg', '3q'),
(53, 'Cab_Day_SMGray_3q_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_3q_04.jpg', '3q'),
(54, 'Cab_Day_SMGray_Dash_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Dash_01.jpg', 'dash'),
(55, 'Cab_Day_SMGray_Dash_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Dash_02.jpg', 'dash'),
(56, 'Cab_Day_SMGray_Dash_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Dash_03.jpg', 'dash'),
(57, 'Cab_Day_SMGray_Rear_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_01.jpg', 'rear'),
(58, 'Cab_Day_SMGray_Rear_02', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_02.jpg', 'rear'),
(59, 'Cab_Day_SMGray_Rear_03', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_03.jpg', 'rear'),
(60, 'Cab_Day_SMGray_Rear_04', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_04.jpg', 'rear'),
(61, 'Cab_Day_SMGray_Rear_05', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_05.jpg', 'rear'),
(62, 'Cab_Day_SMGray_Rear_06', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_06.jpg', 'rear'),
(63, 'Cab_Day_SMGray_Rear_07', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_07.jpg', 'rear'),
(64, 'Cab_Day_SMGray_Rear_08', 'ws_assets/interiors/galleries/day_cab/Cab_Day_SMGray_Rear_08.jpg', 'rear'),
(65, 'Cab_Day_PFGreen_3q_01', 'ws_assets/interiors/galleries/day_cab/Cab_Day_PFGreen_3q_01.jpg', '3q'),
(66, 'High_Cordura_Black', 'ws_assets/interiors/galleries/seats/High_Cordura_Black.jpg', 'seat'),
(67, 'High_Leather_2tone_MLRed', 'ws_assets/interiors/galleries/seats/High_Leather_2tone_MLRed.jpg', 'seat'),
(68, 'High_Leather_2tone_PFGreen', 'ws_assets/interiors/galleries/seats/High_Leather_2tone_PFGreen.jpg', 'seat'),
(69, 'High_Leather_2tone_PBuck', 'ws_assets/interiors/galleries/seats/High_Leather_2tone_PBuck.jpg', 'seat'),
(70, 'High_Leather_2tone_SMGray', 'ws_assets/interiors/galleries/seats/High_Leather_2tone_SMGray.jpg', 'seat'),
(71, 'High_Leather_Solid_Black', 'ws_assets/interiors/galleries/seats/High_Leather_Solid_Black.jpg', 'seat'),
(72, 'High_Leather_Solid_Gray', 'ws_assets/interiors/galleries/seats/High_Leather_Solid_Gray.jpg', 'seat'),
(73, 'High_Leather_Solid_MLRed', 'ws_assets/interiors/galleries/seats/High_Leather_Solid_MLRed.jpg', 'seat'),
(74, 'High_Leather_Solid_PFGreen', 'ws_assets/interiors/galleries/seats/High_Leather_Solid_PFGreen.jpg', 'seat'),
(75, 'High_Leather_Solid_PBuck', 'ws_assets/interiors/galleries/seats/High_Leather_Solid_PBuck.jpg', 'seat'),
(76, 'High_Mordura_Black', 'ws_assets/interiors/galleries/seats/High_Mordura_Black.jpg', 'seat'),
(77, 'High_Mordura_Gray', 'ws_assets/interiors/galleries/seats/High_Mordura_Gray.jpg', 'seat'),
(78, 'High_Mordura_MLRed', 'ws_assets/interiors/galleries/seats/High_Mordura_MLRed.jpg', 'seat'),
(79, 'High_Mordura_PBuck', 'ws_assets/interiors/galleries/seats/High_Mordura_PBuck.jpg', 'seat'),
(80, 'High_Vinyl_Black', 'ws_assets/interiors/galleries/seats/High_Vinyl_Black.jpg', 'seat'),
(81, 'High_Vinyl_Gray', 'ws_assets/interiors/galleries/seats/High_Vinyl_Gray.jpg', 'seat'),
(82, 'Mid_Cordura_Black', 'ws_assets/interiors/galleries/seats/Mid_Cordura_Black.jpg', 'seat'),
(83, 'Mid_Leather_Black', 'ws_assets/interiors/galleries/seats/Mid_Leather_Black.jpg', 'seat'),
(84, 'Mid_Leather_MLRed', 'ws_assets/interiors/galleries/seats/Mid_Leather_MLRed.jpg', 'seat'),
(85, 'Mid_Leather_PFGreen', 'ws_assets/interiors/galleries/seats/Mid_Leather_PFGreen.jpg', 'seat'),
(86, 'Mid_Leather_PBuck', 'ws_assets/interiors/galleries/seats/Mid_Leather_PBuck.jpg', 'seat'),
(87, 'Mid_Leather_SMGray', 'ws_assets/interiors/galleries/seats/Mid_Leather_SMGray.jpg', 'seat'),
(88, 'Mid_Mordura_Black', 'ws_assets/interiors/galleries/seats/Mid_Mordura_Black.jpg', 'seat'),
(89, 'Mid_Mordura_Gray', 'ws_assets/interiors/galleries/seats/Mid_Mordura_Gray.jpg', 'seat'),
(90, 'Mid_Mordura_MLRed', 'ws_assets/interiors/galleries/seats/Mid_Mordura_MLRed.jpg', 'seat'),
(91, 'Mid_Mordura_PBuck', 'ws_assets/interiors/galleries/seats/Mid_Mordura_PBuck.jpg', 'seat'),
(92, 'Bench_Cordura_Black', 'ws_assets/interiors/galleries/seats/Bench_Cordura_Black.jpg', 'seat'),
(93, 'Bench_Leather_Black', 'ws_assets/interiors/galleries/seats/Bench_Leather_Black.jpg', 'seat'),
(94, 'Bench_Leather_MLRed', 'ws_assets/interiors/galleries/seats/Bench_Leather_MLRed.jpg', 'seat'),
(95, 'Bench_Leather_PFGreen', 'ws_assets/interiors/galleries/seats/Bench_Leather_PFGreen.jpg', 'seat'),
(96, 'Bench_Leather_PBuck', 'ws_assets/interiors/galleries/seats/Bench_Leather_PBuck.jpg', 'seat'),
(97, 'Bench_Leather_SMGray', 'ws_assets/interiors/galleries/seats/Bench_Leather_SMGray.jpg', 'seat'),
(98, 'Bench_Mordura_Black', 'ws_assets/interiors/galleries/seats/Bench_Mordura_Black.jpg', 'seat'),
(99, 'Bench_Mordura_Gray', 'ws_assets/interiors/galleries/seats/Bench_Mordura_Gray.jpg', 'seat'),
(100, 'Bench_Mordura_MLRed', 'ws_assets/interiors/galleries/seats/Bench_Mordura_MLRed.jpg', 'seat'),
(101, 'Bench_Mordura_PBuck', 'ws_assets/interiors/galleries/seats/Bench_Mordura_PBuck.jpg', 'seat'),
(102, 'Bench_Vinyl_Black', 'ws_assets/interiors/galleries/seats/Bench_Vinyl_Black.jpg', 'seat'),
(103, 'Bench_Vinyl_Gray', 'ws_assets/interiors/galleries/seats/Bench_Vinyl_Gray.jpg', 'seat'),
(104, 'Cab_HR_MLRed_3q_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_MLRed_3q_01.jpg', '3q'),
(105, 'Cab_HR_MLRed_Dash_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_MLRed_Dash_01.jpg', 'dash'),
(106, 'Cab_HR_MLRed_Rear_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_MLRed_Rear_01.jpg', 'rear'),
(107, 'Cab_HR_MLRed_Rear_02', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_MLRed_Rear_02.jpg', 'rear'),
(108, 'Cab_HR_PFGreen_3q_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PFGreen_3q_01.jpg', '3q'),
(109, 'Cab_HR_PFGreen_Dash_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PFGreen_Dash_01.jpg', 'dash'),
(110, 'Cab_HR_PFGreen_Rear_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PFGreen_Rear_01.jpg', 'rear'),
(111, 'Cab_HR_PFGreen_Rear_02', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PFGreen_Rear_02.jpg', 'rear'),
(112, 'Cab_HR_PBuck_3q_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PBuck_3q_01.jpg', '3q'),
(113, 'Cab_HR_PBuck_Dash_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PBuck_Dash_01.jpg', 'dash'),
(114, 'Cab_HR_PBuck_Rear_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PBuck_Rear_01.jpg', 'rear'),
(115, 'Cab_HR_PBuck_Rear_02', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_PBuck_Rear_02.jpg', 'rear'),
(116, 'Cab_HR_SMGray_3q_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_3q_01.jpg', '3q'),
(117, 'Cab_HR_SMGray_Dash_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_Dash_01.jpg', 'dash'),
(118, 'Cab_HR_SMGray_Dash_02', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_Dash_02.jpg', 'dash'),
(119, 'Cab_HR_SMGray_Dash_03', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_Dash_03.jpg', 'dash'),
(120, 'Cab_HR_SMGray_Rear_01', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_Rear_01.jpg', 'rear'),
(121, 'Cab_HR_SMGray_Rear_02', 'ws_assets/interiors/galleries/sleeper_high/Cab_HR_SMGray_Rear_02.jpg', 'rear'),
(122, 'Cab_LR_Base_3q_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_3q_01.jpg', '3q'),
(123, 'Cab_LR_Base_3q_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_3q_02.jpg', '3q'),
(124, 'Cab_LR_Base_Dash_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Dash_01.jpg', 'dash'),
(125, 'Cab_LR_Base_Dash_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Dash_02.jpg', 'dash'),
(126, 'Cab_LR_Base_Dash_03', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Dash_03.jpg', 'dash'),
(127, 'Cab_LR_Base_Rear_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Rear_01.jpg', 'rear'),
(128, 'Cab_LR_Base_Rear_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Rear_02.jpg', 'rear'),
(129, 'Cab_LR_Base_Rear_03', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Rear_03.jpg', 'rear'),
(130, 'Cab_LR_Base_Rear_04', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_Base_Rear_04.jpg', 'rear'),
(131, 'Cab_LR_MLRed_3q_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_3q_01.jpg', '3q'),
(132, 'Cab_LR_MLRed_3q_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_3q_02.jpg', '3q'),
(133, 'Cab_LR_MLRed_Dash_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Dash_01.jpg', 'dash'),
(134, 'Cab_LR_MLRed_Dash_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Dash_02.jpg', 'dash'),
(135, 'Cab_LR_MLRed_Rear_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Rear_01.jpg', 'rear'),
(136, 'Cab_LR_MLRed_Rear_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Rear_02.jpg', 'rear'),
(137, 'Cab_LR_MLRed_Rear_03', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Rear_03.jpg', 'rear'),
(138, 'Cab_LR_MLRed_Rear_04', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_MLRed_Rear_04.jpg', 'rear'),
(139, 'Cab_LR_PFGreen_3q_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_3q_01.jpg', '3q'),
(140, 'Cab_LR_PFGreen_3q_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_3q_02.jpg', '3q'),
(141, 'Cab_LR_PFGreen_Dash_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Dash_01.jpg', 'dash'),
(142, 'Cab_LR_PFGreen_Dash_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Dash_02.jpg', 'dash'),
(143, 'Cab_LR_PFGreen_Rear_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Rear_01.jpg', 'rear'),
(144, 'Cab_LR_PFGreen_Rear_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Rear_02.jpg', 'rear'),
(145, 'Cab_LR_PFGreen_Rear_03', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Rear_03.jpg', 'rear'),
(146, 'Cab_LR_PFGreen_Rear_04', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PFGreen_Rear_04.jpg', 'rear'),
(147, 'Cab_LR_PBuck_3q_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PBuck_3q_01.jpg', '3q'),
(148, 'Cab_LR_PBuck_Dash_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PBuck_Dash_01.jpg', 'dash'),
(149, 'Cab_LR_PBuck_Rear_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PBuck_Rear_01.jpg', 'rear'),
(150, 'Cab_LR_PBuck_Rear_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_PBuck_Rear_02.jpg', 'rear'),
(151, 'Cab_LR_SMGray_3q_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_3q_01.jpg', '3q'),
(152, 'Cab_LR_SMGray_3q_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_3q_02.jpg', '3q'),
(153, 'Cab_LR_SMGray_Dash_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Dash_01.jpg', 'dash'),
(154, 'Cab_LR_SMGray_Dash_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Dash_02.jpg', 'dash'),
(155, 'Cab_LR_SMGray_Rear_01', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Rear_01.jpg', 'rear'),
(156, 'Cab_LR_SMGray_Rear_02', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Rear_02.jpg', 'rear'),
(157, 'Cab_LR_SMGray_Rear_03', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Rear_03.jpg', 'rear'),
(158, 'Cab_LR_SMGray_Rear_04.jpg', 'ws_assets/interiors/galleries/sleeper_low/Cab_LR_SMGray_Rear_04.jpg', 'rear');

-- --------------------------------------------------------

--
-- Table structure for table `interiors_navigation`
--

DROP TABLE IF EXISTS `interiors_navigation`;
CREATE TABLE IF NOT EXISTS `interiors_navigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `view` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `interiors_navigation`
--

INSERT INTO `interiors_navigation` (`id`, `name`, `image`, `view`) VALUES
(1, '3q_Base', 'ws_assets/interiors/galleries/navigation/btn_cab_day_3q_base.png', '3q'),
(2, '3q_MapleLeafRed', 'ws_assets/interiors/galleries/navigation/btn_cab_day_3q_MLRed.png', '3q'),
(3, '3q_PacificForestGreen', 'ws_assets/interiors/galleries/navigation/btn_cab_day_3q_PFGreen.png', '3q'),
(4, '3q_PrairieBuckskin', 'ws_assets/interiors/galleries/navigation/btn_cab_day_3q_PBuck.png', '3q'),
(5, '3q_SmokyMountainGray', 'ws_assets/interiors/galleries/navigation/btn_cab_day_3q_SMGray.png', '3q'),
(6, 'dash_Base', 'ws_assets/interiors/galleries/navigation/btn_cab_day_dash_base.png', 'dash'),
(7, 'dash_MapleLeafRed', 'ws_assets/interiors/galleries/navigation/btn_cab_day_dash_MLRed.png', 'dash'),
(8, 'dash_PacificForestGreen', 'ws_assets/interiors/galleries/navigation/btn_cab_day_dash_PFGreen.png', 'dash'),
(9, 'dash_PrairieBuckskin', 'ws_assets/interiors/galleries/navigation/btn_cab_day_dash_PBuck.png', 'dash'),
(10, 'dash_SmokyMountainGray', 'ws_assets/interiors/galleries/navigation/btn_cab_day_dash_SMGray.png', 'dash'),
(11, 'rear_Base', 'ws_assets/interiors/galleries/navigation/btn_cab_day_rear_base.png', 'rear'),
(12, 'rear_MapleLeafRed', 'ws_assets/interiors/galleries/navigation/btn_cab_day_rear_MLRed.png', 'rear'),
(13, 'rear_PacificForestGreen', 'ws_assets/interiors/galleries/navigation/btn_cab_day_rear_PFGreen.png', 'rear'),
(14, 'rear_PrairieBuckskin', 'ws_assets/interiors/galleries/navigation/btn_cab_day_rear_PBuck.png', 'rear'),
(15, 'rear_SmokyMountainGray', 'ws_assets/interiors/galleries/navigation/btn_cab_day_rear_SMGray.png', 'rear'),
(16, 'seat_MapleLeafRed', 'ws_assets/interiors/galleries/navigation/btn_seat_MLRed.png', 'seat'),
(17, 'seat_PacificForestGreen', 'ws_assets/interiors/galleries/navigation/btn_seat_PFGreen.png', 'seat'),
(18, 'seat_PrairieBuckskin', 'ws_assets/interiors/galleries/navigation/btn_seat_PBuck.png', 'seat'),
(19, 'seat_SmokyMountainGray', 'ws_assets/interiors/galleries/navigation/btn_seat_SMGray.png', 'seat');

-- --------------------------------------------------------

--
-- Table structure for table `interiors_subcategories`
--

DROP TABLE IF EXISTS `interiors_subcategories`;
CREATE TABLE IF NOT EXISTS `interiors_subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `images` text NOT NULL,
  `swatch` text NOT NULL,
  `nav_ids` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `interiors_subcategories`
--

INSERT INTO `interiors_subcategories` (`id`, `name`, `image`, `images`, `swatch`, `nav_ids`) VALUES
(1, 'btn_dayCab_Buckskin', 'ws_assets/interiors/subcategories/btn_dayCab_PBuck.jpg', '43,44,45,46,47,48,49', 'ws_assets/interiors/subcategories/swatch_PBuck.png', '4,9,14,18'),
(2, 'btn_dayCab_MapleLeafRed', 'ws_assets/interiors/subcategories/btn_dayCab_MLRed.jpg', '16,17,18,19,20,21,22,23,24,25,26,27,28,29', 'ws_assets/interiors/subcategories/swatch_MLRed.png', '2,7,12,16'),
(3, 'btn_dayCab_PacificForestGreen', 'ws_assets/interiors/subcategories/btn_dayCab_PFGreen.jpg', '30,31,32,33,34,35,36,37,38,39,40,41,42', 'ws_assets/interiors/subcategories/swatch_PFGreen.png', '3,8,13,17'),
(4, 'btn_dayCab_SmokeyMountainGray', 'ws_assets/interiors/subcategories/btn_dayCab_SMGray.jpg', '50,51,52,53,54,55,56,57,58,59,60,61,62,63,64', 'ws_assets/interiors/subcategories/swatch_SMGray.png', '5,10,15,19'),
(5, 'btn_sleeperHigh_Buckskin', 'ws_assets/interiors/subcategories/btn_sleeperHigh_PBuck.jpg', '112,113,114,115', 'ws_assets/interiors/subcategories/swatch_PBuck.png', '4,9,14,18'),
(6, 'btn_sleeperHigh_MapleLeafRed', 'ws_assets/interiors/subcategories/btn_sleeperHigh_MLRed.jpg', '104,105,106,107', 'ws_assets/interiors/subcategories/swatch_MLRed.png', '2,7,12,16'),
(7, 'btn_sleeperHigh_PacificForestGreen', 'ws_assets/interiors/subcategories/btn_sleeperHigh_PFGreen.jpg', '108,109,110,111', 'ws_assets/interiors/subcategories/swatch_PFGreen.png', '3,8,13,17'),
(8, 'btn_sleeperHigh_SmokyMountainGray', 'ws_assets/interiors/subcategories/btn_sleeperHigh_SMGray.jpg', '116,117,118,119,120,121', 'ws_assets/interiors/subcategories/swatch_SMGray.png', '5,10,15,19'),
(9, 'btn_sleeperLow_Base', 'ws_assets/interiors/subcategories/btn_sleeperLow_Base.jpg', '122,123,124,125,126,127,128,129,130', 'ws_assets/interiors/subcategories/swatch_Base.png', '1,6,11'),
(10, 'btn_sleeperLow_Buckskin', 'ws_assets/interiors/subcategories/btn_sleeperLow_PBuck.jpg', '147,148,149,150', 'ws_assets/interiors/subcategories/swatch_PBuck.png', '4,9,14,18'),
(11, 'btn_sleeperLow_MapleLeafRed', 'ws_assets/interiors/subcategories/btn_sleeperLow_MLRed.jpg', '131,132,133,134,135,136,137,138', 'ws_assets/interiors/subcategories/swatch_MLRed.png', '2,7,12,16'),
(12, 'btn_sleeperLow_PacificForestGreen', 'ws_assets/interiors/subcategories/btn_sleeperLow_PFGreen.jpg', '139,140,141,142,143,144,145,146', 'ws_assets/interiors/subcategories/swatch_PFGreen.png', '3,8,13,17'),
(13, 'btn_sleeperLow_SmokyMountainGray', 'ws_assets/interiors/subcategories/btn_sleeperLow_SMGray.jpg', '151,152,153,154,155,156,157,158', 'ws_assets/interiors/subcategories/swatch_SMGray.png', '5,10,15,19');

-- --------------------------------------------------------

--
-- Table structure for table `library_menu`
--

DROP TABLE IF EXISTS `library_menu`;
CREATE TABLE IF NOT EXISTS `library_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `value` text NOT NULL,
  `displayOrder` int(11) NOT NULL,
  `child_id_set` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `library_menu`
--

INSERT INTO `library_menu` (`id`, `text`, `value`, `displayOrder`, `child_id_set`) VALUES
(1, 'Overview', 'overview', 1, '0'),
(2, 'Vocational', 'vocational', 2, '6,7,8,9,10,11,12'),
(3, 'Highway', 'highway', 3, '13,14,15,16,17,18,19'),
(4, 'Models', 'models', 4, '18,21,22,23,42'),
(6, 'Towing & Recovery', 'towing', 1, '0'),
(7, 'Municipal', 'municipal', 2, '0'),
(8, 'Mining', 'mining', 3, '0'),
(9, 'Logging', 'logging', 4, '0'),
(10, 'Oil & Gas', 'oil', 5, '0'),
(11, 'Construction', 'construction', 6, '0'),
(12, 'Heavy Haul', 'heavy_haul', 7, '0'),
(13, 'Sleepers', 'sleepers', 1, '0'),
(14, 'Long Haul', 'long_haul', 2, '0'),
(15, 'Bulk Haul', 'bulk_haul', 3, '0'),
(16, 'Auto Haul', 'auto_haul', 4, '0'),
(17, 'Lightweight Options', 'lw_options', 5, '0'),
(18, '4700', '4700', 6, '0'),
(19, 'Fuel Economy', 'fe_options', 7, '0'),
(20, '4700', '4700', 1, '0'),
(21, '4800', '4800', 2, '0'),
(22, '4900', '4900', 3, '0'),
(23, '6900', '6900', 4, '0'),
(24, 'Engines', 'engines', 1, '28,29,30,31,32,33,34,35'),
(25, 'Transmissions', 'transmissions', 2, '36'),
(26, 'Axles', 'axles', 3, '37,38,39'),
(27, 'Suspensions', 'suspensions', 4, '40,41'),
(28, 'DD15', 'dd15', 1, '0'),
(29, 'DD15t', 'dd15t', 2, '0'),
(30, 'DD13', 'dd13', 3, '0'),
(31, 'DD16', 'dd16', 4, '0'),
(32, 'CUMMINS ISX15', 'isx15', 5, '0'),
(33, 'CUMMINS ISX12', 'isx12', 6, '0'),
(34, 'CUMMINS ISL9', 'isl9', 7, '0'),
(35, 'CUMMINS ISB6.7', 'isb67', 8, '0'),
(36, 'DT12', 'dt12', 1, '0'),
(37, 'Front Steer Axles', 'front_steer_axles', 1, '0'),
(38, 'Single Rear Axles', 'single_rear_axles', 2, '0'),
(39, 'Tandem Rear Axles', 'tandem_rear_axles', 3, '0'),
(40, 'TufTrac', 'tuftrac', 1, '0'),
(41, 'AirLiner', 'airliner', 2, '0'),
(5, 'Components', 'components', 5, '24,25,26,27'),
(42, 'Twin Steer', 'twin', 5, '0');

-- --------------------------------------------------------

--
-- Table structure for table `strings`
--

DROP TABLE IF EXISTS `strings`;
CREATE TABLE IF NOT EXISTS `strings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `en` varchar(1000) NOT NULL,
  `fr` varchar(1000) NOT NULL,
  `dt` varchar(1000) NOT NULL,
  `es` varchar(1000) NOT NULL,
  `ko` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=113 ;

--
-- Dumping data for table `strings`
--

INSERT INTO `strings` (`id`, `name`, `en`, `fr`, `dt`, `es`, `ko`) VALUES
(1, 'login_welcome', 'Welcome to the<br/>Western Star<br/>Sales Accelerator', 'Bienvenue à l''assistant<br/>DTNA des ventes <br/>internationales', 'Willkommen auf der DTNA <br/>Internationale <br/>Sales Assistant', 'Bienvenido al Asistente <br/>de Ventas <br/>Internacionales DTNA', 'DTNA 국제 영업 길잡이에 오신 것을 환영합니다'),
(2, 'login_username', 'Username', 'Nom d''utilisateur', 'Benutzername', 'Nombre de usuario', '사용자 이름'),
(3, 'login_password', 'Password', 'Mot de passe', 'Kennwort', 'Contraseña', '암호'),
(4, 'login_english', 'English', 'English', 'English', 'English', 'English'),
(5, 'login_french', 'French', 'French', 'French', 'French', 'French'),
(6, 'login_german', 'Deutsch', 'Deutsch', 'Deutsch', 'Deutsch', 'Deutsch'),
(7, 'login_spanish', 'Español', 'Español', 'Español', 'Español', 'Español'),
(8, 'login_korean', '한국어', '한국어', '한국어', '한국어', '한국어'),
(9, 'login_legal', 'Copyright © Daimler Trucks North America.  Privacy Statement, Legal Notices, and Terms.  All rights reserved. Western Star Trucks Sales, Inc. is a subsidiary of Daimler Trucks North America LLC, a Daimler company.', 'Copyright © Daimler Trucks North America. Déclaration de confidentialité, Mentions légales, et Conditions. Tous droits réservés. Western Star Trucks Sales, Inc est une filiale de Daimler Trucks North America LLC, une société de Daimler.', 'Copyright © Daimler Trucks North America. Datenschutz, rechtliche Hinweise und Nutzungsbedingungen. Alle Rechte vorbehalten. Western Star Trucks Sales, Inc. ist eine Tochtergesellschaft von Daimler Trucks North America LLC, ein Unternehmen der Daimler AG.', 'Copyright © Daimler Trucks North America. Declaración de Privacidad, Legales y Condiciones. Todos los derechos reservados. Western Star Trucks Sales, Inc. es una subsidiaria de Daimler Trucks North America LLC, una compañía Daimler.', '저작권 © 다임러 트럭 북미. 개인 정보 보호 정책, 법적 고지 사항 및 조건. 모든 권리가 보유됩니다. 서양 스타 트럭 판매 주식회사는 다임러 트럭 북미 LLC, 다임러 회사의 자회사입니다.'),
(10, 'login_submit', '> Login', 'Commencer', 'Starten', 'Iniciar', '출발'),
(11, 'login_error', 'You have entered an incorrect user name or password.  Please try again, or contact your administrator.', 'Vous avez entré un nom d''utilisateur incorrect ou mot de passe. S''il vous plaît essayer de nouveau, ou contactez votre administrateur.', 'Sie haben einen falschen Benutzernamen oder Passwort eingegeben. Bitte versuchen Sie es erneut, oder wenden Sie sich an Ihren Administrator.', 'Ha introducido un nombre de usuario o contraseña incorrecta. Por favor, vuelve a intentarlo, o póngase en contacto con el administrador.', '당신은 잘못된 사용자 이름이나 암호를 입력했습니다. 다시 시도하거나 관리자에게 문의하시기 바랍니다.'),
(12, 'home_legal', 'Copyright © Daimler Trucks North America.  Privacy Statement, Legal Notices, and Terms.  All rights reserved. Western Star Trucks Sales, Inc. is a subsidiary of Daimler Trucks North America LLC, a Daimler company.', 'Copyright © Daimler Trucks North America. Déclaration de confidentialité, Mentions légales, et Conditions. Tous droits réservés. Western Star Trucks Sales, Inc est une filiale de Daimler Trucks North America LLC, une société de Daimler.', 'Copyright © Daimler Trucks North America. Datenschutz, rechtliche Hinweise und Nutzungsbedingungen. Alle Rechte vorbehalten. Western Star Trucks Sales, Inc. ist eine Tochtergesellschaft von Daimler Trucks North America LLC, ein Unternehmen der Daimler AG.', 'Copyright © Daimler Trucks North America. Declaración de Privacidad, Legales y Condiciones. Todos los derechos reservados. Western Star Trucks Sales, Inc. es una subsidiaria de Daimler Trucks North America LLC, una compañía Daimler.', '저작권 © 다임러 트럭 북미. 개인 정보 보호 정책, 법적 고지 사항 및 조건. 모든 권리가 보유됩니다. 서양 스타 트럭 판매 주식회사는 다임러 트럭 북미 LLC, 다임러 회사의 자회사입니다.'),
(13, 'home_button_1', 'Why Western Star', 'Pourquoi Western Star', 'Warum Western Star', '¿Por qué Western Star?', '왜 서양 스타'),
(14, 'home_button_2', 'Asset Library', 'Bibliothèque de Composants', 'Asset Library', 'Biblioteca de Activos', '자산 라이브러리'),
(15, 'home_button_3', 'Interior Viewer', 'Intérieur Viewer', 'Interior-Viewer', 'Visor Interior', '인테리어 뷰어'),
(16, 'home_button_4', 'Calculators', 'Calculatrices', 'Taschenrechner', 'Calculadoras', '계산기'),
(17, 'header_title', 'Western Star Sales Accelerator', 'Western Star Sales Accelerator', 'Western Star Sales Accelerator', 'Western Star Sales Accelerator', 'Western Star Sales Accelerator'),
(18, 'languages_button', 'Change Languages', 'Changer les Langues', 'Ändern Sprachen', 'Cambiar de Idiomas', '언어를 변경"'),
(19, 'home_head', 'Western Star Trucks', 'Camions de Western Star', 'Lkw Western Star', 'Camiones de Western Star', 'Western Star의 트럭'),
(20, 'global_close', 'Close', 'Fermer', 'Schließen', 'Cerrar', '가까운'),
(21, 'home_body', 'Built on a heritage of hard work and durability, Western Star trucks are engineered to deliver incredible performance no matter how demanding the conditions.', 'Construit sur un patrimoine de dur labeur? Durabilité, et Western Star? Camions sont conçus pour offrir une performance incroyable peu importe la façon dont les conditions exigeantes.', 'Gebaut auf einem Erbe von harter Arbeit? Und Haltbarkeit, Western Star? LKWs sind so konstruiert, liefern unglaubliche Leistung, egal wie anspruchsvoll die Bedingungen.', 'Construido sobre una tradición de trabajo duro? Y durabilidad, Western Star? Camiones están diseñados para ofrecer un rendimiento increíble sin importar lo exigente de las condiciones.', '노력의 유산을 기반으로?과 내구성, 서양 스타? 트럭은 놀라운 성능에게 조건을 요구하는 방법에 상관없이 제공하지하도록 설계되어 있습니다.'),
(22, 'menu_english', 'English', 'English', 'English', 'English', 'English'),
(23, 'menu_french', 'Français', 'Français', 'Français', 'Français', 'Français'),
(24, 'menu_german', 'Deutsch', 'Deutsch', 'Deutsch', 'Deutsch', 'Deutsch'),
(25, 'menu_spanish', 'Español', 'Español', 'Español', 'Español', 'Español'),
(26, 'menu_korean', '한국어', '한국어', '한국어', '한국어', '한국어'),
(27, 'tabstrip_home', 'Home', 'Maison', 'Zuhause', 'Casa', '집'),
(28, 'tabstrip_ws', 'Why Western Star', 'Pourquoi Western Star', 'Warum Western Star', '¿Por qué Western Star?', '왜 서양 스타'),
(29, 'tabstrip_library', 'Library', 'Bibliothèque', 'Bibliothek', 'Biblioteca', '도서관'),
(30, 'tabstrip_interiors', 'Interiors', 'Intérieurs', 'Interiors', 'Interiores', '인테리어'),
(31, 'tabstrip_calculators', 'Calculators', 'Calculatrices', 'Taschenrechner', 'Calculadoras', '계산기'),
(32, 'library_title', 'Asset Library', 'Bibliothèque de Composants', 'Asset Library', 'Biblioteca de Activos', '자산 라이브러리'),
(33, 'calculators_title', 'Calculators', 'Calculatrices', 'Taschenrechner', 'Calculadoras', '계산기'),
(34, 'calculators_select', 'Select one:', 'Sélectionnez une:', 'Wählen Sie einen:', 'Seleccione uno:', '하나를 선택:'),
(35, 'calculators_payment', 'Payment Calculator', 'Calculatrice de paiements', 'Payment Calculator', 'Calculadora de pagos', '지불 계산기'),
(36, 'calculators_power', 'Purchasing Power Calculator', 'Calculatrice d''achat puissance', 'Kaufkraft Rechner', 'La Compra de la Calculadora', '계산기를 구입'),
(37, 'calculators_label_1', 'Truck Sales Price', 'Camion Prix de Ventes', 'Truck Sales Preis', 'Truck Sales Precio', '트럭 판매 가격'),
(38, 'calculators_label_2', 'Interest Rate', 'Taux d''intérêt', 'Zinssatz', 'Tasa de Interés', '이자율'),
(39, 'calculators_label_3', 'Sales Tax Rate', 'Taux d''imposition', 'Steuersatz', 'Ventas Tipo Impositivo', '판매 세율'),
(40, 'calculators_label_4', 'Down Payment /<br />Trade-in Value', 'Bas Valeur de Paiement', 'Anzahlung Wert', 'Abajo Valor de Pago', '지불 가치 아래로'),
(41, 'calculators_label_5', 'Financing Period (Months)', 'Période de financement (en mois)', 'Finanzierung Zeitraum (Monate)', 'Período de Financiamiento (Meses)', '금융 기간 (개월)'),
(42, 'calculators_desc_1', 'Full sales price, including title, license and other fees, but not sales tax. ', 'Prix ​​de vente complet, y compris le titre, de licence et d''autres frais, mais pas la taxe de vente.', 'Vollständiger Verkaufspreis, einschließlich Titel, Lizenzgebühren und andere Entgelte, aber nicht der Umsatzsteuer.', 'Completo del precio de venta, incluyendo el título, licencia y otros cargos, pero no impuesto sobre las ventas.', '제목, 라이센스 및 기타 수수료,하지만 매출 세금 포함 전체 판매 가격.'),
(43, 'calculators_desc_2', 'The anticipated annual percentage rate (APR) on your truck loan. ', 'Le taux attendu de pourcentage annuel (APR) sur votre prêt camion.', 'Der erwartete effektive Jahreszins (APR) auf Ihrem LKW Darlehen.', 'La tasa esperada de porcentaje anual (APR) en su préstamo camión.', '트럭 대출에 예상되는 연간 비율 속도 (4 월).'),
(44, 'calculators_desc_3', 'The total percentage rate of all state and local sales taxes that will apply to your purchase. ', 'Le taux total de toutes les taxes de vente provinciales et locales qui s''appliquent à votre achat.', 'Der Gesamtanteil von allen staatlichen und lokalen Umsatzsteuern, die um Ihren Kauf gelten.', 'El porcentaje total de todos los impuestos estatales y locales que se aplicarán a la compra.', '귀하의 구매에 적용 할 모든 주 및 지방 판매 세의 총 이자율.'),
(45, 'calculators_desc_4', 'Total of the cash you will put down and the expected trade-in allowance on your current vehicle, if applicable. ', 'Total de l''argent que vous allez mettre bas et l''attendu de reprise de votre véhicule actuel, le cas échéant. ', 'Summe der Zahlungsmittel Sie legte und die erwartete Trade-In-Zulage auf Ihrem aktuellen Fahrzeug, falls zutreffend.', 'Total del dinero que va a poner abajo y el esperado descuento por sustitución de su vehículo actual, si corresponde. ', '현금의 전체 당신은 내려하고 예상 무역에서 현재 차량 수당, 해당되는 경우. '),
(46, 'calculators_desc_5', 'The total length of your loan term in months. Example: 5 years is 60 months.', 'La longueur totale de la durée de votre prêt en mois. Exemple: 5 ans est de 60 mois.', 'Die Gesamtlänge Ihrer Darlehenslaufzeit in Monaten. Beispiel: 5 Jahre beträgt 60 Monate.', 'La longitud total del plazo de su préstamo en meses. Ejemplo: 5 años es de 60 meses.', '달에 대출 기간의 총 길이. 예 : 오년 60 개월입니다.'),
(47, 'calculators_label_6', 'Estimated Monthly Payment*:', 'Le Versement Mensuel *:', 'Geschätzte Monatliche Zahlung *:', 'El Pago Mensual Estimado *:', '예상 월별 지불 * :'),
(48, 'calculators_incomplete', 'Incomplete data.', 'Données incomplètes.', 'Unvollständige Daten.', 'Datos incompletos.', '불완전한 데이터.'),
(49, 'calculators_label_7', 'Desired Monthly Payment', 'Mensualité Souhaitée', 'Wunschpartner Monatszahlungen', 'Pago Mensual Deseado', '원하는 월별 지불'),
(50, 'calculators_label_8', 'Down Payment / Trade-in Value', 'Acompte / Valeur de reprise', 'Anzahlung / Inzahlungnahme Wert', 'Pago inicial / Valor de Intercambio', '결제 / 값 무역에서 다운'),
(51, 'calculators_label_9', 'Sales Tax<br />Rate', 'La Taxe<br />de Vente', 'Umsatzsteuer<br />', 'Ventas Tipo<br />Impositivo', '판매<br />세율'),
(52, 'calculators_label_10', 'Interest<br />Rate', 'Taux<br />d''intérêt', 'Zinssatz<br />', 'Tasa de<br />Interés', '이자율<br />'),
(53, 'calculators_label_11', 'Financing Period (Months)', 'Période de financement (en mois)', 'Finanzierung Zeitraum (Monate)', 'Período de Financiamiento (Meses)', '금융 기간 (개월)'),
(54, 'calculators_desc_6', 'The amount you would be willing and able to pay each month for your truck.', 'Le montant que vous serait disposé et en mesure de payer chaque mois pour votre camion.', 'Der Betrag, den Sie bereit wären, und in der Lage zu zahlen jeden Monat für Ihren LKW.', 'La cantidad que estaría dispuesto y capaz de pagar cada mes para su camión.', '양 당신은 기꺼이 당신의 트럭에 대해 매월 지불 할 수있을 것입니다.'),
(55, 'calculators_desc_7', 'Total of the cash you will put down and the expected trade-in allowance on your current vehicle, if applicable. ', 'Total de l''argent que vous allez mettre bas et l''attendu de reprise de votre véhicule actuel, le cas échéant.', 'Summe der Zahlungsmittel Sie legte und die erwartete Trade-In-Zulage auf Ihrem aktuellen Fahrzeug, falls zutreffend.', 'Total del dinero que va a poner abajo y el esperado descuento por sustitución de su vehículo actual, si corresponde.', '현금의 전체 당신은 내려하고 예상 무역에서 현재 차량 수당, 해당되는 경우.'),
(56, 'calculators_desc_8', 'The total percentage rate of all state and local sales taxes that will apply to your purchase.', 'Le taux total de toutes les taxes de vente provinciales et locales qui s''appliquent à votre achat.', 'Der Gesamtanteil von allen staatlichen und lokalen Umsatzsteuern, die um Ihren Kauf gelten.', 'El porcentaje total de todos los impuestos estatales y locales que se aplicarán a la compra.', '귀하의 구매에 적용 할 모든 주 및 지방 판매 세의 총 이자율.'),
(57, 'calculators_desc_9', 'The anticipated annual percentage rate (APR) on your truck loan.', 'Le taux attendu de pourcentage annuel (APR) sur votre prêt camion.', 'Der erwartete effektive Jahreszins (APR) auf Ihrem LKW Darlehen.', 'La tasa esperada de porcentaje anual (APR) en su préstamo camión.', '트럭 대출에 예상되는 연간 비율 속도 (4 월).'),
(58, 'calculators_desc_10', 'The total length of your loan term in months. Example: 5 years is 60 months.', 'La longueur totale de la durée de votre prêt en mois. Exemple: 5 ans est de 60 mois.', 'Die Gesamtlänge Ihrer Darlehenslaufzeit in Monaten. Beispiel: 5 Jahre beträgt 60 Monate.', 'La longitud total del plazo de su préstamo en meses. Ejemplo: 5 años es de 60 meses.', '달에 대출 기간의 총 길이. 예 : 5 년 60 개월입니다.'),
(59, 'calculators_label_12', 'Estimated Monthly Payment*:', 'Le Versement Mensuel *:', 'Geschätzte Monatliche Zahlung *:', 'El Pago Mensual Estimado *:', '예상 월별 지불 * :'),
(60, 'global_back', 'Back', 'Back', 'Back', 'Back', 'Back'),
(61, 'interiors_title', 'Interiors', 'Interiors', 'Interiors', 'Interiors', 'Interiors'),
(62, 'interiors_title_day_cab', 'Day Cab', 'Day Cab', 'Day Cab', 'Day Cab', 'Day Cab'),
(63, 'interiors_title_high_sleeper', 'High Sleeper', 'High Sleeper', 'High Sleeper', 'High Sleeper', 'High Sleeper'),
(64, 'interiors_title_low_sleeper', 'Low Sleeper', 'Low Sleeper', 'Low Sleeper', 'Low Sleeper', 'Low Sleeper'),
(65, 'interiors_cab_configurations', 'Cab Configurations', 'Cab Configurations', 'Cab Configurations', 'Cab Configurations', 'Cab Configurations'),
(66, 'interiors_choose_configurations', 'Choose one of these configurations.', 'Choose one of these configurations.', 'Choose one of these configurations.', 'Choose one of these configurations.', 'Choose one of these configurations.'),
(67, 'interiors_categories_day_cab', 'DAY CAB<span class=''carats''> >></span>', 'DAY CAB<span class=''carats''> >></span>', 'DAY CAB<span class=''carats''> >></span>', 'DAY CAB<span class=''carats''> >></span>', 'DAY CAB<span class=''carats''> >></span>'),
(68, 'interiors_categories_low_sleeper', 'LOW ROOF SLEEPER<span class=''carats''> >></span>', 'LOW ROOF SLEEPER<span class=''carats''> >></span>', 'LOW ROOF SLEEPER<span class=''carats''> >></span>', 'LOW ROOF SLEEPER<span class=''carats''> >></span>', 'LOW ROOF SLEEPER<span class=''carats''> >></span>'),
(69, 'interiors_categories_high_sleeper', 'HIGH ROOF SLEEPER<span class=''carats''> >></span>', 'HIGH ROOF SLEEPER<span class=''carats''> >></span>', 'HIGH ROOF SLEEPER<span class=''carats''> >></span>', 'HIGH ROOF SLEEPER<span class=''carats''> >></span>', 'HIGH ROOF SLEEPER<span class=''carats''> >></span>'),
(70, 'ws_title', 'Why Western Star', 'Why Western Star', 'Why Western Star', 'Why Western Star', 'Why Western Star'),
(71, 'library_menu_overview_1', 'Overview', 'Overview', 'Overview', 'Overview', 'Overview'),
(72, 'library_menu_vocational_2', 'Vocational', 'Vocational', 'Vocational', 'Vocational', 'Vocational'),
(73, 'library_menu_highway_3', 'Highway', 'Highway', 'Highway', 'Highway', 'Highway'),
(74, 'library_menu_models_4', 'Models', 'Models', 'Models', 'Models', 'Models'),
(75, 'library_menu_components_5', 'Components', 'Components', 'Components', 'Components', 'Components'),
(76, 'library_viewby', 'View By:', 'View By:', 'View By:', 'View By:', 'View By:'),
(77, 'library_menu_towing_6', 'Towing & Recovery', 'Towing & Recovery', 'Towing & Recovery', 'Towing & Recovery', 'Towing & Recovery'),
(78, 'library_menu_municipal_7', 'Municipal', 'Municipal', 'Municipal', 'Municipal', 'Municipal'),
(79, 'library_menu_mining_8', 'Mining', 'Mining', 'Mining', 'Mining', 'Mining'),
(80, 'library_menu_logging_9', 'Logging', 'Logging', 'Logging', 'Logging', 'Logging'),
(81, 'library_menu_oil_10', 'Oil & Gas', 'Oil & Gas', 'Oil & Gas', 'Oil & Gas', 'Oil & Gas'),
(82, 'library_menu_construction_11', 'Construction', 'Construction', 'Construction', 'Construction', 'Construction'),
(83, 'library_menu_sleepers_13', 'Sleepers', 'Sleepers', 'Sleepers', 'Sleepers', 'Sleepers'),
(84, 'library_menu_heavy_haul_12', 'Heavy Haul', 'Heavy Haul', 'Heavy Haul', 'Heavy Haul', 'Heavy Haul'),
(85, 'library_menu_long_haul_14', 'Long Haul', 'Long Haul', 'Long Haul', 'Long Haul', 'Long Haul'),
(86, 'library_menu_bulk_haul_15', 'Bulk Haul', 'Bulk Haul', 'Bulk Haul', 'Bulk Haul', 'Bulk Haul'),
(87, 'library_menu_auto_haul_16', 'Auto Haul', 'Auto Haul', 'Auto Haul', 'Auto Haul', 'Auto Haul'),
(88, 'library_menu_lw_options_17', 'Lightweight Options', 'Lightweight Options', 'Lightweight Options', 'Lightweight Options', 'Lightweight Options'),
(89, 'library_menu_4700_18', '4700', '4700', '4700', '4700', '4700'),
(90, 'library_menu_4800_21', '4800', '4800', '4800', '4800', '4800'),
(91, 'library_menu_4900_22', '4900', '4900', '4900', '4900', '4900'),
(92, 'library_menu_6900_23', '6900', '6900', '6900', '6900', '6900'),
(93, 'library_menu_twin_42', 'Twin Steer', 'Twin Steer', 'Twin Steer', 'Twin Steer', 'Twin Steer'),
(94, 'library_menu_engines_24', 'Engines', 'Engines', 'Engines', 'Engines', 'Engines'),
(95, 'library_menu_transmissions_25', 'Transmissions', 'Transmissions', 'Transmissions', 'Transmissions', 'Transmissions'),
(96, 'library_menu_axles_26', 'Axles', 'Axles', 'Axles', 'Axles', 'Axles'),
(97, 'library_menu_fe_options_19', 'Fuel Economy', 'Fuel Economy', 'Fuel Economy', 'Fuel Economy', 'Fuel Economy'),
(98, 'library_menu_suspensions_27', 'Suspensions', 'Suspensions', 'Suspensions', 'Suspensions', 'Suspensions'),
(99, 'library_menu_dd15_28', 'DD15', 'DD15', 'DD15', 'DD15', 'DD15'),
(100, 'library_menu_dd15t_29', 'DD15t', 'DD15t', 'DD15t', 'DD15t', 'DD15t'),
(101, 'library_menu_dd13_30', 'DD13', 'DD13', 'DD13', 'DD13', 'DD13'),
(102, 'library_menu_dd16_31', 'DD16', 'DD16', 'DD16', 'DD16', 'DD16'),
(103, 'library_menu_isx15_32', 'Cummins ISX15', 'Cummins ISX15', 'Cummins ISX15', 'Cummins ISX15', 'Cummins ISX15'),
(104, 'library_menu_isx12_33', 'Cummins ISX12', 'Cummins ISX12', 'Cummins ISX12', 'Cummins ISX12', 'Cummins ISX12'),
(105, 'library_menu_isl9_34', 'Cummins ISL9', 'Cummins ISL9', 'Cummins ISL9', 'Cummins ISL9', 'Cummins ISL9'),
(106, 'library_menu_isb67_35', 'Cummins ISB6.7', 'Cummins ISB6.7', 'Cummins ISB6.7', 'Cummins ISB6.7', 'Cummins ISB6.7'),
(107, 'library_menu_front_steer_axles_37', 'Front Steer Axles', 'Front Steer Axles', 'Front Steer Axles', 'Front Steer Axles', 'Front Steer Axles'),
(108, 'library_menu_single_rear_axles_38', 'Single Rear Axles', 'Single Rear Axles', 'Single Rear Axles', 'Single Rear Axles', 'Single Rear Axles'),
(109, 'library_menu_tandem_rear_axles_39', 'Tandem Rear Axles', 'Tandem Rear Axles', 'Tandem Rear Axles', 'Tandem Rear Axles', 'Tandem Rear Axles'),
(110, 'library_menu_tuftrac_40', 'TufTrac', 'TufTrac', 'TufTrac', 'TufTrac', 'TufTrac'),
(111, 'library_menu_airliner_41', 'AirLiner', 'AirLiner', 'AirLiner', 'AirLiner', 'AirLiner'),
(112, 'library_menu_dt12_36', 'DT12', 'DT12', 'DT12', 'DT12', 'DT12');

-- --------------------------------------------------------

--
-- Table structure for table `thumbnails`
--

DROP TABLE IF EXISTS `thumbnails`;
CREATE TABLE IF NOT EXISTS `thumbnails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `thumbnails`
--

INSERT INTO `thumbnails` (`id`, `src`) VALUES
(1, 'ws_assets/thumbnails/brochures/Cummins2013-ISL9&ISB6.7CoverageBrochure-thumb.jpg'),
(2, 'ws_assets/thumbnails/brochures/Cummins2013-ISL9Brochure-thumb.jpg'),
(3, 'ws_assets/thumbnails/brochures/Cummins2013-ISX15&ISX12CoverageBrochure-thumb.jpg'),
(4, 'ws_assets/thumbnails/brochures/Cummins2013-ISX15Brochure-thumb.jpg'),
(5, 'ws_assets/thumbnails/brochures/Cummins-DriverTipsBrochure-thumb.jpg'),
(6, 'ws_assets/thumbnails/brochures/1.13-DD13-Spec-Sheet-FNL2-DDC-6213-thumb.jpg'),
(7, 'ws_assets/thumbnails/photos/WS_Con_4700SB_Day_Crane_03r-THUMB.jpg'),
(8, 'ws_assets/thumbnails/photos/WS_Con_4700SB_Day_Dump_08r-THUMB.jpg'),
(9, 'ws_assets/thumbnails/photos/WS_Con_4700SB_Day_Rolloff_05r-THUMB.jpg'),
(10, 'ws_assets/thumbnails/photos/WS_Con_4700SF_Day_dump_05r-THUMB.jpg'),
(11, 'ws_assets/thumbnails/photos/WS_Con_4700SF_Day_Mixer_06r-THUMB.jpg'),
(12, 'ws_assets/thumbnails/photos/WS_Con_4800SB_Day_Mixer_02r-THUMB.jpg'),
(13, 'ws_assets/thumbnails/photos/WS_Con_4800SF_Day_Dump_02r-THUMB.jpg'),
(14, 'ws_assets/thumbnails/photos/WS_Con_4800SF_Day_Mixer_01r-THUMB.jpg'),
(15, 'ws_assets/thumbnails/photos/WS_Con_4900SF_Day_Mixer_02r-THUMB.jpg'),
(16, 'ws_assets/thumbnails/photos/WS_Hwy_4700SB_Day_Bulk_Haul_01r-THUMB.jpg'),
(17, 'ws_assets/thumbnails/photos/WS_Hwy_4700SB_Day_Bulk_Haul_03r-THUMB.jpg'),
(18, 'ws_assets/thumbnails/videos/Detroit_Transmission_Fr_1-THUMB.jpg'),
(19, 'ws_assets/thumbnails/videos/ISX-15_HIGH-3QTR-FUEL_lz-THUMB.jpg'),
(20, 'ws_assets/thumbnails/videos/Series-60_2007_from-bro_ko-THUMB.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `region` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `region`) VALUES
(1, 'ws', '582debf098e58f5ff94b47933c619cf61839ee37', 'US_Northwestern');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` text NOT NULL,
  `preference` text NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
