"use server";

import { GetSessionUseCase } from "@/core/application/use-cases/user/auth/session/GetSession.usecase";
import { GetUserUseCase } from "@/core/application/use-cases/user/profile/GetUser.usecase";
import { UserJson } from "@/core/domain/model/user";
import { serviceContext } from "@infrastructure/container";
import { cacheLife, cacheTag } from "next/cache";

async function GetUserCached(userId: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`user:${userId}`);
  const getUserUseCase = new GetUserUseCase(serviceContext);
  return getUserUseCase.execute(userId);
}

export async function GetUserAction(
  cache: boolean = true,
): Promise<UserJson | null> {
  const getSessionUseCase = new GetSessionUseCase(serviceContext);
  const getUserUseCase = new GetUserUseCase(serviceContext);
  try {
    const { userId } = await getSessionUseCase.execute();
    if (cache) {
      const user = await GetUserCached(userId);
      return user;
    }
    return getUserUseCase.execute(userId);
  } catch (_) {
    return null;
  }
}
