"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChangePasswordAction } from "@/core/presentation/user";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { PasswordValidation } from "../signup/PasswordValidationInput";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Field } from "@/components/ui/field";

export function ForgotPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(ChangePasswordAction, {});
  const [hasError, setHasError] = useState<boolean>(false);
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);
  const handleFormData = async (formData: FormData) => {
    if (hasError) return;
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
            <Field>
              <Field>New Password</Field>
              <PasswordValidation hasError={setHasError} />
            </Field>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Change Password" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
