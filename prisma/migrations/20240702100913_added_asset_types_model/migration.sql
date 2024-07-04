/*
  Warnings:

  - You are about to drop the column `assetType` on the `Auctions` table. All the data in the column will be lost.
  - Added the required column `assetTypeId` to the `Auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "assetType",
ADD COLUMN     "assetTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AssetTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssetTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
