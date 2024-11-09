/*
  Warnings:

  - You are about to drop the column `alpha3` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `numeric` on the `Country` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Country_alpha3_key";

-- DropIndex
DROP INDEX "Country_numeric_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "alpha3",
DROP COLUMN "numeric";

-- CreateIndex
CREATE INDEX "Country_alpha2_idx" ON "Country"("alpha2");
