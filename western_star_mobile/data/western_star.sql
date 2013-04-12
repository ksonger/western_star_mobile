-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2013 at 02:55 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `western_star`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE IF NOT EXISTS `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  `storage` text NOT NULL,
  `local_src` text NOT NULL,
  `remote_src` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `thumbnail` text NOT NULL,
  `category` text NOT NULL,
  `subcategory` text NOT NULL,
  `metadata` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `type`, `storage`, `local_src`, `remote_src`, `title`, `description`, `thumbnail`, `category`, `subcategory`, `metadata`) VALUES
(1, 'video', 'local', '', 'http://localhost/ws_localhost/video/ws_parts_building_truck_animation.mp4', 'Western Star Parts Animation', 'A short video showing the parts of a Western Star truck assembling themselves.', 'http://localhost/ws_localhost/thumbnails/asset_0001.jpg', 'vocational', 'heavy_haul', 'animation,branding,vocational'),
(2, 'video', 'local', '', 'http://localhost/ws_localhost/video/wst_vocational_v5.mp4', 'Vocational Video Version 5', 'General vocational video content', 'http://localhost/ws_localhost/thumbnails/asset_0002.jpg', 'vocational', 'construction', 'general,vocational,construction'),
(3, 'video', 'local', '', 'http://localhost/ws_localhost/video/wst_zodiac_720p_final.mp4', 'Western Star Zodiac Overview Final', 'Overview video of the Western Star Zodiac model', 'http://localhost/ws_localhost/thumbnails/asset0003.jpg', 'vocational', 'truck_models', ''),
(4, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4418_WS_Highway.pdf', 'Western Star Highway Premium', 'Western Star Highway Premium', 'http://localhost/ws_localhost/thumbnails/asset0004.jpg', 'on_highway', 'truck_models', ''),
(5, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4951_WS_HeavyHaul_Final.pdf', 'Western Star Heavy Haul', 'Western Star Heavy Haul', 'http://localhost/ws_localhost/thumbnails/asset0005.jpg', 'on_highway', 'truck_models', ''),
(6, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4951_WS_loggingFINAL.pdf', 'Western Star Logging', 'Western Star Logging', 'http://localhost/ws_localhost/thumbnails/asset0006.jpg', 'on_highway', 'truck_models', ''),
(7, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4958-2_WS_4800-TechSheet_ENG.pdf', 'Western Star Model 4800', 'Western Star Model 4800', 'http://localhost/ws_localhost/thumbnails/asset0007.jpg', 'on_highway', 'truck_models', ''),
(8, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4958-2_WS_4900-TechSheet_ENG.pdf', 'Western Star Model 4900', 'Western Star Model 4900', 'http://localhost/ws_localhost/thumbnails/asset0008.jpg', 'on_highway', 'truck_models', ''),
(9, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4958-2_WS_6900-TechSheet_ENG.pdf', 'Western Star Model 6900', 'Western Star Model 6900', 'http://localhost/ws_localhost/thumbnails/asset0009.jpg', 'on_highway', 'truck_models', ''),
(10, 'pdf', 'local', '', 'http://localhost/ws_localhost/pdf/4958-2_WS_AWD-TechSheet_ENG.pdf', 'Western Star Model AWD', 'Western Star Model AWD', 'http://localhost/ws_localhost/thumbnails/asset0010.jpg', 'on_highway', 'truck_models', '');

-- --------------------------------------------------------

--
-- Table structure for table `strings`
--

CREATE TABLE IF NOT EXISTS `strings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `en` varchar(1000) NOT NULL,
  `fr` varchar(1000) NOT NULL,
  `dt` varchar(1000) NOT NULL,
  `es` varchar(1000) NOT NULL,
  `ko` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=33 ;

--
-- Dumping data for table `strings`
--

INSERT INTO `strings` (`id`, `name`, `en`, `fr`, `dt`, `es`, `ko`) VALUES
(1, 'login_welcome', 'Welcome to the DTNA International Sales Assistant', 'Bienvenue à l''assistant DTNA des ventes internationales', 'Willkommen auf der DTNA Internationale Sales Assistant', 'Bienvenido al Asistente de Ventas Internacionales DTNA', 'DTNA 국제 영업 길잡이에 오신 것을 환영합니다'),
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
(32, 'library_title', 'Asset Library', 'Bibliothèque de Composants', 'Asset Library', 'Biblioteca de Activos', '자산 라이브러리');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
