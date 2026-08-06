import { PrismaClient } from "./connection/client";
import { User } from "@/core/domain/model/User";
import { UserRepository } from "@/core/domain/port/UserRepository";

export class UserRespository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async getAll(data?: {
    filter?: {
      id?: string;
      role?: string;
    };
    pagination?: {
      limit?: number;
      offset?: number;
    };
  }): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: data?.filter?.id,
        role: data?.filter?.role,
      },
      take: data?.pagination?.limit,
      skip: data?.pagination?.offset,
    });
    return users;
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        role: user.role,
      },
    });
    return createdUser;
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: user.role,
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
