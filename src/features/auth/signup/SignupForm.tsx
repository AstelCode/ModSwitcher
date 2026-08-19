"use client";
import {
  RegisterUserAction,
  RegisterUserActionState,
} from "@/app/actions/user/RegisterUser.action";
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
import { useActionState, useState } from "react";
import { PasswordValidation } from "./PasswordValidationInput";
import { EmailValidationInput } from "./EmailValidationInput";
const initialState: RegisterUserActionState = {};

export function SignUpForm() {
  const [state, formAction] = useActionState(RegisterUserAction, initialState);
  const [hasErrorPassword, setHasErrorPassword] = useState<boolean>(false);
  const [hasErrorEmail, setHasErrorEmail] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (hasErrorPassword || hasErrorEmail) {
      e.preventDefault();
      return;
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-sm"
      onSubmit={handleSubmit}
      action={formAction}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Register</h1>
        </CardHeader>
        {state.error && (
          <Alert variant="destructive" className="max-w-[95%] mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
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
              <Link href="/auth/login">Login</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
