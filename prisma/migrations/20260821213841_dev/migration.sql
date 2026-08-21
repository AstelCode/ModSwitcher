-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_localFileid_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_localFileid_fkey" FOREIGN KEY ("localFileid") REFERENCES "LocalFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
