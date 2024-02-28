/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_ref_key" ON "Document"("ref");
