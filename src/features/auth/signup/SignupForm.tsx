"use client";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { PasswordValidation } from "./PasswordValidationInput";
import { EmailValidationInput } from "./EmailValidationInput";
import { RegisterUserAction } from "@/core/presentation/user";
import { ROUTES } from "@/lib/constants/routes";

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasErrorPassword, setHasErrorPassword] = useState<boolean>(false);
  const [hasErrorEmail, setHasErrorEmail] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (hasErrorPassword || hasErrorEmail) {
      e.preventDefault();
      return;
    }
  };
  const handleAction = async (formData: FormData) => {
    const result = await RegisterUserAction(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setError(undefined);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-sm"
      onSubmit={handleSubmit}
      action={handleAction}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Register</h1>
        </CardHeader>
        {error && (
          <Alert variant="destructive" className="max-w-[95%] mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input type="text" placeholder="name" name="name" required />
            </Field>
            <EmailValidationInput hasError={setHasErrorEmail} />
            <PasswordValidation hasError={setHasErrorPassword} />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field>
            <SubmitButton text="Register" />
            <FieldDescription>
              Already have an account? &nbsp;
              <Link href={ROUTES.AUTH_LOGIN}>Login</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
