
CREATE TABLE IF NOT EXISTS `order_item` (
    `idOrder` int(11) NOT NULL,
    `idItem` int(11) NOT NULL,
    PRIMARY KEY (`idOrder`,`idItem`),
    KEY `fk_orderitem_2_idx` (`idOrder`),
    KEY `fk_orderitem_3_idx` (`idItem`),
    CONSTRAINT `fk_OrderItem_User` FOREIGN KEY (`idItem`) REFERENCES `item` (`idItem`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_OrderItem_Order` FOREIGN KEY (`idOrder`) REFERENCES `groceryorder` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE
    );