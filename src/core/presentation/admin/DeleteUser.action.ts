"use server";
import { GetSessionUseCase } from "@/core/application/use-cases/user/auth/session/GetSession.usecase";
import { DeleteUserByAdminUseCase } from "@/core/application/use-cases/user/profile/delete/DeleteUserBySuperuser.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { revalidateTag } from "next/cache";
import { refresh } from "next/cache";

export const deleteUserAction = async (id: string) => {
  const getSessionUseCase = new GetSessionUseCase(serviceContext);
  const deleteUserBySuperuserUseCase = new DeleteUserByAdminUseCase(
    serviceContext,
  );
  try {
    const { userId } = await getSessionUseCase.execute();
    await deleteUserBySuperuserUseCase.execute(userId, id);
  } catch (error) {
    console.error(error);
  }
  revalidateTag("user:" + id, "max");
  refresh();
};
