/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[city,state,countryId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[latitude,longitude]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "postalCode";

-- CreateIndex
CREATE UNIQUE INDEX "Location_city_state_countryId_key" ON "Location"("city", "state", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_latitude_longitude_key" ON "Location"("latitude", "longitude");
