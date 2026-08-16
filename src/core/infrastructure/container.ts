import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./repositories/prisma/connection/client";
import { ServiceContext } from "../application/port/ServiceContext";
import { UserRepositoryPrisma } from "./repositories/prisma/UserRepository.prisma";
import { CommentRepositoryPrisma } from "./repositories/prisma/CommentRepository.prisma";
import { ModRepositoryPrisma } from "./repositories/prisma/ModRepository.prisma";
import { ModFileRepositoryPrisma } from "./repositories/prisma/ModFileRepository.prisma";
import { PackRepositoryPrisma } from "./repositories/prisma/PackRepository.prisma";
import { PackModRepositoryPrisma } from "./repositories/prisma/PackModRepository.prisma";
import { PackShaderRepositoryPrisma } from "./repositories/prisma/PackShaderRepository.prisma";
import { PackVersionRepositoryPrisma } from "./repositories/prisma/PackVersionRepository.prisma";
import { ShaderRepositoryPrisma } from "./repositories/prisma/ShaderRepository.prisma";
import { FileRepositoryPrisma } from "./repositories/prisma/FileRepository.prisma";
import { ModConflictRepositoryPrisma } from "./repositories/prisma/ModConflictRepository.prisma";
import { ShaderFileRepositoryPrisma } from "./repositories/prisma/ShaderFileRepository.prisma";
import { MinecraftVersionRepositoryPrisma } from "./repositories/prisma/MinecraftVersionRepository.prisma";
import { MinecraftLoaderRepositoryPrisma } from "./repositories/prisma/MinecraftLoaderRepository.prisma";
import { ShaderLoaderRepositoryPrisma } from "./repositories/prisma/ShaderLoaderRepository.prisma";
import { UuidServiceNode } from "./services/uuid.service";
import { TokenServiceJose } from "./services/token.service";
import { HashServiceArgon2 } from "./services/hash.service";
import { ActivationCodeServiceUUID } from "./services/activationCode.service";
import { SecretKeyServiceLocal } from "./services/secretKey.service";
import { EmailServiceResend } from "./services/email.service";
import { FileServiceLocal } from "./services/file.service";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter: adapter,
});

const fileRepository = new FileRepositoryPrisma(prisma);
export const serviceContext: ServiceContext = {
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
