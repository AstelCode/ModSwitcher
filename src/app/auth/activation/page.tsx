"use client";
import { ActivationUserAction } from "@/app/actions/ActivationUser.action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSearchParams } from "next/navigation";

export default function ActivationPage() {
  const params = useSearchParams();

  const handleComplete = async (value: string) => {
    const token = params.get("token");
    if (!token) return;
    const result = await ActivationUserAction({}, token, value);
    console.log(result);
  };
  return (
    <div className="flex item-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <span className="text-2xl font-bold text-center">Activation</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-5">
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
        </CardContent>
      </Card>
    </div>
  );
}
