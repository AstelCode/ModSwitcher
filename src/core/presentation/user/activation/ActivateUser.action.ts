"use server";
import { ActivateUserUseCase } from "@use-cases/user/auth/activation/ActivateUser.usecase";
import { InvalidActivationCodeError } from "@/core/errors/InvalidActivationCode";
import { serviceContext } from "@infrastructure/container";
export type ActivationUserActionState = {
  error?: string;
  isValidCode?: boolean;
};

export async function ActivateUserAction(
  prevState: ActivationUserActionState,
  token: string,
  code: string,
): Promise<ActivationUserActionState> {
  const activationUserUseCase = new ActivateUserUseCase(serviceContext);
  try {
    await activationUserUseCase.execute(token, code);
  } catch (e) {
    if (e instanceof InvalidActivationCodeError) {
      return { isValidCode: false };
    }
    return { error: (e as Error).message, isValidCode: undefined };
  }
  return {};
}
