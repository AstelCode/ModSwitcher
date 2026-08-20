import { PrismaClient } from "./connection/client";
import { User } from "@/core/domain/model/user/User";
import {
  UserFilter,
  UserInclude,
  UserPagination,
  UserRepository,
  UserUpdateData,
} from "@/core/domain/port/UserRepository";
import { FileModel } from "@/core/domain/model/file/File";
import { Pack } from "@/core/domain/model/pack/Pack";
import { Shader } from "@/core/domain/model/shader/Shader";
import { CommentModel } from "@/core/domain/model/Comment";
import { Mod } from "@/core/domain/model";

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async exists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user != undefined;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return;
    return new User(user);
  }

  async getAll(data?: {
    filter?: UserFilter;
    pagination?: UserPagination;
    include?: UserInclude;
  }): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role:
          typeof data?.filter?.role == "string"
            ? data?.filter?.role
            : {
                in: data?.filter?.role,
              },
        email: data?.filter?.email,
        username: data?.filter?.username,
        avatarId: data?.filter?.avatarId,
        createdAt: data?.filter?.createdAt,
        updatedAt: data?.filter?.updatedAt,
      },
      include: {
        avatar: data?.include?.avatar,
        mods: data?.include?.mods,
        packs: data?.include?.packs,
        shaders: data?.include?.shaders,
        comments: data?.include?.comments,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return users.map(
      (user) =>
        new User({
          ...user,
          avatar: user.avatar ? new FileModel(user.avatar) : null,
          mods: user.mods?.map((mod) => new Mod(mod)),
          packs: user.packs?.map((pack) => new Pack(pack)),
          shaders: user.shaders?.map((shader) => new Shader(shader)),
          comments: user.comments?.map((comment) => new CommentModel(comment)),
        }),
    );
  }
  async getById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) return;
    return new User(user);
  }

  async create(user: User): Promise<User> {
    const userPersistence = user.toPersistence();
    const createdUser = await this.prisma.user.create({
      data: userPersistence,
    });
    return new User(createdUser);
  }

  async update(id: string, user: UserUpdateData): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        avatarId: user.avatarId,
        activationCode: user.activationCode,
        recoveryTokenHash: user.recoveryTokenHash,
        status: user.status,
      },
    });
    return new User(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
