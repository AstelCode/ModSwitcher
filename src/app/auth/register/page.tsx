"use server";
import { RegisterForm } from "@/components/features/auth/RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <RegisterForm />
    </div>
  );
}
