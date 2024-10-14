/*
  Warnings:

  - You are about to drop the `AIEnvironment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnalyticsDashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HelpRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AIEnvironmentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AIEnvironment" DROP CONSTRAINT "AIEnvironment_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "AnalyticsDashboard" DROP CONSTRAINT "AnalyticsDashboard_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "HelpRequest" DROP CONSTRAINT "HelpRequest_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AIEnvironmentToStudent" DROP CONSTRAINT "_AIEnvironmentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AIEnvironmentToStudent" DROP CONSTRAINT "_AIEnvironmentToStudent_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "AIEnvironment";

-- DropTable
DROP TABLE "AnalyticsDashboard";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "HelpRequest";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Progress";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Submission";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "_AIEnvironmentToStudent";

-- DropEnum
DROP TYPE "HelpRequestStatus";
