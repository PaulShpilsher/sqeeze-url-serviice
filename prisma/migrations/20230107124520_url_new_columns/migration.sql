/*
  Warnings:

  - You are about to drop the column `short_url_code` on the `UserUrl` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortUrlCode]` on the table `UserUrl` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortUrl` to the `UserUrl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortUrlCode` to the `UserUrl` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserUrl_short_url_code_key";

-- AlterTable
ALTER TABLE "UserUrl" DROP COLUMN "short_url_code",
ADD COLUMN     "shortUrl" TEXT NOT NULL,
ADD COLUMN     "shortUrlCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_shortUrlCode_key" ON "UserUrl"("shortUrlCode");
