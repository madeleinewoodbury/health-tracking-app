/*
  Warnings:

  - You are about to drop the column `addressLine1` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `ProviderProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ProviderProfile` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `country` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `firstName` to the `ProviderProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `ProviderProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProviderProfile" DROP COLUMN "bio",
DROP COLUMN "phone",
ADD COLUMN     "firstName" VARCHAR(50) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dob",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
