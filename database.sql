
CREATE SCHEMA `database` ;
use `database`;
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


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `idUnit` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  `quantity` int(11) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `warningThreshold` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_material_unit` FOREIGN KEY (`id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Lá khúc',6,0,0,'Để làm bánh khúc',5000),(2,'ýtest dek',3,1,0,'',0),(3,'Gạo nếp',6,0,0,'',10000),(4,'Khoai tây',6,0,0,'',10000),(5,'Trứng',7,0,0,'',100),(6,'Bột mì',6,0,0,'Làm bánh',10000);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `idUnit` int(11) DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  `viewNumber` int(11) DEFAULT '0',
  `createdDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_unit_idx` (`idUnit`),
  CONSTRAINT `FK_product_unit` FOREIGN KEY (`idUnit`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product`(id, `name`, `description`, idUnit, unitPrice, isDeleted) VALUES (5,'Bánh khúc','Ai bánh khúc nóng đêy',4,15000.00,0),(9,'Bánh sinh nhật','HAPPY BIRTHDAY!!!',4,400000.00,0),(10,'Vẫn là bánh sinh nhật nhưng dùng để test edit','Zxc',4,500000.00,0),(12,'Bánh từ ngoài hành tinh','AND ITS NAME IS JOHHHNN CEEENAAAAAA',3,15.00,0),(13,'Kẹo đi','ádasd',2,15.00,0),(14,'a','a',2,5.00,1),(15,'hmm','asd',3,5.00,0),(16,'wasd','asd',3,51.00,0),(17,'oh no','123',3,15.00,1),(18,'Chè thái','Không phải của Thái Lan',3,15000.00,0),(20,'Bánh chả','Bánh chả???!!!',3,15000.00,0),(21,'Chè bưởi','Món ăn thanh mát ngày hè',2,50000.00,0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ingredient`
--

DROP TABLE IF EXISTS `product_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ingredient` (
  `idProduct` int(11) NOT NULL,
  `idIngredient` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`idProduct`,`idIngredient`),
  KEY `FK_pm_material_idx` (`idIngredient`),
  CONSTRAINT `FK_pm_material` FOREIGN KEY (`idIngredient`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `FK_pm_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ingredient`
--

LOCK TABLES `product_ingredient` WRITE;
/*!40000 ALTER TABLE `product_ingredient` DISABLE KEYS */;
INSERT INTO `product_ingredient` VALUES (5,1,100,0),(5,3,200,0),(5,4,100,0),(9,5,5,0),(9,6,800,0),(10,6,500,0),(13,6,1155,0),(14,6,1,0),(15,4,16,0),(15,6,15,0),(16,3,1,0),(17,3,1,0),(17,5,12,0),(18,1,15,0),(18,4,12,0),(20,3,15,0),(20,5,15,0),(21,3,15,0);
/*!40000 ALTER TABLE `product_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `idProduct` int(11) NOT NULL,
  `idType` int(11) NOT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`idProduct`,`idType`),
  KEY `FK_pt_type_idx` (`idType`),
  CONSTRAINT `FK_pt_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_pt_type` FOREIGN KEY (`idType`) REFERENCES `type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (5,2,0),(5,5,0),(9,1,0),(9,3,0),(10,1,0),(10,3,0),(12,1,0),(13,2,0),(14,3,0),(15,1,0),(15,3,0),(16,2,0),(17,2,0),(17,3,0),(17,5,0),(18,2,0),(20,2,0),(20,5,0),(21,4,0),(21,5,0);
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Bánh ngọt','Nhiều đường, dễ tăng cân',0),(2,'Bánh mặn','Phù hợp cho ăn các bữa chính',0),(3,'Bánh sinh nhật','HAPPY BIRTHDAY!!!',0),(4,'Chè','Món ăn vặt mùa hè',0),(5,'Ăn vặt','Ăn cho vui, khá là ngon',0);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'Chiếc','1 chiếc (nhỏ), giống cái',1),(2,'Hộp','5 cái',0),(3,'Túi','Chắc là theo gram',0),(4,'Cái','Đơn vị tính riêng lẻ',0),(5,'Gram','Đơn vị tính khối lượng 1 g = 0.001kg',1),(6,'Gram','Đơn vị tính khối lượng 1 g = 0.001kg',0),(7,'Quả','',0);
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

select * from `unit`;
select * from `ingredient`;
select * from `product`;
select * from `product_type`;
select * from `type`;