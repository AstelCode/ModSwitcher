"use client";
import { SignInAction, SignInActionState } from "@/app/actions/SignIn.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { useActionState, useEffect } from "react";

const initialState: SignInActionState = {};

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(
    SignInAction,
    initialState,
  );

  useEffect(() => {
    if (pending) return;
    if (state.error) {
      toast.error(state.error, {
        position: "top-center",
      });
    }
  }, [pending, state]);

  return (
    <form className="flex flex-col w-full max-w-sm" action={formAction}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="Email" name="user" />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="Password" name="password" />
              <FieldDescription>
                <span>¿Forgot your password?&nbsp;</span>
                <Link href="/auth/password-recovery">Click Here</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" className="w-full">
              Login
            </Button>
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
