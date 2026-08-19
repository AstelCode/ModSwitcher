import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";

export function EmailValidationInput({
  hasError,
}: {
  hasError?: (value: boolean) => void;
}) {
  const [error, setError] = useState<string | undefined>(undefined);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const schema = z.email();
    try {
      schema.parse(email);
      hasError?.(false);
      setError?.(undefined);
    } catch (_) {
      hasError?.(true);
      setError?.("Invalid email");
    }
  };

  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
        onChange={handleEmailChange}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
