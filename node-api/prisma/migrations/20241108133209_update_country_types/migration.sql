/*
  Warnings:

  - You are about to alter the column `numeric` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "numeric" SET DATA TYPE VARCHAR(3);
