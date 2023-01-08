/*
  Warnings:

  - Added the required column `accessedBy` to the `UrlAccessHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UrlAccessHistory" ADD COLUMN     "accessedBy" TEXT NOT NULL;
