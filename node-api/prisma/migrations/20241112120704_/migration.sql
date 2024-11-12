/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `ProviderProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_providerId_key" ON "ProviderProfile"("providerId");
