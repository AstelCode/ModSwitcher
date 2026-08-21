"use server";

import {
  GetSessionUseCase,
  UpdateUsernameUseCase,
} from "@/core/application/use-cases/user";
import { serviceContext } from "@/core/infrastructure/container";
import { refresh, revalidateTag } from "next/cache";

export interface UpdateUsernameActionState {
  error?: string;
}
export async function UpdateUsernameAction(
  prevState: UpdateUsernameActionState,
  formData: FormData,
): Promise<UpdateUsernameActionState> {
  const getSessionUseCase = new GetSessionUseCase(serviceContext);
  const updateUsernameUseCase = new UpdateUsernameUseCase(serviceContext);
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username) return { error: "Username can't be null" };
  if (!password) return { error: "Password can't be null" };
  const payload = await getSessionUseCase.execute();

  try {
    await updateUsernameUseCase.execute(payload.userId, {
      newUsername: username as string,
      password: password as string,
    });
    revalidateTag(`user:${payload.userId}`, "max");
    refresh();
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
  return {};
}
