"use server";
import { ActivateUserUseCase } from "@use-cases/user/auth/activation/ActivateUser.usecase";
import { InvalidActivationCodeError } from "@/core/errors/InvalidActivationCode";
import { serviceContext } from "@infrastructure/container";
import { refresh } from "next/cache";
import { ActivateSuperuserUseCase } from "@/core/application/use-cases/user/auth/activation/ActivateSuperuser.usecase";
export type ActivationUserActionState = {
  error?: string;
  isValidCode?: boolean;
};

export async function ActivateUserAction(
  token: string,
  code: string,
  secretKey?: string,
): Promise<ActivationUserActionState> {
  if (secretKey) {
  }
  const activeSuperuserUseCase = new ActivateSuperuserUseCase(serviceContext);
  const activationUserUseCase = new ActivateUserUseCase(serviceContext);
  try {
    if (secretKey) {
      await activeSuperuserUseCase.execute(token, code, secretKey);
    } else {
      await activationUserUseCase.execute(token, code);
    }
  } catch (e) {
    if (e instanceof InvalidActivationCodeError) {
      return { isValidCode: false };
    }
    return { error: (e as Error).message, isValidCode: undefined };
  }
  refresh();
  return {};
}
