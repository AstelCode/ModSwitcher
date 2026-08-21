import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "fileService" | "uuidService"
>;

export class UpdateUserAvatarUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(userId: string, file: UploadLocalFileInput): Promise<void> {
    const { userRepository, fileService, uuidService } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    if (user.avatarId) {
      await fileService.delete(user.avatarId);
    }
    const uuid = await uuidService.generate();

    const fileAvatar = await fileService.upload(
      "avatars",
      `avatar_${uuid}`,
      file,
    );
    await userRepository.update(userId, { avatarId: fileAvatar.id });
  }
}
