"use server";

import { ValidateRecoveryTokenUseCase } from "@/core/application/use-cases/user/passwordRecovery/ValidateRecoveryToken.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

interface ValidateRecoveryTokenActionState {
  error?: string;
}
export async function VerifyRecoveryTokenAction(
  state: ValidateRecoveryTokenActionState,
  formData: FormData,
): Promise<ValidateRecoveryTokenActionState> {
  const token = formData.get("token") as string;
  const validateRecoveryTokenUseCase = new ValidateRecoveryTokenUseCase(
    serviceContext,
  );
  try {
    const result = await validateRecoveryTokenUseCase.execute(token);
    if (!result) return { error: "Invalid token" };
  } catch (e) {
    if (e instanceof Error) return { error: e.message };
  }
  redirect(`${ROUTES.AUTH_CHANGE_PASSWORD}?token=${token}`);
}
