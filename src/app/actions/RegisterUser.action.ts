"use server";
import { serviceContext } from "@/core/infrastructure/container";
import { CreateUserUseCase } from "@/core/application/use-cases/user/CreateUser.usecase";
export async function RegisterUserAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  console.log(username, password, email);
  return;
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
