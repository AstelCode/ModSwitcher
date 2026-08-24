"use server";

import { UpdateUserAvatarUseCase } from "@use-cases/user/profile";
import { GetSessionUseCase } from "@use-cases/user/auth/session/GetSession.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { refresh, revalidateTag } from "next/cache";

export interface UpdateUserAvatarActionState {
  error?: string;
}
export async function UpdateUserAvatarAction(
  formData: FormData,
): Promise<UpdateUserAvatarActionState> {
  const file = formData.get("avatar") as File;
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(serviceContext);
  const getSessionUserUseCase = new GetSessionUseCase(serviceContext);
  try {
    const payload = await getSessionUserUseCase.execute();
    if (file) {
      await updateUserAvatarUseCase.execute(payload.userId, {
        stream: file.stream(),
        filename: file.name,
        contentType: file.type,
        size: file.size,
        extension: file.name.split(".").pop(),
      });
    } else {
      await updateUserAvatarUseCase.execute(payload.userId, null);
    }
    revalidateTag(`user:${payload.userId}`, "max");
  } catch (e) {
    if (e instanceof Error) return { error: e.message };
  }
  refresh();
  return {};
}
