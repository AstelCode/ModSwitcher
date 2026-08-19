"use server";

import { ROUTES } from "@/constants/routes";
import { SendPasswordRecoveryEmailUseCase } from "@/core/application/use-cases/user/passwordRecovery/SendPasswordRecoveryEmail";
import { serviceContext } from "@/core/infrastructure/container";
import { redirect } from "next/navigation";

export type SendRecoveryEmailActionState = {
  error?: string;
  message?: string;
};

export async function SendRecoveryEmailAction(
  prevState: SendRecoveryEmailActionState,
  formData: FormData,
): Promise<SendRecoveryEmailActionState> {
  const email = formData.get("email") as string;
  const sendPasswordRecoveryEmailUseCase = new SendPasswordRecoveryEmailUseCase(
    serviceContext,
  );
  try {
    await sendPasswordRecoveryEmailUseCase.execute(email);
  } catch (e) {
    return { error: (e as Error).message as string };
  }
  redirect(ROUTES.AUTH_VALIDATE_RECOVERY_TOKEN);
}
