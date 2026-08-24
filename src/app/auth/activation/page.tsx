import { UserNotFoundError } from "@/core/errors/UserNotFound";
import { UserIsActiveUseCase } from "@/core/application/use-cases/user/auth/activation/UserIsActive.usecase";
import { serviceContext } from "@/core/infrastructure/container";
import { ActivationForm } from "@/features/auth/activation/ActivationForm";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserIsActiveAction } from "@/core/presentation/user/activation/UserIsActive.action";

type ActivationPageProps = {
  searchParams: Promise<{
    token: string;
    secretKey: string;
  }>;
};

export const instant = false;
export default async function ActivationPage({
  searchParams,
}: ActivationPageProps) {
  const params = await searchParams;
  const token = params.token;
  const secretKey = params.secretKey;

  if (!token) return <div>Token not found</div>;
  const { isActive, userNotFound } = await UserIsActiveAction(token);

  if (userNotFound) {
    redirect(ROUTES.AUTH_LOGIN);
  }

  if (isActive) {
    return (
      <div className="flex item-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <span className="text-2xl font-bold text-center">Activation</span>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-5">
            <>
              <p>You are already active</p>
              <Link
                href={ROUTES.EXPLORER}
                className="mt-5 px-4 py-2 rounded-md bg-primary text-white"
              >
                Go to explorer
              </Link>
            </>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ActivationForm token={token} secretKey={secretKey} />;
}
