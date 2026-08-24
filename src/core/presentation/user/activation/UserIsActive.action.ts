"use server";

import { UserIsActiveUseCase } from "@/core/application/use-cases/user/auth/activation/UserIsActive.usecase";
import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { serviceContext } from "@/core/infrastructure/container";

interface UserIsActiveState {
  userNotFound: boolean;
  isActive: boolean;
}
export async function UserIsActiveAction(
  token: string,
): Promise<UserIsActiveState> {
  const isUserActiveUseCase = new UserIsActiveUseCase(serviceContext);
  try {
    const isActive = await isUserActiveUseCase.execute(token);
    return { userNotFound: false, isActive };
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      return { userNotFound: true, isActive: false };
    }
    return { userNotFound: false, isActive: false };
  }
}
