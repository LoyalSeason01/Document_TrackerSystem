-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Forwarded', 'Archived');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Division" (
    "divisionId" SERIAL NOT NULL,
    "divisionName" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("divisionId")
);

-- CreateTable
CREATE TABLE "Department" (
    "deptId" SERIAL NOT NULL,
    "deptName" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("deptId")
);

-- CreateTable
CREATE TABLE "Document" (
    "docID" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("docID")
);

-- CreateTable
CREATE TABLE "Trail" (
    "trailside" SERIAL NOT NULL,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("trailside")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("divisionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("deptId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
