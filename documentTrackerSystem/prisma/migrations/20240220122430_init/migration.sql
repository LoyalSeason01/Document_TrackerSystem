/*
  Warnings:

  - A unique constraint covering the columns `[staffNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffNumber_key" ON "Staff"("staffNumber");
