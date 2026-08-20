"use server";

import { GetUserUseCase } from "@/core/application/use-cases/user/GetUser.usecase";
import { UserJson } from "@/core/domain/model/user";
import { serviceContext } from "@/core/infrastructure/container";

export async function GetUserAction(): Promise<UserJson | null> {
  const getUserUseCase = new GetUserUseCase(serviceContext);
  try {
    const user = await getUserUseCase.execute();
    return user;
  } catch (e) {
    return null;
  }
}
