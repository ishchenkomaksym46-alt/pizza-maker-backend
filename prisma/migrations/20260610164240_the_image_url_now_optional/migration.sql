/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `slices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "slices" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT;
