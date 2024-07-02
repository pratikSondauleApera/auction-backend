/*
  Warnings:

  - A unique constraint covering the columns `[loanAccountNumber]` on the table `Auctions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Auctions_loanAccountNumber_key" ON "Auctions"("loanAccountNumber");
