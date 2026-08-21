import { useState } from "react";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { getPasswordStrength } from "./lib/getPasswordStrength";
import { PasswordSchema } from "./lib/passwordSchema";

export function PasswordValidation({
  hasError,
}: {
  hasError?: (value: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [dataError, setDataError] = useState<string | undefined>(undefined);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.target.value.replace(/ /g, "");
    const value = e.target.value;
    const strength = getPasswordStrength(value);
    const result = PasswordSchema.safeParse(value);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setDataError(message);
      hasError?.(true);
    } else {
      hasError?.(false);
      setDataError(undefined);
    }
    setStrength(strength);
    setPassword(value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (password != confirmPassword) {
    }
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div className="w-fulw-fulll">
        <Input
          className="mb-[-2px]"
          type="text"
          placeholder="Password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <PasswordStrengthIndicator
          className="mt-2 px-[10px] w-full"
          strength={strength}
        />
      </div>
      {dataError && <FieldError>{dataError}</FieldError>}

      <Input
        type="text"
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
        required
      />
      {password !== confirmPassword && (
        <FieldError>Passwords do not match</FieldError>
      )}
    </>
  );
}
