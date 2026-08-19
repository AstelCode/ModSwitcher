"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { AuthUseCase } from "@/core/application/use-cases/user/Auth.usecase";
import { redirect } from "next/navigation";
import { saveToken } from "@/core/infrastructure/auth/saveToken";

export type SignInActionState = {
  error?: string;
  message?: string;
};

export async function LogInAction(
  state: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const user = formData.get("user") as string;
  const password = formData.get("password") as string;
  const authUseCase = new AuthUseCase(serviceContext);
  try {
    await authUseCase.execute(user, password);
  } catch (e) {
    return { error: (e as Error).message as string };
  }
  redirect("/dashboard");
}
