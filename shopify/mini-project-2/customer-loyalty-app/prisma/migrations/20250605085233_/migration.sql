/*
  Warnings:

  - You are about to drop the column `shopifyId` on the `customer` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Customer_shopifyId_key` ON `customer`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `shopifyId`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
