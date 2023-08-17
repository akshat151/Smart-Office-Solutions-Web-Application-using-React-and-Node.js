CREATE DATABASE  IF NOT EXISTS `officedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `officedb`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: officedb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `clientId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mobile` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`clientId`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `CK_EMAIL_CLIENT` CHECK ((`email` like _utf8mb4'%_@__%.__%')),
  CONSTRAINT `CK_MOBILE_CLIENT` CHECK ((length(`mobile`) = 10))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Instagram',9999999999,'Instagram@gmail.com','Boston'),(2,'Meta',5263743344,'Meta@yaahoo.com','52, Peter Road'),(3,'JP Morgan',8172455223,'jp@mprgan.com','Boston'),(4,'Honeywell',8172455522,'honey@well.com','NYC'),(5,'Amazon',1355227272,'amazon@amazon.com','Cali, USA'),(6,'Google',1133445566,'Google@Google.com','Silicon Valley, Mountain View, CA, USA'),(7,'Target',9876987655,'target@target.com','41, Peter Rd, Boston, MA, USA');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetingclientmembers`
--

DROP TABLE IF EXISTS `meetingclientmembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetingclientmembers` (
  `meetingId` int NOT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`meetingId`,`clientId`),
  KEY `FK_Meetings_Clients` (`clientId`),
  CONSTRAINT `FK_Meetings` FOREIGN KEY (`meetingId`) REFERENCES `meetings` (`meetingId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Meetings_Clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetingclientmembers`
--

LOCK TABLES `meetingclientmembers` WRITE;
/*!40000 ALTER TABLE `meetingclientmembers` DISABLE KEYS */;
INSERT INTO `meetingclientmembers` VALUES (2,4),(2,5),(2,6);
/*!40000 ALTER TABLE `meetingclientmembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `meetingId` int NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`meetingId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (2,'2023-04-22 00:00:00','How to start!!','Meeting to discuss how to start mobile dev'),(3,'2023-04-27 00:00:00','What exactly is a cloud?','Not sure? Join!');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetingstaffmembers`
--

DROP TABLE IF EXISTS `meetingstaffmembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetingstaffmembers` (
  `meetingId` int NOT NULL,
  `staffId` int NOT NULL,
  PRIMARY KEY (`meetingId`,`staffId`),
  KEY `FK_MEETINGS_Staff` (`staffId`),
  CONSTRAINT `FK_Meetings_` FOREIGN KEY (`meetingId`) REFERENCES `meetings` (`meetingId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_MEETINGS_Staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`staffId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetingstaffmembers`
--

LOCK TABLES `meetingstaffmembers` WRITE;
/*!40000 ALTER TABLE `meetingstaffmembers` DISABLE KEYS */;
INSERT INTO `meetingstaffmembers` VALUES (2,1),(3,1),(2,3),(3,5);
/*!40000 ALTER TABLE `meetingstaffmembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officehours`
--

DROP TABLE IF EXISTS `officehours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officehours` (
  `officeHoursId` int NOT NULL AUTO_INCREMENT,
  `taskId` int NOT NULL,
  `staffId` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hours` decimal(6,2) NOT NULL,
  PRIMARY KEY (`officeHoursId`),
  KEY `FK_Office_Hours_task` (`taskId`),
  KEY `FK_Office_Hours_staff` (`staffId`),
  CONSTRAINT `FK_Office_Hours_staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`staffId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Office_Hours_task` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`taskId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `officehours_chk_1` CHECK (((`hours` >= 0) and (`hours` <= 12)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officehours`
--

LOCK TABLES `officehours` WRITE;
/*!40000 ALTER TABLE `officehours` DISABLE KEYS */;
INSERT INTO `officehours` VALUES (1,1,1,'asdf',11.00),(2,3,1,'TBH didn\'t do anything',1.00);
/*!40000 ALTER TABLE `officehours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('ADMIN'),('STAFF_MEMBER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staffId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mobile` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `sex` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`staffId`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_Role` (`role`),
  CONSTRAINT `FK_Role` FOREIGN KEY (`role`) REFERENCES `roles` (`name`),
  CONSTRAINT `CK_EMAIL_STAFF` CHECK ((`email` like _utf8mb4'%_@__%.__%')),
  CONSTRAINT `CK_MOBILE_STAFF` CHECK ((length(`mobile`) = 10))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Aryan',8573088848,'aryan@gmail.com','$2a$10$LyNSb92O0iNzHaj0jGu.6OvIn2bhEUrSG7jGWRmcG5qBJXptVJIai','75 Peter Parley Road','1997-12-28','male','ADMIN'),(2,'Akshat',1234234545,'akshat@gmail.com','$2a$10$ghUCR0qRGpQozmYBj7ZOi..nx4TzQ.aBT/zLby5INz.tcJ3dcE1by','India','1996-07-16','male','STAFF_MEMBER'),(3,'Akshit',8302795522,'akshit@gmail.com','$2a$10$ERjMdpO1YNkhWrQ99II/JeNxnfa7TvYUEs1E2eQRU0zYzYX5QAfo.','Boston, USA','1998-06-03','male','STAFF_MEMBER'),(4,'Juli',8302795511,'juli@gmail.com','$2a$10$lHHF/klpbrbbUwV8hbiGZOhgpVnghyLqcGf4WktfrTyxHAerbGL0q','Boston, USA','1998-06-03','female','STAFF_MEMBER'),(5,'Elyssa',8305195511,'elyssa@gmail.com','$2a$10$GbKSsA1B5b45CYRmo.egYOhoVcSz.6ZM33Cu73Mq4JTNSe8xtxkzK','Ca, USA','1998-01-07','female','STAFF_MEMBER'),(6,'Andrew Pol',8305115151,'pol@gmail.com','$2a$10$PEmnURqDIBucr/dQB3sMDeXZgarlbc4sLpJgxOzPgfylVOr5jQzbO','NYC','1998-01-26','male','STAFF_MEMBER'),(7,'Kathleen Durant',8301415151,'professor@gmail.com','$2a$10$hmL5T7beXbGuNQWlahVjMOVEzFFZeZccu4LohUR4R6GE.bli0yUpm','Boston','1998-02-19','female','STAFF_MEMBER');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `taskTypeId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('NOT_STARTED','ON_GOING','COMPLETED','BLOCKED') NOT NULL DEFAULT 'NOT_STARTED',
  `startDate` date DEFAULT NULL,
  `priority` enum('P0','P1','P2') NOT NULL DEFAULT 'P0',
  `clientId` int NOT NULL,
  PRIMARY KEY (`taskId`),
  KEY `FK_TaskType` (`taskTypeId`),
  KEY `FK_Clients` (`clientId`),
  CONSTRAINT `FK_Clients` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`),
  CONSTRAINT `FK_TaskType` FOREIGN KEY (`taskTypeId`) REFERENCES `tasktypes` (`taskTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,'Data Collection','Collect a lot of data. As much as possible, and as soon as possible.','ON_GOING','2023-04-22','P2',1),(2,2,'Cloud Work','Work on cloud development','BLOCKED','2023-04-22','P1',3),(3,3,'Create App','Create world\'s best mobile app. Within 2 days.','BLOCKED','2023-04-22','P0',6),(4,2,'Develop it one more time ','This is the same as the last one!','COMPLETED','2023-04-24','P2',4);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasksassigned`
--

DROP TABLE IF EXISTS `tasksassigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasksassigned` (
  `taskId` int NOT NULL,
  `staffId` int NOT NULL,
  PRIMARY KEY (`staffId`,`taskId`),
  KEY `FK_Tasks` (`taskId`),
  CONSTRAINT `FK_Staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`staffId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Tasks` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`taskId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasksassigned`
--

LOCK TABLES `tasksassigned` WRITE;
/*!40000 ALTER TABLE `tasksassigned` DISABLE KEYS */;
INSERT INTO `tasksassigned` VALUES (1,2),(2,1),(2,2),(2,3),(2,5),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(4,7);
/*!40000 ALTER TABLE `tasksassigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasktypes`
--

DROP TABLE IF EXISTS `tasktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasktypes` (
  `taskTypeId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`taskTypeId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasktypes`
--

LOCK TABLES `tasktypes` WRITE;
/*!40000 ALTER TABLE `tasktypes` DISABLE KEYS */;
INSERT INTO `tasktypes` VALUES (1,'Collect Student Data','Collect student data from universities and perform operations on those data points.',1500.00),(2,'Develop Cloud Application','Develops cloud application that can be used by many users.',2000.00),(3,'Mobile App Development','Create Mobile app that provides real time location of the user. This can have multiple use cases.',3500.00),(4,'Web Development Project','Create world\'s best web application ASAP! Will give you a lot of money!',10.00);
/*!40000 ALTER TABLE `tasktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'officedb'
--

--
-- Dumping routines for database 'officedb'
--
/*!50003 DROP FUNCTION IF EXISTS `is_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_admin`(
	staffId INT
) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN

	RETURN 	("ADMIN" = (SELECT role 
	FROM staff
	WHERE staff.staffId = staffId));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `is_staff` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_staff`(
	staffId INT
) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN

	RETURN 	("STAFF_MEMBER" = (SELECT role 
	FROM staff
	WHERE staff.staffId = staffId));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_client`(
	staffId INT,
	name VARCHAR(255),
    mobile CHAR(10),
    email VARCHAR(255),
    address VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
		INSERT INTO Clients 
        (Clients.name, Clients.mobile, Clients.email, Clients.address) 
        VALUES 
        (name, mobile, email, address);
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_client_in_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_client_in_meeting`(
	meetingId INT,
	clientId INT
)
BEGIN

	-- adding staff in meeting.
    INSERT INTO
    meetingClientMembers
	(
		meetingClientMembers.meetingId, 
        meetingClientMembers.clientId
	)
	VALUES
	(
		meetingId,
        clientId
	);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_staff` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_staff`(
	staffId INT,
    name VARCHAR(255),
	mobile CHAR(10),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
	dob DATE,
    sex VARCHAR(255),
    role VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
		INSERT INTO Staff 
        (
			Staff.name, 
            Staff.mobile, 
            Staff.email, 
            Staff.password, 
            Staff.address,
            Staff.dob,
            Staff.sex,
            Staff.role
		) 
        VALUES 
        (
			name,
			mobile,
			email,
			password,
			address,
			dob,
			sex,
			role
        );
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_staff_in_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_staff_in_meeting`(
	meetingId INT,
	staffId INT
)
BEGIN

	-- adding staff in meeting.
    INSERT INTO
    meetingStaffMembers
	(
		meetingStaffMembers.meetingId, 
        meetingStaffMembers.staffId
	)
	VALUES
	(
		meetingId,
        staffId
	);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_staff_to_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_staff_to_task`(
	taskId INT,
    staffId INT
)
BEGIN
    
    INSERT INTO tasksAssigned
		( taskId, staffId )
    VALUES
		( taskId, staffId );
        
	SELECT taskId;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_meeting`(
	time DATETIME,
	title VARCHAR(255),
    description VARCHAR(255),
    hostId INT,
    staffId INT
)
BEGIN

	IF(hostId = staffId)
	THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Host and meeting member cannot be same.';
    ELSE
    
		START TRANSACTION;
    
			-- adding to meetings.
			INSERT INTO
			meetings
			(
				meetings.time, 
				meetings.title, 
				meetings.description
			)
			VALUES
			(
				time,
				title,
				description
			);
			
			CALL add_staff_in_meeting(LAST_INSERT_ID(), hostId);
			CALL add_staff_in_meeting(LAST_INSERT_ID(), staffId);
            
		COMMIT;

    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_task`(
	taskTypeId INT,
    title VARCHAR(255),
    description VARCHAR(255),
    status ENUM("NOT_STARTED", "ON_GOING", "COMPLETED", "BLOCKED"),
    startDate DATE,
    priority ENUM("P0", "P1", "P2"),
    clientId INT,
    staffId INT
)
BEGIN
	INSERT INTO Tasks
	(
		taskTypeId,
		title,
		description,
		status,
        startDate,
        priority,
		clientId
	)
	VALUES 
	(
		taskTypeId,
		title,
		description,
        status,
        startDate,
        priority,
		clientId
	);
    
    CALL add_staff_to_task( 
		LAST_INSERT_ID(),
        staffId
    );
    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_client`(
	staffId INT,
	clientId INT
)
BEGIN

	IF(is_admin(staffId))
    THEN 
    
		DELETE FROM Clients 
        WHERE Clients.clientId = clientId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_meeting`(
	staffId INT,
	meetingId INT
)
BEGIN

	-- check authenticity
	IF(
			(		SELECT COUNT(*)
					FROM meetingStaffMembers
					WHERE 
                    meetingStaffMembers.meetingId = meetingId AND
                    meetingStaffMembers.staffId = staffId
			) > 0
	)
	THEN
		DELETE FROM 
        meetings 
        WHERE meetings.meetingId = meetingId;
        
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
        
    END IF;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_office_hours` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_office_hours`(
    officeHoursId INT,
    staff INT
)
BEGIN

	DELETE FROM officeHours
    WHERE 
    officeHours.staffId = staffId AND officeHours.officeHoursId = officeHoursId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_staff` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_staff`(
	hostId INT,
	staffId INT
)
BEGIN

	IF(is_admin(hostId))
    THEN 
    
		DELETE FROM Staff 
        WHERE Staff.staffId = staffId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `enter_office_hours` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `enter_office_hours`(
	taskId INT,
    staffId INT,
	description VARCHAR(255),
    hours DECIMAL(6,2)
)
BEGIN

	-- check authenticity.
    IF(
			(SELECT COUNT(*)
			FROM tasksassigned
			WHERE tasksassigned.taskId = taskId AND tasksassigned.staffId = staffId) > 0
    )
    THEN
    
		INSERT INTO 
        officeHours
        (officeHours.taskId, officeHours.staffId, officeHours.description, officeHours.hours)
        VALUES
        (taskId, staffId, description, hours);
    
    ELSE
    
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_client_in_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_client_in_meeting`(
	meetingId INT
)
BEGIN

	SELECT 
		meetingClientMembers.clientId,
		clients.name,
		clients.mobile,
		clients.email
		
	FROM meetingClientMembers

	JOIN Clients
	ON Clients.clientId = meetingClientMembers.clientId
    
    WHERE meetingClientMembers.meetingId = meetingId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_meetings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_meetings`()
BEGIN

	SELECT *
    FROM meetings;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_office_hours` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_office_hours`(
    staffId INT
)
BEGIN

	SELECT 
		officeHours.officeHoursId,
		officeHours.taskId,
        officeHours.staffId,
        officeHours.description,
        officeHours.hours,
        tasks.taskTypeId,
        tasktypes.name,
        tasks.title,
        tasks.priority
        
    FROM officeHours
    
    LEFT JOIN
    tasks
    ON tasks.taskId = officeHours.taskId
    
	LEFT JOIN
    tasktypes
    ON tasktypes.tasktypeId = tasks.taskTypeId
    
    WHERE officeHours.staffId = staffId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_staff_in_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_in_meeting`(
	meetingId INT
)
BEGIN

	SELECT 
		meetingStaffMembers.staffId,
		staff.name,
		staff.mobile,
		staff.email
		
	FROM meetingStaffMembers

	JOIN Staff
	ON Staff.staffId = meetingStaffMembers.staffId

	WHERE meetingStaffMembers.meetingId = meetingId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_staff_of_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_staff_of_task`(taskId INT)
BEGIN
    
	SELECT 
			tasksAssigned.staffId,
			staff.name,
			staff.email
	FROM tasksAssigned

	JOIN staff
	ON staff.staffId = tasksAssigned.staffId
    
    WHERE tasksAssigned.taskId = taskId;

		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_tasks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_tasks`()
BEGIN
	SELECT 
    
		tasksAssigned.taskId,
		taskTypes.taskTypeId AS taskTypeId,
		taskTypes.name AS taskType,
        tasks.title,
		tasks.description,
		tasks.status,
		tasks.startDate,
		tasks.priority,
		clients.name AS client,
		clients.clientId AS clientId,
        COUNT(tasksAssigned.staffId) AS num_members
			
	FROM tasksAssigned

	LEFT JOIN
	tasks
	ON tasks.taskId = tasksAssigned.taskId

	LEFT JOIN
	staff
	ON staff.staffId = tasksAssigned.staffId

	LEFT JOIN
	clients
	ON clients.clientId = tasks.clientId
    
    LEFT JOIN
    taskTypes
    ON taskTypes.taskTypeId = tasks.taskTypeId
    	
    GROUP BY tasksAssigned.taskId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remove_client_from_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_client_from_meeting`(
	meetingId INT,
	clientId INT
)
BEGIN
	-- deleting staff from meeting.
	DELETE FROM meetingClientMembers 
	WHERE 
		meetingClientMembers.meetingId = meetingId AND
		meetingClientMembers.clientId = clientId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remove_staff_from_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_staff_from_meeting`(
	meetingId INT,
	staffId INT
)
BEGIN

	-- check count. Cannot delete if less than 2.
    IF(
			(SELECT COUNT(staffId)
			FROM meetingStaffMembers
			WHERE meetingStaffMembers.meetingId = meetingId
			GROUP BY meetingStaffMembers.meetingId) > 2
    )
    THEN
    	-- deleting staff from meeting.
		DELETE FROM meetingStaffMembers 
		WHERE 
			meetingStaffMembers.meetingId = meetingId AND
			meetingStaffMembers.staffId = staffId;
    ELSE
    
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ATLEAST 2 MEMBERS ARE REQUIRED IN A MEETING.';
    
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remove_staff_from_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_staff_from_task`(
	taskId INT,
    staffId INT
)
BEGIN

    DELETE FROM tasksAssigned 
    WHERE tasksAssigned.taskId = taskId AND tasksAssigned.staffId = staffId;
	    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_client`(
	staffId INT,
	clientId INT,
	name VARCHAR(255),
    mobile CHAR(10),
    email VARCHAR(255),
    address VARCHAR(255)
)
BEGIN

	IF(is_admin(staffId))
    THEN 
    
		UPDATE Clients 
        SET 
			Clients.name = name,
			Clients.mobile = mobile,
            Clients.email = email,
            Clients.address = address
        WHERE Clients.clientId = clientId;
        
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_meeting` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_meeting`(
	staffId INT,
	meetingId INT,
	description VARCHAR(255)
)
BEGIN

	-- check authenticity
	IF(
			(		SELECT COUNT(*)
					FROM meetingStaffMembers
					WHERE 
                    meetingStaffMembers.meetingId = meetingId AND
                    meetingStaffMembers.staffId = staffId
			) > 0
	)
	THEN
		UPDATE meetings
		SET meetings.description = description
		WHERE meetings.meetingId = meetingId;    
        
	ELSE
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
        
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_staff` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_staff`(
	hostId INT,
	staffId INT,
    name VARCHAR(255),
	mobile CHAR(10),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
	dob DATE,
    sex VARCHAR(255),
    role VARCHAR(255)
)
BEGIN

	IF(is_admin(hostId))
    THEN 
    
    
		UPDATE Staff 
        SET 
			Staff.name = name, 
            Staff.mobile = mobile, 
            Staff.email = email, 
            Staff.password = password, 
            Staff.address = address,
            Staff.dob = dob,
            Staff.sex = sex,
            Staff.role = role
        WHERE Staff.staffId = staffId;
    
    ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'NOT ALLOWED.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-22  4:11:28
