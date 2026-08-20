import { UserIsLoggedAction } from "@/core/presentation/user";
import LogInForm from "@/features/auth/login/LogInForm";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";
export const instant = false;
export default async function AuthPage() {
  const { isLogged } = await UserIsLoggedAction();
  if (isLogged) return redirect(ROUTES.EXPLORER);
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <LogInForm />
    </div>
  );
}
