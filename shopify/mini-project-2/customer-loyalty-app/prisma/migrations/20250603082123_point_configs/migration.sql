-- CreateTable
CREATE TABLE `PointConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `earnRate` INTEGER NOT NULL,
    `redeemRatePoint` INTEGER NOT NULL,
    `redeemRateAmount` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
