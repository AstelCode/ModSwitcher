"use server";
import { RegisterUserAction } from "@/app/actions/RegisterUser.action";

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
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <form
        className="flex flex-col w-full max-w-sm"
        action={RegisterUserAction}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Register</h1>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Nickname</FieldLabel>
                <Input type="text" placeholder="Nickname" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="Email" />
              </Field>
              <FieldSeparator />
              <FieldSet>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" placeholder="Password" />
                </Field>
                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input type="password" placeholder="Confirm Password" />
                </Field>
              </FieldSet>
              <FieldSeparator />
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
    </div>
  );
}
