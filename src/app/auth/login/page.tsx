"use server";
import SignInForm from "@/components/features/auth/SignInForm";
export default async function AuthPage() {
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <SignInForm />
    </div>
  );
}
