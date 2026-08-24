import { SignUpForm } from "@/features/auth/signup/SignupForm";

export const instant = false;
export default async function RegisterPage() {
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
