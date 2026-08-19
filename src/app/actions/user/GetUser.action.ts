import { serviceContext } from "@/core/infrastructure/container";

export async function GetUserAction(): Promise<GetUserActionState> {
  const userId = formData.get("userId") as string;
  const userRepository = serviceContext.userRepository;
  try {
    const user = await userRepository.getById(userId);
    return { user };
  } catch (e) {
    return { error: (e as Error).message as string };
  }
}
