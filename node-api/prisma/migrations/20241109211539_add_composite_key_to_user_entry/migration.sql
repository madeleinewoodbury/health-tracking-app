-- DropIndex
DROP INDEX "UserSymptomEntry_logId_symptomId_key";

-- AlterTable
ALTER TABLE "UserSymptomEntry" ADD CONSTRAINT "UserSymptomEntry_pkey" PRIMARY KEY ("logId", "symptomId");
