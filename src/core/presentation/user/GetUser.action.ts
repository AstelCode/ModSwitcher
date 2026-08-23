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

export async function GetUserAction(): Promise<UserJson | null> {
  try {
    const getSessionUseCase = new GetSessionUseCase(serviceContext);
    const { userId } = await getSessionUseCase.execute();
    const user = await GetUserCached(userId);
    return user;
  } catch (_) {
    return null;
  }
}
