"use server";

import { SignUpForm } from "@/features/auth/signup/SignupForm";

export default async function RegisterPage() {
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
