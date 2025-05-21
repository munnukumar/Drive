-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('FILE', 'FOLDER');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('READ', 'WRITE');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriveItem" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "mediaId" TEXT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "permission" "Permission" NOT NULL,
    "shareLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriveItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriveItem_mediaId_key" ON "DriveItem"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "DriveItem_shareLink_key" ON "DriveItem"("shareLink");

-- AddForeignKey
ALTER TABLE "DriveItem" ADD CONSTRAINT "DriveItem_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
