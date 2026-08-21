/*
  Warnings:

  - You are about to drop the column `localFileid` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `LocalFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_localFileid_fkey";

-- DropIndex
DROP INDEX "File_localFileid_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "localFileid";

-- AlterTable
ALTER TABLE "LocalFile" ADD COLUMN     "fileId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LocalFile_fileId_key" ON "LocalFile"("fileId");

-- AddForeignKey
ALTER TABLE "LocalFile" ADD CONSTRAINT "LocalFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
