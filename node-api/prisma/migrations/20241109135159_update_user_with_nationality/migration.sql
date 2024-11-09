/*
  Warnings:

  - Added the required column `nationality` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nationality" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nationality_fkey" FOREIGN KEY ("nationality") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
