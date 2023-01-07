-- CreateTable
CREATE TABLE "UserUrl" (
    "id" SERIAL NOT NULL,
    "longUrl" TEXT NOT NULL,
    "short_url_code" TEXT NOT NULL,

    CONSTRAINT "UserUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_longUrl_key" ON "UserUrl"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_short_url_code_key" ON "UserUrl"("short_url_code");
