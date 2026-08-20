"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendRecoveryEmailAction } from "@/core/presentation/user";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function SendRecoveryTokenForm() {
  const [state, formAction] = useActionState(SendRecoveryEmailAction, {});

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
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Password Recovery</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-5">
          <p>Enter your email to recover your password</p>
          <form action={formAction} className="w-full flex flex-col gap-4">
            <Input type="email" placeholder="Email" name="email" required />
            <Button type="submit">Recover</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
