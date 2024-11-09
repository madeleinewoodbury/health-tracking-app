/*
  Warnings:

  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to alter the column `postalCode` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - Added the required column `countryId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Location_city_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "country",
ADD COLUMN     "countryId" TEXT NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "postalCode" SET DATA TYPE VARCHAR(20);

-- CreateTable
CREATE TABLE "Contry" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "alpha2" VARCHAR(2) NOT NULL,
    "alpha3" VARCHAR(3) NOT NULL,
    "numeric" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contry_name_key" ON "Contry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contry_alpha2_key" ON "Contry"("alpha2");

-- CreateIndex
CREATE UNIQUE INDEX "Contry_alpha3_key" ON "Contry"("alpha3");

-- CreateIndex
CREATE UNIQUE INDEX "Contry_numeric_key" ON "Contry"("numeric");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Contry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
