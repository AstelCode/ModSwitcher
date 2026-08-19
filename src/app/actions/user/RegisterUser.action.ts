"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { CreateUserUseCase } from "@/core/application/use-cases/user/CreateUser.usecase";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export type RegisterUserActionState = {
  error?: string;
  message?: string;
};

export async function RegisterUserAction(
  prevState: RegisterUserActionState,
  formData: FormData,
): Promise<RegisterUserActionState> {
  const username = formData.get("name") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const registerUserUseCase = new CreateUserUseCase(serviceContext);
  let token: string;
  try {
    token = await registerUserUseCase.execute({
      email,
      username,
      password,
    });
  } catch (e) {
    return { error: (e as Error).message as string };
  }
  redirect(`${ROUTES.AUTH_ACTIVATION}?token=${token}`);
}
