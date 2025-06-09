/*
  Warnings:

  - A unique constraint covering the columns `[customerIdShopify]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerIdShopify` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `customerIdShopify` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_customerIdShopify_key` ON `Customer`(`customerIdShopify`);
