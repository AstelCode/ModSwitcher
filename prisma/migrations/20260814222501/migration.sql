/*
  Warnings:

  - Added the required column `loadOrder` to the `PackShader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackShader" ADD COLUMN     "loadOrder" INTEGER NOT NULL;
