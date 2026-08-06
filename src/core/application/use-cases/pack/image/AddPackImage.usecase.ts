import { UploadLocalFileInput } from "../../port/FileService";
import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "packRepository"
>;

export class AddPackImageUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      packId: string;
    },
  ): Promise<void> {
    const { userRepository, tokenService, fileService, packRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    let data: string | UploadLocalFileInput;
    if (args.file) {
      data = args.file;
    } else if (args.url) {
      data = args.url;
    } else {
      throw new Error("No file or url provided");
    }
    await fileService.upload("pack_image", `${args.packId}_image`, data, {
      packId: args.packId,
    });
  }
}
