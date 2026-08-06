import { PackVersionJson } from "@/core/domain/model/pack/PackVersion";
import { ServiceContext } from "../../../port/ServiceContext";

type Deps = Pick<ServiceContext, "packRepository" | "packVersionRepository">;

export class ListPackVersionUseCase {
  constructor(private readonly deps: Deps) {}
  async execute(args: {
    packId: string;
    pagination?: {
      limit?: number;
      offset?: number;
    };
  }): Promise<PackVersionJson[]> {
    const { packRepository, packVersionRepository } = this.deps;
    const pack = await packRepository.getById(args.packId);
    if (!pack) throw new Error("Pack not found");
    const packVersion = await packVersionRepository.getAll({
      pagination: args.pagination,
      filter: {
        packId: args.packId,
      },
    });
    if (!packVersion) throw new Error("PackVersion not found");
    return packVersion.map((packVersion) => packVersion.toJson());
  }
}
