export function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 10;
  if (password.length >= 10) score += 10;
  if (password.length >= 12) score += 10;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const types = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;
  if (types >= 0) score += 2;
  if (types >= 1) score += 2;
  if (types >= 2) score += 12;
  if (types >= 3) score += 14;
  if (types >= 4) score += 20;
  if (!/^\d+$/.test(password) && !/^[a-zA-Z]+$/.test(password)) {
    score += 20;
  }
  return Math.max(0, Math.min(100, score));
}
