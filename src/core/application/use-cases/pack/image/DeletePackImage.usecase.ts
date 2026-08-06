import { ServiceContext } from "../../port/ServiceContext";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "fileService" | "tokenService" | "packRepository"
>;
export class DeletePackImageUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: { packId: string; imageId: string },
  ): Promise<void> {
    // TODO: validad si esta siendo usado
    const { userRepository, tokenService, fileService, packRepository } =
      this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    if (pack.authorId != user.getId()) throw new Error("Unauthorized");
    await fileService.delete(args.imageId);
  }
}
