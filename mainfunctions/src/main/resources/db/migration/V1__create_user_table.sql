
CREATE TABLE IF NOT EXISTS `user` (
    `idUser` int(11) NOT NULL AUTO_INCREMENT,
    `role` int(11) DEFAULT NULL,
    `email` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`idUser`)
    );