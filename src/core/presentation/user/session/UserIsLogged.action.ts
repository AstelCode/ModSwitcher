"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { UserIsLoggedUseCase } from "@/core/application/use-cases/user/session/UserIsLogged.usecase";

export type UserIsLoggedActionState = {
  isLogged: boolean;
};

export async function UserIsLoggedAction(): Promise<UserIsLoggedActionState> {
  const userIsLoggedUseCase = new UserIsLoggedUseCase(serviceContext);
  const isLogged = await userIsLoggedUseCase.execute();
  return { isLogged };
}
