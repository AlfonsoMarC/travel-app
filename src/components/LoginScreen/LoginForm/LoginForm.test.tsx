import userEvent from "@testing-library/user-event";
import { render, screen } from "test-utils";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    const route = "/auth/login";
    render(<LoginForm />, { route });
  });

  test("should render the email and password inputs", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("should require email and password", async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    await user.click(emailInput);
    await user.click(passwordInput);
    await user.click(emailInput);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("should validate wrong email", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(emailInput, "wrong@email");
    await userEvent.click(passwordInput);
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  test("should validate valid email", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(emailInput, "valid@email.com");
    await userEvent.click(passwordInput);
    expect(screen.queryByText("Enter a valid email")).not.toBeInTheDocument();
  });

  test("should render a link to sign up form", () => {
    expect(screen.getByRole("link")).toHaveAttribute("href", "/auth/signup");
  });
});
