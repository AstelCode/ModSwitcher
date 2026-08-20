"use client";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { ROUTES } from "@/lib/constants/routes";
import { LogInAction, SignInActionState } from "@/core/presentation/user";

const initialState: SignInActionState = {};

export default function LogInForm() {
  const [state, formAction] = useActionState(LogInAction, initialState);
  const [email, setEmail] = useState("");

  return (
    <form className="flex flex-col w-full max-w-sm" action={formAction}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
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
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="Email"
                name="user"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <PasswordInput />
              <FieldDescription>
                <span>¿Forgot your password?&nbsp;</span>
                <Link href={ROUTES.AUTH_PASSWORD_RECOVERY}>Click Here</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Field>
            <SubmitButton text="Login" />
            <FieldDescription>
              <span>Don&apos;t have an account? &nbsp;</span>
              <Link href={ROUTES.AUTH_SIGNUP}>Register</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
