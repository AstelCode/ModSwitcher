"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { AuthUseCase } from "@/core/application/use-cases/user/Auth.usecase";

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
    const token = await authUseCase.execute(user, password);
    console.log(token);
  } catch (e) {
    return { error: (e as Error).message as string };
  }
  return { message: "Success" };
}
