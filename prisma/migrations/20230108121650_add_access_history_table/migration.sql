/*
  Warnings:

  - You are about to drop the column `accessCount` on the `UserUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserUrl" DROP COLUMN "accessCount",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UrlAccessHistory" (
    "id" SERIAL NOT NULL,
    "userUrlId" INTEGER NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UrlAccessHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UrlAccessHistory" ADD CONSTRAINT "UrlAccessHistory_userUrlId_fkey" FOREIGN KEY ("userUrlId") REFERENCES "UserUrl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
