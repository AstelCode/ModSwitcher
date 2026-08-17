"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { CreateUserUseCase } from "@/core/application/use-cases/user/CreateUser.usecase";

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
  console.log(username, password, email);
  return {};
  const registerUserUseCase = new CreateUserUseCase(serviceContext);
  try {
    const token = await registerUserUseCase.execute({
      email,
      username,
      password,
    });
    console.log(token);
  } catch (e) {
    console.log(e);
  }
}
