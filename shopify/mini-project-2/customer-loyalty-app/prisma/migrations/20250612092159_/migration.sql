-- CreateTable
CREATE TABLE `Reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `isApproved` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewThumbnail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewThumbnail` ADD CONSTRAINT `ReviewThumbnail_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Reviews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
