import { UploadLocalFileInput } from "../../../port/FileService";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  | "userRepository"
  | "fileRepository"
  | "tokenService"
  | "fileService"
  | "modRepository"
  | "uuidService"
>;

export class AddImageUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      file?: UploadLocalFileInput;
      url?: string;
      modId: string;
    },
  ): Promise<void> {
    const {
      userRepository,
      uuidService,
      tokenService,
      fileService,
      modRepository,
    } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const mod = await modRepository.getById(args.modId);
    if (!mod) throw new Error("Mod not found");
    if (mod.authorId != user.getId()) throw new Error("Unauthorized");
    let data: string | UploadLocalFileInput;
    if (args.file) {
      data = args.file;
    } else if (args.url) {
      data = args.url;
    } else {
      throw new Error("No file or url provided");
    }
    await fileService.upload(
      "mod_image",
      `${mod.getId()}_${uuidService.generate()}`,
      data,
      {
        modId: args.modId,
      },
    );
  }
}
