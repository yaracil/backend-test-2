
CREATE TABLE IF NOT EXISTS `groceryorder` (
    `idOrder` int(11) NOT NULL AUTO_INCREMENT,
    `idUser` int(11) DEFAULT NULL,
    `orderNotes` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `orderRate` int(11) DEFAULT NULL,
    `orderFeedback` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`idOrder`),
    KEY `fk_Order_User_idx` (`idUser`),
    CONSTRAINT `fk_Order_User` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
    );