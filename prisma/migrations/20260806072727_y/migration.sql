-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'banned');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user', 'superuser');

-- CreateEnum
CREATE TYPE "ModStatus" AS ENUM ('published', 'draft', 'rejected');

-- CreateEnum
CREATE TYPE "ModDependencyRol" AS ENUM ('required', 'optional', 'incompatible');

-- CreateEnum
CREATE TYPE "PackStatus" AS ENUM ('published', 'draft', 'rejected');

-- CreateTable
CREATE TABLE "LocalFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "sha256" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "externalUrl" TEXT,
    "localFileid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modId" TEXT,
    "shadeId" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "activationCode" TEXT,
    "recoveryTokenHash" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'inactive',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinecraftVersion" (
    "id" TEXT NOT NULL,
    "major" INTEGER NOT NULL,
    "minor" INTEGER NOT NULL,
    "patch" INTEGER NOT NULL,

    CONSTRAINT "MinecraftVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinecraftLoader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MinecraftLoader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShaderLoader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShaderLoader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModFile" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "minecraftVersionId" TEXT NOT NULL,
    "loaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modId" TEXT NOT NULL,

    CONSTRAINT "ModFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ModStatus" NOT NULL DEFAULT 'published',
    "authorId" TEXT,
    "iconId" TEXT,

    CONSTRAINT "Mod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModConflict" (
    "id" TEXT NOT NULL,
    "modId" TEXT NOT NULL,
    "conflictModId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModConflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModDependency" (
    "id" TEXT NOT NULL,
    "modId" TEXT NOT NULL,
    "dependencyModId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "minVersion" TEXT NOT NULL,
    "maxVersion" TEXT NOT NULL,
    "rol" "ModDependencyRol" NOT NULL DEFAULT 'required',

    CONSTRAINT "ModDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShaderFile" (
    "id" TEXT NOT NULL,
    "fileId" TEXT,
    "shaderId" TEXT,
    "version" TEXT NOT NULL,
    "minecraftVersionId" TEXT NOT NULL,
    "loaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShaderFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,
    "iconId" TEXT,

    CONSTRAINT "Shader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT,
    "iconId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "PackStatus" NOT NULL DEFAULT 'published',

    CONSTRAINT "Pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackVersion" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "minecraftVersionId" TEXT NOT NULL,
    "minecraftLoaderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackMod" (
    "id" TEXT NOT NULL,
    "packVersionId" TEXT NOT NULL,
    "modFileId" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "loadOrder" INTEGER NOT NULL,

    CONSTRAINT "PackMod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackShader" (
    "id" TEXT NOT NULL,
    "shaderFileid" TEXT NOT NULL,
    "packVersionId" TEXT NOT NULL,

    CONSTRAINT "PackShader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_pack_image" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_pack_image_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_localFileid_key" ON "File"("localFileid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftLoader_iconId_key" ON "MinecraftLoader"("iconId");

-- CreateIndex
CREATE UNIQUE INDEX "ShaderLoader_iconId_key" ON "ShaderLoader"("iconId");

-- CreateIndex
CREATE UNIQUE INDEX "ModFile_fileId_key" ON "ModFile"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Mod_iconId_key" ON "Mod"("iconId");

-- CreateIndex
CREATE UNIQUE INDEX "ShaderFile_fileId_key" ON "ShaderFile"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Shader_iconId_key" ON "Shader"("iconId");

-- CreateIndex
CREATE UNIQUE INDEX "Pack_iconId_key" ON "Pack"("iconId");

-- CreateIndex
CREATE INDEX "_pack_image_B_index" ON "_pack_image"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_localFileid_fkey" FOREIGN KEY ("localFileid") REFERENCES "LocalFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_modId_fkey" FOREIGN KEY ("modId") REFERENCES "Mod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_shadeId_fkey" FOREIGN KEY ("shadeId") REFERENCES "Shader"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinecraftLoader" ADD CONSTRAINT "MinecraftLoader_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShaderLoader" ADD CONSTRAINT "ShaderLoader_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModFile" ADD CONSTRAINT "ModFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModFile" ADD CONSTRAINT "ModFile_minecraftVersionId_fkey" FOREIGN KEY ("minecraftVersionId") REFERENCES "MinecraftVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModFile" ADD CONSTRAINT "ModFile_loaderId_fkey" FOREIGN KEY ("loaderId") REFERENCES "MinecraftLoader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModFile" ADD CONSTRAINT "ModFile_modId_fkey" FOREIGN KEY ("modId") REFERENCES "Mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mod" ADD CONSTRAINT "Mod_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mod" ADD CONSTRAINT "Mod_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModConflict" ADD CONSTRAINT "ModConflict_modId_fkey" FOREIGN KEY ("modId") REFERENCES "Mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModConflict" ADD CONSTRAINT "ModConflict_conflictModId_fkey" FOREIGN KEY ("conflictModId") REFERENCES "Mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModDependency" ADD CONSTRAINT "ModDependency_modId_fkey" FOREIGN KEY ("modId") REFERENCES "Mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModDependency" ADD CONSTRAINT "ModDependency_dependencyModId_fkey" FOREIGN KEY ("dependencyModId") REFERENCES "Mod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShaderFile" ADD CONSTRAINT "ShaderFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShaderFile" ADD CONSTRAINT "ShaderFile_shaderId_fkey" FOREIGN KEY ("shaderId") REFERENCES "Shader"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShaderFile" ADD CONSTRAINT "ShaderFile_minecraftVersionId_fkey" FOREIGN KEY ("minecraftVersionId") REFERENCES "MinecraftVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShaderFile" ADD CONSTRAINT "ShaderFile_loaderId_fkey" FOREIGN KEY ("loaderId") REFERENCES "MinecraftLoader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shader" ADD CONSTRAINT "Shader_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shader" ADD CONSTRAINT "Shader_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pack" ADD CONSTRAINT "Pack_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pack" ADD CONSTRAINT "Pack_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackVersion" ADD CONSTRAINT "PackVersion_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackVersion" ADD CONSTRAINT "PackVersion_minecraftVersionId_fkey" FOREIGN KEY ("minecraftVersionId") REFERENCES "MinecraftVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackVersion" ADD CONSTRAINT "PackVersion_minecraftLoaderId_fkey" FOREIGN KEY ("minecraftLoaderId") REFERENCES "MinecraftLoader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackMod" ADD CONSTRAINT "PackMod_packVersionId_fkey" FOREIGN KEY ("packVersionId") REFERENCES "PackVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackMod" ADD CONSTRAINT "PackMod_modFileId_fkey" FOREIGN KEY ("modFileId") REFERENCES "ModFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackShader" ADD CONSTRAINT "PackShader_shaderFileid_fkey" FOREIGN KEY ("shaderFileid") REFERENCES "ShaderFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackShader" ADD CONSTRAINT "PackShader_packVersionId_fkey" FOREIGN KEY ("packVersionId") REFERENCES "PackVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pack_image" ADD CONSTRAINT "_pack_image_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pack_image" ADD CONSTRAINT "_pack_image_B_fkey" FOREIGN KEY ("B") REFERENCES "Pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
