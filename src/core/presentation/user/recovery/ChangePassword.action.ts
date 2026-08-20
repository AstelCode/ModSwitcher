"use server";

import { PasswordRecoveryUseCase } from "@/core/application/use-cases/user/passwordRecovery/PasswordRecovery.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";
interface ChangePasswordState {
  error?: string;
}
export async function ChangePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const password = formData.get("password") as string;
  const token = formData.get("token") as string;
  const changePasswordUseCase = new PasswordRecoveryUseCase(serviceContext);
  try {
    await changePasswordUseCase.execute(token, password);
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
  }
  redirect(ROUTES.AUTH_LOGIN);
}
