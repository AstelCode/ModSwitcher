"use client";
import {
  RegisterUserAction,
  RegisterUserActionState,
} from "@/app/actions/RegisterUser.action";
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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useActionState, useState } from "react";

export function PasswordStrengthIndicator({ strength }: { strength: number }) {
  let color = "";
  if (strength < 20) {
    color = "[&>div]:bg-red-500";
  } else if (strength < 40) {
    color = "[&>div]:bg-orange-500";
  } else if (strength < 60) {
    color = "[&>div]:bg-yellow-500";
  } else if (strength < 80) {
    color = "[&>div]:bg-green-400";
  } else {
    color = "[&>div]:bg-green-600";
  }
  return (
    <div className="flex w-full items-center gap-4 h-[12px]">
      <Progress value={strength} className={color} />
    </div>
  );
}

function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;

  // ─────────────────────────────
  // Longitud
  // ─────────────────────────────
  if (password.length >= 8) score += 20;
  if (password.length >= 10) score += 20;
  if (password.length >= 12) score += 20;

  // ─────────────────────────────
  // Tipos de caracteres
  // ─────────────────────────────
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const types = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  if (types === 0) score += 10;
  if (types === 1) score += 10;
  if (types >= 2) score += 10;
  if (types >= 3) score += 20;
  if (types === 4) score += 10;
  console.log(score);
  // ─────────────────────────────
  // Penalizaciones
  // ─────────────────────────────

  // Solo números
  if (/^\d+$/.test(password) && password.length >= 3) {
    score -= 20;
  }

  // Solo letras
  if (/^[a-zA-Z]+$/.test(password) && password.length >= 3) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

export function PasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.target.value.replace(/ /g, "");
    const value = e.target.value;
    setStrength(getPasswordStrength(value));

    setPassword(value);
  };
  console.log(strength);
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <FieldSet>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input
          type="text"
          placeholder="Password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <PasswordStrengthIndicator strength={strength} />
      </Field>
      <Field>
        <FieldLabel>Confirm Password</FieldLabel>
        <Input
          type="text"
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
          required
        />
        {password !== confirmPassword && (
          <FieldDescription className="text-red-500">
            Passwords do not match
          </FieldDescription>
        )}
      </Field>
    </FieldSet>
  );
}

const initialState: RegisterUserActionState = {};
export function RegisterForm() {
  const [state, formAction] = useActionState(RegisterUserAction, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

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
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="Email" name="email" required />
            </Field>
            <PasswordValidation />
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
