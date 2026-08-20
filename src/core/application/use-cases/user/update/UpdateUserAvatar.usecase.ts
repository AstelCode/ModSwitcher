import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "fileService"
>;

export class UpdateUserAvatarUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(token: string, file: UploadLocalFileInput): Promise<void> {
    const { userRepository, tokenService, fileService } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    const fileAvatar = await fileService.upload(
      "avatars",
      `avatar_${user.getId()}`,
      file,
    );
    await userRepository.update(userId, { avatarId: fileAvatar.id });
  }
}
