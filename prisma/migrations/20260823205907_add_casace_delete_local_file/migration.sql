-- DropForeignKey
ALTER TABLE "LocalFile" DROP CONSTRAINT "LocalFile_fileId_fkey";

-- AddForeignKey
ALTER TABLE "LocalFile" ADD CONSTRAINT "LocalFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
