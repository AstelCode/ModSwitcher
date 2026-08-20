"use server";
import SendRecoveryTokenForm from "@/features/auth/recovery/SendRecoveryToken";

export default async function PasswordRecoveryPage() {
  return <SendRecoveryTokenForm />;
}
