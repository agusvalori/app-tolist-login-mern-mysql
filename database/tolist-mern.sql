-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.8-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tolist-mern
CREATE DATABASE IF NOT EXISTS `tolist-mern` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tolist-mern`;

-- Volcando estructura para tabla tolist-mern.tareas
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `description` varchar(350) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `done` tinyint(4) DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tareas_users` (`userId`),
  CONSTRAINT `FK_tareas_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tolist-mern.tareas: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` (`id`, `title`, `description`, `createdAt`, `done`, `userId`) VALUES
	(21, 't2', 'd2', '2022-09-06 17:23:37', 0, NULL),
	(23, 't3', 'd3', '2022-09-08 00:51:34', 0, NULL),
	(24, 't3', 'd3', '2022-09-08 15:57:33', 0, NULL),
	(25, 't4incognito', 'd4incognito', '2022-09-08 15:58:21', 0, NULL),
	(26, 't4', 'd4', '2022-09-08 15:58:35', 0, NULL);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;

-- Volcando estructura para tabla tolist-mern.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `lastLogin` timestamp NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tolist-mern.users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `name`, `lastname`, `lastLogin`, `createdAt`, `email`) VALUES
	(1, 'safemango', 'clave', 'Agustin', 'Valori', '2022-09-08 00:31:26', '2022-09-08 00:31:27', NULL),
	(3, 'agusvalori', 'clave1', 'Agustin', 'Valori', '2022-09-08 18:40:36', '2022-09-08 18:40:36', 'agusvalori@gmail.com'),
	(5, 'dalinamaiz', 'clave1', 'Agustin', 'Valori', '2022-09-08 18:46:23', '2022-09-08 18:46:23', 'dalinamaiz@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
