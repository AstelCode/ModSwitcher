"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SuperadminActivationForm() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-blod text-center">Activation</h1>
        </CardHeader>
        <form>
          <CardContent>
            <Input placeholder="token" />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
