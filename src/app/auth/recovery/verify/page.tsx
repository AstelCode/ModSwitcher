"use client";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VerifyRecoveryTokenAction } from "@/core/presentation/user/recovery";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ValidateTokenPage() {
  const [state, formAction] = useActionState(VerifyRecoveryTokenAction, {});
  useEffect(() => {
    if (state.error) {
      toast.error(state.error, {
        position: "top-center",
      });
    }
  }, [state]);
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <form action={formAction}>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Validate Token</h1>
          </CardHeader>
          <CardContent className="py-4">
            <Field>
              <Input
                type="password"
                placeholder="Token"
                required
                name="token"
              />
            </Field>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Validate" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
