"use server";

import { GetSessionUseCase } from "@/core/application/use-cases/user/auth/session/GetSession.usecase";
import { UpdateRoleUseCase } from "@/core/application/use-cases/user/UpdateRol.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { revalidateTag } from "next/cache";
import { refresh } from "next/cache";

export async function convertToAdminAction(userId: string) {
  const updateRoleUseCase = new UpdateRoleUseCase(serviceContext);
  const getSessionUseCase = new GetSessionUseCase(serviceContext);

  try {
    const session = await getSessionUseCase.execute();
    await updateRoleUseCase.execute(session.userId, userId, "admin");
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return;
  }
  revalidateTag(`user:${userId}`, "max");
  refresh();
}
