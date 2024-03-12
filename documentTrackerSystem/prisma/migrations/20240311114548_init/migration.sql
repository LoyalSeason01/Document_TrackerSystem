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
    "staffId" UUID,
    "roleId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "staffNumber" TEXT NOT NULL,
    "departmentId" UUID NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "permissionsId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "permission" TEXT NOT NULL,
    "roleId" UUID NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permissionsId")
);

-- CreateTable
CREATE TABLE "Division" (
    "divisionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "divisionName" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("divisionId")
);

-- CreateTable
CREATE TABLE "Department" (
    "departmentId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "departmentName" TEXT NOT NULL,
    "divisionId" UUID NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "Document" (
    "docID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ref" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "userId" UUID NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("docID")
);

-- CreateTable
CREATE TABLE "Trail" (
    "trailsId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "docID" UUID NOT NULL,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("trailsId")
);

-- CreateTable
CREATE TABLE "userDocument" (
    "userDocId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "docID" UUID NOT NULL,

    CONSTRAINT "userDocument_pkey" PRIMARY KEY ("userDocId")
);

-- CreateTable
CREATE TABLE "rolePermission" (
    "rolePermissionId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "rolePermission_pkey" PRIMARY KEY ("rolePermissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffNumber_key" ON "Staff"("staffNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Document_ref_key" ON "Document"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "userDocument_userId_key" ON "userDocument"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userDocument_docID_key" ON "userDocument"("docID");

-- CreateIndex
CREATE UNIQUE INDEX "rolePermission_roleId_key" ON "rolePermission"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "rolePermission_permissionId_key" ON "rolePermission"("permissionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("divisionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("divisionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_docID_fkey" FOREIGN KEY ("docID") REFERENCES "Document"("docID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDocument" ADD CONSTRAINT "userDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDocument" ADD CONSTRAINT "userDocument_docID_fkey" FOREIGN KEY ("docID") REFERENCES "Document"("docID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionsId") ON DELETE RESTRICT ON UPDATE CASCADE;
