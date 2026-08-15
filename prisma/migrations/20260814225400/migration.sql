/*
  Warnings:

  - You are about to drop the column `shaderFileid` on the `PackShader` table. All the data in the column will be lost.
  - Added the required column `shaderFileId` to the `PackShader` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PackShader" DROP CONSTRAINT "PackShader_shaderFileid_fkey";

-- AlterTable
ALTER TABLE "PackShader" DROP COLUMN "shaderFileid",
ADD COLUMN     "shaderFileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PackShader" ADD CONSTRAINT "PackShader_shaderFileId_fkey" FOREIGN KEY ("shaderFileId") REFERENCES "ShaderFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
