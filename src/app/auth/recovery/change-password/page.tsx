"use server";

import { ForgotPasswordForm } from "@/features/auth/recovery/ForgotPasswordForm";
import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";
interface ChangePasswordPageProps {
  searchParams: Promise<{
    token: string;
  }>;
}
export default async function ChangePasswordPage({
  searchParams,
}: ChangePasswordPageProps) {
  const params = await searchParams;
  if (!params.token) redirect(ROUTES.AUTH_LOGIN);
  return <ForgotPasswordForm token={params.token} />;
}
