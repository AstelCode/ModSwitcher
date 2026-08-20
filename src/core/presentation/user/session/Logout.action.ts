"use server";
import { LogoutUseCase } from "@/core/application/use-cases/user/session/Logout.usecase";
import { serviceContext } from "@/core/infrastructure/container";

export async function LogoutAction() {
  const logoutUseCase = new LogoutUseCase(serviceContext);
  try {
    await logoutUseCase.execute();
  } catch (_) {}
}
