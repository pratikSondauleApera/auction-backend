-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'DE';

-- CreateTable
CREATE TABLE "Auctions" (
    "id" TEXT NOT NULL,
    "loanAccountNumber" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "reservePrice" TEXT NOT NULL,
    "emd" TEXT NOT NULL,
    "applicationDeadLine" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "institutionBank" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
