"use client";
import { LogInAction, SignInActionState } from "@/app/actions/LogIn.action";
import { Button } from "@/components/ui/button";
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
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/shared/SubmitButton";

const initialState: SignInActionState = {};

function PasswordInput() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative">
      {isOpen ? (
        <Input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Password"
          name="password"
        />
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
        />
      )}
      <div
        onClick={handleClick}
        className="absolute top-1 right-2 cursor-pointer select-none"
      >
        {isOpen ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
}

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(
    LogInAction,
    initialState,
  );

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
              <Input type="email" placeholder="Email" name="user" />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <PasswordInput />
              <FieldDescription>
                <span>¿Forgot your password?&nbsp;</span>
                <Link href="/auth/password-recovery">Click Here</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Field>
            <SubmitButton text="Login" />
            <FieldDescription>
              <span>Don&apos;t have an account? &nbsp;</span>
              <Link href="/auth/register">Register</Link>{" "}
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
