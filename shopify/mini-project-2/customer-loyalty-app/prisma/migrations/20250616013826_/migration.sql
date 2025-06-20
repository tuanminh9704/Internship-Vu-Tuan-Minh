/*
  Warnings:

  - Added the required column `email` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;
