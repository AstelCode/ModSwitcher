import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./repositories/prisma/connection/client";
import { ServiceContext } from "../application/port";
import {
  CommentRepositoryPrisma,
  FileRepositoryPrisma,
  MinecraftLoaderRepositoryPrisma,
  MinecraftVersionRepositoryPrisma,
  ModConflictRepositoryPrisma,
  ModFileRepositoryPrisma,
  ModRepositoryPrisma,
  PackModRepositoryPrisma,
  PackRepositoryPrisma,
  PackShaderRepositoryPrisma,
  PackVersionRepositoryPrisma,
  ShaderFileRepositoryPrisma,
  ShaderRepositoryPrisma,
  UserRepositoryPrisma,
} from "./repositories/prisma";
import {
  ActivationCodeServiceUUID,
  EmailServiceResend,
  FileServiceLocal,
  HashServiceArgon2,
  SecretKeyServiceLocal,
  TokenServiceJose,
  TokenStorageServiceNext,
  UuidServiceNode,
} from "./services";
import { ShaderLoaderRepositoryPrisma } from "./repositories/prisma/ShaderLoaderRepository.prisma";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter: adapter,
});

const fileRepository = new FileRepositoryPrisma(prisma);
export const serviceContext: ServiceContext = {
  tokenStorageService: new TokenStorageServiceNext(),
  userRepository: new UserRepositoryPrisma(prisma),
  commentRepository: new CommentRepositoryPrisma(prisma),
  modRepository: new ModRepositoryPrisma(prisma),
  modFileRepository: new ModFileRepositoryPrisma(prisma),
  modConflictRepository: new ModConflictRepositoryPrisma(prisma),
  packRepository: new PackRepositoryPrisma(prisma),
  packModRepository: new PackModRepositoryPrisma(prisma),
  packShaderRepository: new PackShaderRepositoryPrisma(prisma),
  packVersionRepository: new PackVersionRepositoryPrisma(prisma),
  shaderRepository: new ShaderRepositoryPrisma(prisma),
  fileRepository: fileRepository,
  shaderFileRepository: new ShaderFileRepositoryPrisma(prisma),
  minecraftVersionRepository: new MinecraftVersionRepositoryPrisma(prisma),
  minecraftLoaderRepository: new MinecraftLoaderRepositoryPrisma(prisma),
  shaderLoaderRepository: new ShaderLoaderRepositoryPrisma(prisma),
  uuidService: new UuidServiceNode(),
  tokenService: new TokenServiceJose(),
  hashService: new HashServiceArgon2(),
  activationCodeService: new ActivationCodeServiceUUID(),
  secretKeyService: new SecretKeyServiceLocal(),
  emailService: new EmailServiceResend(),
  fileService: new FileServiceLocal(fileRepository),
};
