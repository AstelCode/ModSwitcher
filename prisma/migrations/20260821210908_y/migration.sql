/*
  Warnings:

  - You are about to drop the column `shadeId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_shadeId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "shadeId",
ADD COLUMN     "shaderId" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_shaderId_fkey" FOREIGN KEY ("shaderId") REFERENCES "Shader"("id") ON DELETE SET NULL ON UPDATE CASCADE;
