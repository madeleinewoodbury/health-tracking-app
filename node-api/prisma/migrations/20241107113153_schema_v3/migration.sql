/*
  Warnings:

  - You are about to drop the `SymptomLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SymptomLog" DROP CONSTRAINT "SymptomLog_locationId_fkey";

-- DropForeignKey
ALTER TABLE "SymptomLog" DROP CONSTRAINT "SymptomLog_symptomId_fkey";

-- DropForeignKey
ALTER TABLE "SymptomLog" DROP CONSTRAINT "SymptomLog_userId_fkey";

-- DropTable
DROP TABLE "SymptomLog";

-- CreateTable
CREATE TABLE "UserSymptomLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSymptomLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSymptomEntry" (
    "logId" TEXT NOT NULL,
    "symptomId" TEXT NOT NULL,
    "severity" INTEGER,
    "symptomStart" TIMESTAMP(3),
    "symptomEnd" TIMESTAMP(3),
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSymptomEntry_logId_symptomId_key" ON "UserSymptomEntry"("logId", "symptomId");

-- AddForeignKey
ALTER TABLE "UserSymptomLog" ADD CONSTRAINT "UserSymptomLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSymptomLog" ADD CONSTRAINT "UserSymptomLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSymptomEntry" ADD CONSTRAINT "UserSymptomEntry_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSymptomEntry" ADD CONSTRAINT "UserSymptomEntry_logId_fkey" FOREIGN KEY ("logId") REFERENCES "UserSymptomLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
