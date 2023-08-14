CREATE DATABASE  IF NOT EXISTS `minpro4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `minpro4`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: minpro4
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `loggings`
--

DROP TABLE IF EXISTS `loggings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loggings` (
  `logging_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `clockIn` datetime DEFAULT NULL,
  `clockOut` datetime DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`logging_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `loggings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loggings`
--

LOCK TABLES `loggings` WRITE;
/*!40000 ALTER TABLE `loggings` DISABLE KEYS */;
INSERT INTO `loggings` VALUES ('16012944-9e3e-40bb-9276-455582bdf56b','2023-08-13 04:14:22','2023-08-13 04:15:58','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:14:22','2023-08-13 04:15:58'),('23a29dfb-8031-4e3e-98c6-3f74f1b9a24d','2023-08-12 09:35:58','2023-08-12 09:36:01','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:35:58','2023-08-12 09:36:01'),('24f030b4-5966-4aad-adca-0d3f8b058033','2023-08-13 04:45:53','2023-08-13 10:00:13','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:45:53','2023-08-13 10:00:13'),('2e34701e-4ca5-4019-b886-71d29fc24435','2023-08-12 09:31:06','2023-08-12 09:31:15','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:31:06','2023-08-12 09:31:15'),('30b18a75-90aa-458f-9156-933f8695a905','2023-08-12 09:37:29','2023-08-12 09:37:32','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:37:29','2023-08-12 09:37:32'),('3677388a-685a-4800-a4d1-78b6c149bbe8','2023-08-12 11:26:45','2023-08-12 11:27:20','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-12 11:26:45','2023-08-12 11:27:20'),('3cbe0da2-9fe5-49b4-b705-ad2428a94bd7','2023-08-13 04:25:52','2023-08-13 04:26:27','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:25:52','2023-08-13 04:26:27'),('4593214d-1cc6-4fb3-9ff9-d16e933f2411','2023-08-12 09:33:31','2023-08-12 09:33:34','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:33:31','2023-08-12 09:33:34'),('468e75f4-b4f2-41d9-a143-224cabe4b269','2023-08-12 11:51:50','2023-08-12 11:51:58','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-12 11:51:50','2023-08-12 11:51:58'),('48678f72-6d99-4cb1-94fe-e82cb38885c5','2023-08-12 09:36:10','2023-08-12 09:36:17','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:36:10','2023-08-12 09:36:17'),('4956f37b-ffaa-4447-944b-1a916025b6c7','2023-08-13 04:21:09','2023-08-13 04:23:29','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-13 04:21:09','2023-08-13 04:23:29'),('4cc84c7c-bc5d-4612-9c64-a87e4cc32551','2023-08-13 16:49:31','2023-08-13 16:49:39','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 16:49:31','2023-08-13 16:49:39'),('4ed861c1-3ed9-4f3b-a9d5-35a02a33947c','2023-08-12 09:31:33','2023-08-12 09:31:36','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:31:33','2023-08-12 09:31:36'),('59e09797-0d5e-42d5-aed6-8ba4a54be0f2','2023-08-13 04:44:14','2023-08-13 04:44:33','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:44:14','2023-08-13 04:44:33'),('5c0412a6-35e6-4453-8d65-39657af4efc3','2023-08-13 04:38:24','2023-08-13 04:38:30','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:38:24','2023-08-13 04:38:30'),('5d4f36c1-3392-4732-8053-4a5b0a19fe11','2023-08-12 09:28:00','2023-08-12 09:28:04','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:28:00','2023-08-12 09:28:04'),('65bb305b-d341-4633-bfb4-0cd474ced165','2023-08-12 09:28:50','2023-08-12 09:28:56','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:28:50','2023-08-12 09:28:56'),('6edd0da8-8ea7-4633-a30c-33f5da3e710e','2023-08-12 09:15:36','2023-08-12 09:27:57','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:15:36','2023-08-12 09:27:57'),('70441115-6670-4f5c-840e-d02a6304b568','2023-08-12 11:54:42','2023-08-12 11:56:07','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-12 11:54:42','2023-08-12 11:56:07'),('7647b46b-8804-4997-9e90-eaa387caf744','2023-08-12 09:37:38','2023-08-12 09:37:42','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:37:38','2023-08-12 09:37:42'),('787f7397-0d18-4ea2-8a8a-d3d03172b8a6','2023-08-13 04:24:21','2023-08-13 04:24:36','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:24:21','2023-08-13 04:24:36'),('8f7009c4-ce60-4542-8fd8-988f0fdbbc51','2023-08-12 10:55:55','2023-08-12 10:55:59','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 10:55:55','2023-08-12 10:55:59'),('912217fe-ccb0-454c-8c47-aa413602f627','2023-08-13 10:54:59','2023-08-13 14:21:19','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 10:54:59','2023-08-13 14:21:19'),('91d764b0-9a84-4b01-bc20-3d885a466a63','2023-08-13 04:23:39','2023-08-13 04:23:51','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-13 04:23:39','2023-08-13 04:23:51'),('9a7c52f9-2e69-4fdc-86b1-fbb8873ccb2a','2023-08-13 04:07:08','2023-08-13 04:10:12','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:07:09','2023-08-13 04:10:12'),('a535f6f7-3619-42f3-addb-9176820e561e','2023-08-13 14:24:11','2023-08-13 16:16:13','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 14:24:11','2023-08-13 16:16:13'),('a8ca3011-5222-4748-a038-0c62b04355be','2023-08-12 09:33:04','2023-08-12 09:33:15','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:33:04','2023-08-12 09:33:15'),('b0d8cf03-37b8-4e70-bc10-331c07c3a39f','2023-08-12 09:40:55','2023-08-12 10:49:10','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:40:55','2023-08-12 10:49:10'),('b920bd7a-bab3-406b-b30b-3307515f3ba2','2023-08-12 09:35:06','2023-08-12 09:35:09','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:35:06','2023-08-12 09:35:09'),('bc1fd145-dd9b-44b8-8e7e-e729dd6d39a8','2023-08-13 04:10:18','2023-08-13 04:10:24','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-13 04:10:18','2023-08-13 04:10:24'),('c9c806da-6d0f-4935-b449-a6614a285c54','2023-08-12 09:39:07','2023-08-12 09:39:11','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 09:39:07','2023-08-12 09:39:11'),('d22b18f5-93e5-4f5d-844e-b158f68efc41','2023-08-12 12:00:18','2023-08-12 12:00:30','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-12 12:00:18','2023-08-12 12:00:30'),('d703dc9f-adc8-448a-8136-4833a2fd89f8','2023-08-12 13:15:47','2023-08-12 13:18:13','c9a45f9b-d946-4d8f-a87e-d6a42956d064','2023-08-12 13:15:47','2023-08-12 13:18:13'),('ed4fa58b-46ce-49db-950d-6321407bec03','2023-08-12 11:52:11','2023-08-12 11:52:13','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','2023-08-12 11:52:11','2023-08-12 11:52:13');
/*!40000 ALTER TABLE `loggings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('56171e29-e5cc-4cd9-ae31-d6e7a1bbdce0','admin','2023-08-11 17:10:13','2023-08-11 17:10:13'),('d3972ab2-99d4-4314-b042-bc8410947e82','employee','2023-08-11 17:10:13','2023-08-11 17:10:13');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salaries` (
  `salary_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `perhour_salary` float DEFAULT NULL,
  `monthly_salary` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `total_salary` float DEFAULT NULL,
  PRIMARY KEY (`salary_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salaries`
--

LOCK TABLES `salaries` WRITE;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
INSERT INTO `salaries` VALUES ('ac1560c8-ed93-4354-88d4-48349ceddfd1','fbd9c1dc-2da3-4c2c-ac49-b7de66b93bf2',10000,7000000,'2023-08-12 06:59:34','2023-08-13 16:27:20',NULL),('bb291da2-19b3-4e93-a764-099fb4cdd6e0','0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c',10000,6000000,'2023-08-12 06:56:17','2023-08-14 02:29:01',2758.29),('d641eeaa-4d04-44de-ae21-1cf1ce69f299','c9a45f9b-d946-4d8f-a87e-d6a42956d064',15000,4200000,'2023-08-12 06:57:02','2023-08-13 16:49:39',587019);
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230811133345-create-user-table.js'),('20230811133356-create-salary-table.js'),('20230811133408-create-logging-table.js'),('20230811133417-create-role-table.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0d1c98ee-92ea-4af6-8720-211e4392c529','d3972ab2-99d4-4314-b042-bc8410947e82','prato','pratojoko@gmail.com','$2b$10$THeDEFynf.nXVLYr7UnlTOpmtgxaWvEpkV1mjC2l9jysveFGVG0Gu','Prato Joko','2023-08-07','2023-08-14','2023-08-14 02:33:31','2023-08-14 02:33:31'),('0e1c3fe3-e9dc-4561-ab4d-0f23cdf95a6c','d3972ab2-99d4-4314-b042-bc8410947e82','gifari','gifari@gmail.com','$2b$10$kKCsuqZPvCIVDoCsnj2mQes3ac/gAcSAmpT0rcDxIrF8X4m6/asFq','Gifari Arsal','1990-01-01','2023-08-11','2023-08-11 17:13:38','2023-08-11 17:13:38'),('c9a45f9b-d946-4d8f-a87e-d6a42956d064','d3972ab2-99d4-4314-b042-bc8410947e82','fahrur','fahrur@gmail.com','$2b$10$MOn/7Mt3jf6fx4RBN8MbQeY9Fjwq6/Y3L/kPvX0XJBmdQWf/17Gra','Fahrur Rizky','1990-01-01','2023-08-12','2023-08-11 18:20:23','2023-08-11 18:20:23'),('fbd9c1dc-2da3-4c2c-ac49-b7de66b93bf2','56171e29-e5cc-4cd9-ae31-d6e7a1bbdce0','admin','admin@gmail.com','$2b$10$9.RBVBY.lRflTS45KvutpevkXvEpSk.RiKV/aD23h7A1kHljzVeXa','Administrator','1990-01-01','2023-08-11','2023-08-11 17:10:14','2023-08-11 17:10:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 16:23:28
