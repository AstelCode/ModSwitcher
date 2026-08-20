"use server";
import { serviceContext } from "@/core/infrastructure/container";
import {
  ActivateUserUseCase,
  InvalidActivationCodeError,
} from "@/core/application/use-cases/user/activation/ActivateUser.usecase";

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
