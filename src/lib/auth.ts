export function validatePassword(password: string): number {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 25;

  // Contains number
  if (/\d/.test(password)) strength += 25;

  // Contains lowercase letter
  if (/[a-z]/.test(password)) strength += 25;

  // Contains uppercase letter
  if (/[A-Z]/.test(password)) strength += 25;

  return strength;
}