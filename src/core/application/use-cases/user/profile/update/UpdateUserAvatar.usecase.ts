import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { UploadLocalFileInput } from "../../../../port/FileService";
import { ServiceContext } from "../../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "fileService" | "uuidService"
>;

export class UpdateUserAvatarUseCase {
  constructor(private readonly deps: Deps) {}

  async execute(
    userId: string,
    file: UploadLocalFileInput | string | null,
  ): Promise<void> {
    const { userRepository, fileService, uuidService } = this.deps;
    const user = await userRepository.getById(userId);
    if (!user) throw new UserNotFoundError();
    const uuid = await uuidService.generate();
    const fileName = `avatar_${uuid}`;
    if (!file) {
      if (user.avatarId) {
        await fileService.delete(user.avatarId);
      }
      return;
    }

    if (user.avatarId) {
      await fileService.update(user.getAvatarId(), fileName, file);
      return;
    }
    const fileAvatar = await fileService.upload("avatars", fileName, file);
    await userRepository.update(userId, { avatarId: fileAvatar.id });
  }
}
