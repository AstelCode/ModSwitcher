"use server";

import {
  GetSessionUseCase,
  UpdatePasswordUseCase,
} from "@/core/application/use-cases/user";
import { serviceContext } from "@/core/infrastructure/container";

export interface UpdatePasswordActionState {
  error?: string;
}

export async function UpdatePasswordAction(
  formData: FormData,
): Promise<UpdatePasswordActionState> {
  const getSessionUseCase = new GetSessionUseCase(serviceContext);
  const updatePasswordUseCase = new UpdatePasswordUseCase(serviceContext);

  try {
    const lastPassword = formData.get("lastPassword");
    const newPassword = formData.get("password");
    if (!lastPassword) return { error: "Last password can't be null" };
    if (!newPassword) return { error: "New password can't be null" };
    const payload = await getSessionUseCase.execute();
    await updatePasswordUseCase.execute(payload.userId, {
      lastPassword: lastPassword as string,
      password: newPassword as string,
    });
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }

  return {};
}
