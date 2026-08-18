"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { ActivationUserUseCase } from "@/core/application/use-cases/user/auth/ActivationUser.usecase";

export type ActivationUserActionState = {
  error?: string;
  message?: string;
};

export async function ActivationUserAction(
  prevState: ActivationUserActionState,
  token: string,
  code: string,
): Promise<ActivationUserActionState> {
  const activationUserUseCase = new ActivationUserUseCase(serviceContext);
  try {
    await activationUserUseCase.execute(token, code);
    return { message: "Success" };
  } catch (e) {
    return { error: (e as Error).message as string };
  }
}
