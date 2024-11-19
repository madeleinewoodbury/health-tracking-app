/*
  Warnings:

  - You are about to drop the column `action` on the `ActivityLog` table. All the data in the column will be lost.
  - Added the required column `endpoint` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "action",
ADD COLUMN     "endpoint" VARCHAR(100) NOT NULL,
ADD COLUMN     "method" VARCHAR(10) NOT NULL;
