/*
  Warnings:

  - You are about to drop the column `clickCount` on the `UserUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserUrl" DROP COLUMN "clickCount",
ADD COLUMN     "accessCount" INTEGER NOT NULL DEFAULT 0;
