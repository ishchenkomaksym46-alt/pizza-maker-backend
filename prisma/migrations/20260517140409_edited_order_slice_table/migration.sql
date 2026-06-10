/*
  Warnings:

  - You are about to drop the column `priceAtPurchase` on the `order_slices` table. All the data in the column will be lost.
  - Added the required column `price_at_purchase` to the `order_slices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_slices" DROP COLUMN "priceAtPurchase",
ADD COLUMN     "price_at_purchase" DOUBLE PRECISION NOT NULL;
