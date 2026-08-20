"use server";
import { GetSessionUseCase } from "@/core/application/use-cases/user";
import { UserIsLoggedUseCase } from "@/core/application/use-cases/user/session/UserIsLogged.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { cacheLife } from "next/cache";

export type UserIsLoggedActionState = {
  isLogged: boolean;
};

async function UserIsLoggedCached(userId: string) {
  "use cache";
  cacheLife("minutes");
  const getUserUseCase = new UserIsLoggedUseCase(serviceContext);
  return getUserUseCase.execute(userId);
}

export async function UserIsLoggedAction(): Promise<UserIsLoggedActionState> {
  try {
    const getSessionUseCase = new GetSessionUseCase(serviceContext);
    const { userId } = await getSessionUseCase.execute();
    const isLogged = await UserIsLoggedCached(userId);
    return { isLogged };
  } catch (_) {
    return { isLogged: false };
  }
}
