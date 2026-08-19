"use server";

import { ResendActivationEmailUseCase } from "@/core/application/use-cases/user/activation/ResendActivationEmail.usecase";
import { serviceContext } from "@/core/infrastructure/container";

type ResendActivationResult = {
  error?: string;
};

export async function ResendActivationEmailAction(
  prevState: ResendActivationResult,
  token: string,
): Promise<ResendActivationResult> {
  const resendActivationEmailUseCase = new ResendActivationEmailUseCase(
    serviceContext,
  );
  try {
    await resendActivationEmailUseCase.execute(token);
  } catch (e) {
    return { error: (e as Error).message };
  }
  return {};
}
