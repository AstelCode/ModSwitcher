import { z } from "zod";
export const PasswordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "Debe contener al menos un símbolo",
  );
