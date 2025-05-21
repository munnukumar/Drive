/*
  Warnings:

  - Made the column `type` on table `DriveItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `DriveItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DriveItem" ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DriveItem" ADD CONSTRAINT "DriveItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DriveItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
