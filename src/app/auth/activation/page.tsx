import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { UserIsActiveUseCase } from "@/core/application/use-cases/user/auth/activation/UserIsActive.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { ActivationForm } from "@/features/auth/activation/ActivationForm";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

type ActivationPageProps = {
  searchParams: Promise<{
    token: string;
  }>;
};

export const instant = false;
export default async function ActivationPage({
  searchParams,
}: ActivationPageProps) {
  const token = (await searchParams).token;
  if (!token) return <div>Token not found</div>;
  const userAlreadyActive = new UserIsActiveUseCase(serviceContext);
  let active = false;
  try {
    active = await userAlreadyActive.execute(token);
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      redirect(ROUTES.AUTH_LOGIN);
    }
  }

  return <ActivationForm userAlreadyActive={active} token={token} />;
}
