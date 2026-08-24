"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ActivateUserAction,
  ResendActivationEmailAction,
} from "@/core/presentation/user";
import { useState } from "react";

type ActivationFormProps = {
  token: string;
  secretKey?: string;
};

export function ActivationForm(props: ActivationFormProps) {
  const token = props.token;
  const secretKey = props.secretKey;

  const [isValidCode, setIsValidCode] = useState<boolean | undefined>();
  const [error, setError] = useState<string>("");

  const handleComplete = async (value: string) => {
    const result = await ActivateUserAction(token, value, secretKey);
    setIsValidCode(result.isValidCode);
    if (result.error) {
      setError(result.error);
    } else {
      setError("");
    }
  };

  const handleResend = async () => {
    await ResendActivationEmailAction(token);
    setIsValidCode(undefined);
    setError("");
  };
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <span className="text-2xl font-bold text-center">Activation</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-5">
          {error && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isValidCode == false && (
            <>
              <p>The code is incorrect </p>
              <Button onClick={handleResend} variant="default">
                Resend
              </Button>
            </>
          )}

          {isValidCode != false && (
            <>
              <p>Please check your email for the activation link</p>
              <InputOTP maxLength={6} onComplete={handleComplete}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
