import userEvent from "@testing-library/user-event";
import { render, screen } from "test-utils";
import SignUpForm from "./SignUpForm";
import { getPasswordStrength, PasswordStrength } from "./SignUpForm";

describe("SignUpForm", () => {
  beforeEach(() => {
    const route = "/auth/signup";
    render(<SignUpForm />, { route });
  });

  test("should measure password strength", () => {
    expect(getPasswordStrength("abc")).toBe(PasswordStrength.WEAK);
    expect(getPasswordStrength("Abcdef")).toBe(PasswordStrength.MEDIUM);
    expect(getPasswordStrength("Abcdef1_")).toBe(PasswordStrength.STRONG);
    expect(getPasswordStrength("")).toBe(PasswordStrength.EMPTY);
  });

  test("should render email, username, password and repeat password input", () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repeat password")).toBeInTheDocument();
  });

  test("should show password info tooltip", async () => {
    const user = userEvent.setup();
    await user.hover(screen.getByText("info"));
    const infoTooltip = document.querySelector("#password1-info");
    expect(infoTooltip).toHaveStyle("visibility: visible");
  });

  test("should show unsafe password icon", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Password"), "abc");
    expect(screen.getByText("cancel")).toHaveStyle("color: red");
  });

  test("should show medium strength icon", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Password"), "Abcdef");
    expect(screen.getByText("check_circle")).toHaveStyle("color: orange");
  });

  test("should show high strength icon", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Password"), "Abcdef1_");
    expect(screen.getByText("check_circle")).toHaveStyle("color: green");
  });

  test("should render a link to login form", () => {
    expect(screen.getByRole("link")).toHaveAttribute("href", "/auth/login");
  });
});
