import { UserRepository } from "@/core/domain/port/UserRepository";
import { HashService } from "./HashService";
import { TokenService } from "./TokenService";
import { ActivationCodeService } from "./ActivationCodeService";
import { EmailService } from "./EmailService";
import { SecretKeyService } from "./SecretKeyService";
import { FileService } from "./FileService";
import { CommentRepository } from "@/core/domain/port/CommentRepository";
import { ModConflictRepository } from "@/core/domain/port/mod/ModConflictRepository";
import { ModRepository } from "@/core/domain/port/mod/ModRepository";
import { PackRepository } from "@/core/domain/port/pack/PackRepository";
import { ShaderRepository } from "@/core/domain/port/shader/ShaderRepository";
import { UserInstalationRepository } from "@/core/domain/port/UserInstalationRepository";
import { FileRepository } from "@/core/domain/port/file/FileRepository";
import { ExternalIdRepository } from "@/core/domain/port/ExternalIdRepository";
import { ModFileRepository } from "@/core/domain/port/mod/ModFileRepository";
import { UuidService } from "./UuidService";
import { ShaderFileRepository } from "@/core/domain/port/shader/ShaderFileRepository";

export interface ServiceContext {
  tokenService: TokenService;
  hashService: HashService;
  activationCodeService: ActivationCodeService;
  emailService: EmailService;
  secretKeyService: SecretKeyService;
  fileService: FileService;
  uuidService: UuidService;

  // respositories
  userRepository: UserRepository;
  commentRepository: CommentRepository;
  modRepository: ModRepository;
  modFileRepository: ModFileRepository;
  modConflictRepository: ModConflictRepository;
  packRepository: PackRepository;
  shaderRepository: ShaderRepository;
  userInstalationRepository: UserInstalationRepository;
  fileRepository: FileRepository;
  externalIdRepository: ExternalIdRepository;
  shaderFileRepository: ShaderFileRepository;
}
