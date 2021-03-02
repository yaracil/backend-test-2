
CREATE TABLE IF NOT EXISTS  `item` (
                        `idItem` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                        PRIMARY KEY (`idItem`)
) ;