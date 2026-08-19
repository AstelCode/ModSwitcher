"use server";

import { UserIsLoggedAction } from "@/app/actions/user/UserIsLogged.action";
import { ROUTES } from "@/constants/routes";
import LogInForm from "@/features/auth/login/LogInForm";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const { isLogged } = await UserIsLoggedAction();
  if (isLogged) return redirect(ROUTES.EXPLORER);
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <LogInForm />
    </div>
  );
}
