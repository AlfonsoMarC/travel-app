import { getPasswordStrength, PasswordStrength } from "./SignUpForm";

describe("SignUpForm", () => {
  test("should measure password strength", () => {
    expect(getPasswordStrength("abc")).toBe(PasswordStrength.WEAK);
    expect(getPasswordStrength("Abcdef")).toBe(PasswordStrength.MEDIUM);
    expect(getPasswordStrength("Abcdef1_")).toBe(PasswordStrength.STRONG);
    expect(getPasswordStrength("")).toBe(PasswordStrength.EMPTY);
  });
});
