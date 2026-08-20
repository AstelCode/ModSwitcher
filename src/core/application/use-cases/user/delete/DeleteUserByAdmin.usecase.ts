import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<ServiceContext, "userRepository" | "tokenService">;
export class DeleteUserByAdminUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(token: string, userId: string): Promise<void> {
    const { userRepository, tokenService } = this.deps;
    const { userId: adminId } = await tokenService.verify(token);
    const user = await userRepository.getById(adminId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    await userRepository.delete(userId);
  }
}
