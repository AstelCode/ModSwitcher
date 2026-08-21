import { ServiceContext } from "@/core/application/port/ServiceContext";
import { ModConflictJson } from "@/core/domain/model/mod/ModConflict";

type Deps = Pick<
  ServiceContext,
  "userRepository" | "tokenService" | "modConflictRepository"
>;

export class ListModConflictUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(
    token: string,
    args: {
      modId?: string;
      pagination?: {
        limit?: number;
        offset?: number;
      };
    },
  ): Promise<ModConflictJson[]> {
    const { userRepository, tokenService, modConflictRepository } = this.deps;
    const { userId } = await tokenService.verify(token);
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.role == "user") throw new Error("Unauthorized");
    const modConflicts = await modConflictRepository.getAll({
      pagination: args.pagination,
      filter: {
        modId: args.modId,
      },
      include: {
        mod: true,
        conflictMod: true,
      },
    });
    return modConflicts.map((modConflict) => modConflict.toJson());
  }
}
