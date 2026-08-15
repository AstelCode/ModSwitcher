import { PrismaClient } from "./connection/client";
import { User } from "@/core/domain/model/User";
import {
  UserFilter,
  UserInclude,
  UserPagination,
  UserRepository,
} from "@/core/domain/port/UserRepository";

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
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
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
    return users;
  }
  async getById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async create(user: User): Promise<User> {
    const userPersistence = user.toPersistence();
    const createdUser = await this.prisma.user.create({
      data: userPersistence,
    });
    return createdUser;
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        avatarId: user.avatar?.id,
        role: user.role,
        activationCode: user.activationCode,
        recoveryTokenHash: user.recoveryTokenHash,
        status: user.status,
      },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
