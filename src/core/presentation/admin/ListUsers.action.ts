"use server";

import { GetSessionUseCase } from "@/core/application/use-cases/user/auth/session/GetSession.usecase";
import { ListUsersUseCase } from "@/core/application/use-cases/user/ListUsers.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { UserPagination } from "@/core/domain/port/UserRepository";
export async function listUsersAction(pagination?: UserPagination) {
  const getSessionUseCase = new GetSessionUseCase(serviceContext);
  const listUsersUseCase = new ListUsersUseCase(serviceContext);

  try {
    const session = await getSessionUseCase.execute();
    const users = await listUsersUseCase.execute(session.userId);
    return users;
  } catch (e) {
    return [];
  }
}
