/*
  Warnings:

  - You are about to drop the column `loadOrder` on the `PackMod` table. All the data in the column will be lost.
  - You are about to drop the column `loadOrder` on the `PackShader` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackMod" DROP COLUMN "loadOrder";

-- AlterTable
ALTER TABLE "PackShader" DROP COLUMN "loadOrder";
