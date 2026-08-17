"use client";
import {
  RegisterUserAction,
  RegisterUserActionState,
} from "@/app/actions/RegisterUser.action";
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
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

enum PasswordStrength {
  Weak,
  Medium,
  Strong,
}

export function PasswordStrengthIndicator(data: {
  strength: PasswordStrength;
}) {
  let text: string = "";
  let value = 0;
  switch (data.strength) {
    case PasswordStrength.Weak:
      text = "Weak";
      value = 33.33;
      break;
    case PasswordStrength.Medium:
      text = "Medium";
      value = 66.66;
      break;
    case PasswordStrength.Strong:
      text = "Strong";
      value = 100;
      break;
  }
  return (
    <div className="flex w-full items-center gap-4">
      <Progress
        value={value}
        className={
          text == "Weak"
            ? "[&>div]:bg-red-500"
            : text == "Medium"
              ? "[&>div]:bg-orange-500"
              : "[&>div]:bg-green-500"
        }
      />
      <span
        className={`${
          text == "Weak"
            ? "text-red-500"
            : text == "Medium"
              ? "text-orange-500"
              : "text-green-500"
        } text-bold bg-card text-base`}
      >
        {text}
      </span>
    </div>
  );
}

const initialState: RegisterUserActionState = {};
export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, formAction, pending] = useActionState(
    RegisterUserAction,
    initialState,
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (password !== confirmPassword) {
      e.preventDefault();
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }
  };

  useEffect(() => {
    if (pending) return;
    if (state.error) {
      toast.error(state.error, {
        position: "top-center",
      });
    }
  }, [pending, state]);

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
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input type="text" placeholder="name" name="name" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="Email" name="email" />
            </Field>
            <FieldSet>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handlePasswordChange}
                />
                <PasswordStrengthIndicator strength={PasswordStrength.Strong} />
              </Field>
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
              </Field>
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" className="w-full">
              Register
            </Button>
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
