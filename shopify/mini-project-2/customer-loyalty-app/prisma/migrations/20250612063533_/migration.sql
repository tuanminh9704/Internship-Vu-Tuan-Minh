-- AlterTable
ALTER TABLE `redeemcode` ADD COLUMN `expiresAt` DATETIME(3) NULL,
    ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false;
