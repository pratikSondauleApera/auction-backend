/*
  Warnings:

  - You are about to drop the column `countryId` on the `Users` table. All the data in the column will be lost.
  - Added the required column `pincode` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_countryId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "countryId",
ADD COLUMN     "pincode" TEXT NOT NULL;
