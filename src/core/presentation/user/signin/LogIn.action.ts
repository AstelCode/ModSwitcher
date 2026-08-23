"use server";
import { SigninUseCase } from "@use-cases/user/auth/signin/Signin.usecase";
import { serviceContext } from "@infrastructure/container";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export type SignInActionState = {
  error?: string;
};

export async function LogInAction(
  state: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const user = formData.get("user") as string;
  const password = formData.get("password") as string;
  const authUseCase = new SigninUseCase(serviceContext);
  try {
    await authUseCase.execute(user, password);
  } catch (e) {
    return { error: (e as Error).message as string };
  }
  redirect(ROUTES.EXPLORER);
}
