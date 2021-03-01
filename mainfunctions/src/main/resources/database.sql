CREATE DATABASE `MyWalmartApi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;


CREATE TABLE IF NOT EXISTS `User` (
                                      `idUser` int(11) NOT NULL AUTO_INCREMENT,
                                      `role` int(11) DEFAULT NULL,
                                      `email` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      `name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      `lastname` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      PRIMARY KEY (`idUser`)
);

CREATE TABLE IF NOT EXISTS `GroceryOrder` (
                                              `idOrder` int(11) NOT NULL AUTO_INCREMENT,
                                              `idUser` int(11) DEFAULT NULL,
                                              `orderNotes` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                              `orderRate` int(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                              `orderFeedback` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                              PRIMARY KEY (`idOrder`),
                                              KEY `fk_Order_User_idx` (`idUser`),
                                              CONSTRAINT `fk_Order_User` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `Item` (
                                      `idItem` int(11) NOT NULL AUTO_INCREMENT,
                                      `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                                      PRIMARY KEY (`idItem`)
);


CREATE TABLE IF NOT EXISTS `GroceryOrder_Item` (
                                                   `idOrder` int(11) NOT NULL,
                                                   `idItem` int(11) NOT NULL,
                                                   `date` timestamp NULL DEFAULT NULL,
                                                   PRIMARY KEY (`idOrder`,`idItem`),
                                                   KEY `fk_orderitem_2_idx` (`idOrder`),
                                                   KEY `fk_orderitem_3_idx` (`idItem`),
                                                   CONSTRAINT `fk_OrderItem_User` FOREIGN KEY (`idItem`) REFERENCES `item` (`idItem`) ON DELETE CASCADE ON UPDATE CASCADE,
                                                   CONSTRAINT `fk_OrderItem_Order` FOREIGN KEY (`idOrder`) REFERENCES `GroceryOrder` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE
);