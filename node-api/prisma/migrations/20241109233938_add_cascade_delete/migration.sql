-- DropForeignKey
ALTER TABLE "UserSymptomEntry" DROP CONSTRAINT "UserSymptomEntry_logId_fkey";

-- AlterTable
ALTER TABLE "UserSymptomLog" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UserSymptomEntry" ADD CONSTRAINT "UserSymptomEntry_logId_fkey" FOREIGN KEY ("logId") REFERENCES "UserSymptomLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
