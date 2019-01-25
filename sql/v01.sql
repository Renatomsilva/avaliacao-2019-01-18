-- MySQL dump 10.13  Distrib 8.0.14, for macos10.14 (x86_64)

USE avaliacao;

-- Host: 127.0.0.1    Database: avaliacao
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES UTF8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = UTF8 ;
CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `license` varchar(45) NOT NULL,
  `gender` enum('F','M') DEFAULT NULL,
  `license_type` enum('A','B','C','D','E','ACC') DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `driver_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`license`),
  UNIQUE KEY `license_UNIQUE` (`license`),
  KEY `key_driver_idx` (`driver_id`),
  CONSTRAINT `key_driver` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drivers_trucks`
--

DROP TABLE IF EXISTS `drivers_trucks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = UTF8 ;
CREATE TABLE `drivers_trucks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_truck_type` int(11) DEFAULT NULL,
  `own_truck` tinyint(4) DEFAULT NULL,
  `tag` varchar(45) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_driver` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`tag`),
  UNIQUE KEY `tag_UNIQUE` (`tag`),
  KEY `key_truck_type_idx` (`id_truck_type`),
  KEY `key_driver_idx` (`id_driver`),
  CONSTRAINT `id_driver` FOREIGN KEY (`id_driver`) REFERENCES `drivers` (`id`),
  CONSTRAINT `key_truck_type` FOREIGN KEY (`id_truck_type`) REFERENCES `truck_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = UTF8 ;
CREATE TABLE `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_drivers_trucks` int(11) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `origin` varchar(45) DEFAULT NULL,
  `destiny` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `key_drivers_trucks_idx` (`id_drivers_trucks`),
  CONSTRAINT `key_drivers_trucks` FOREIGN KEY (`id_drivers_trucks`) REFERENCES `drivers_trucks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `route_in_out`
--

DROP TABLE IF EXISTS `route_in_out`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = UTF8 ;
CREATE TABLE `route_in_out` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_load` tinyint(4) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` enum('IN','OUT') DEFAULT NULL,
  `id_route` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_unique` (`id_route`,`type`),
  CONSTRAINT `key_route` FOREIGN KEY (`id_route`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `truck_type`
--

DROP TABLE IF EXISTS `truck_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = UTF8 ;
CREATE TABLE `truck_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'avaliacao'
--

--
-- Dumping routines for database 'avaliacao'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-24  1:45:53
