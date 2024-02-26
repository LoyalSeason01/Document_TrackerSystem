-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Forwarded', 'Archived');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "divisionId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "staffNumber" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "departmentId" UUID NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" TEXT NOT NULL,
    "staffId" UUID NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Division" (
    "divisionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "divisionName" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("divisionId")
);

-- CreateTable
CREATE TABLE "Department" (
    "deptId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deptName" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("deptId")
);

-- CreateTable
CREATE TABLE "Document" (
    "docID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("docID")
);

-- CreateTable
CREATE TABLE "Trail" (
    "trailside" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("trailside")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffNumber_key" ON "Staff"("staffNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_staffId_key" ON "Role"("staffId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("divisionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
