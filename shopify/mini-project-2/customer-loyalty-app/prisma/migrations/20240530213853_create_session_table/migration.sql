CREATE TABLE `Session` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `shop` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `isOnline` TINYINT(1) NOT NULL DEFAULT 0,
    `scope` VARCHAR(255),
    `expires` DATETIME,
    `accessToken` TEXT NOT NULL,
    `userId` BIGINT,
    `firstName` VARCHAR(255),
    `lastName` VARCHAR(255),
    `email` VARCHAR(255),
    `accountOwner` TINYINT(1) NOT NULL DEFAULT 0,
    `locale` VARCHAR(255),
    `collaborator` TINYINT(1) DEFAULT 0,
    `emailVerified` TINYINT(1) DEFAULT 0
);