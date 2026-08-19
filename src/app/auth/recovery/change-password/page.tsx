"use client";

import { ChangePasswordAction } from "@/app/actions/user/ChangePassword.action";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PasswordValidation } from "@/features/auth/signup/PasswordValidationInput";
import { useSearchParams } from "next/navigation";
import { Button } from "radix-ui/toolbar";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const params = useSearchParams();
  const [state, formAction] = useActionState(ChangePasswordAction, {});
  const [hasError, setHasError] = useState<boolean>(false);
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    } else {
    }
  }, [state]);

  const handleFormData = async (formData: FormData) => {
    if (hasError) return;
    const token = params.get("token");
    if (!token) return;
    formData.append("token", token as string);
    formAction(formData);
  };
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <form action={handleFormData}>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Change Password</h1>
          </CardHeader>
          <CardContent className="py-4">
            <PasswordValidation hasError={setHasError} />
          </CardContent>
          <CardFooter>
            <SubmitButton text="Change Password" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
