import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { SignIn } from "./sign-in";
import { signIn } from "../../lib/auth-client";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("../../lib/auth-client", () => ({
  signIn: {
    email: vi.fn(),
    social: vi.fn(),
  },
}));

describe("SignIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Google sign in button and email divider", () => {
    render(<SignIn />);

    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByText("or continue with email")).toBeInTheDocument();
  });

  it("calls signIn.social when Google button is clicked", async () => {
    vi.mocked(signIn.social).mockResolvedValue({} as never);
    const user = userEvent.setup();

    render(<SignIn />);

    const googleButton = screen.getByRole("button", { name: /continue with google/i });
    await user.click(googleButton);

    expect(signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "/",
    });
  });

  it("shows an error message when sign in fails", async () => {
    vi.mocked(signIn.email).mockResolvedValue({
      error: { message: "Invalid credentials" },
    } as never);
    const user = userEvent.setup();

    render(<SignIn />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  it("shows a success state after a successful sign in", async () => {
    vi.mocked(signIn.email).mockResolvedValue({ error: null } as never);
    const user = userEvent.setup();

    render(<SignIn />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Signed in successfully!")).toBeInTheDocument();
  });

  it("disables Google button while email sign in is submitting", async () => {
    let resolveSubmit: (val: unknown) => void;
    vi.mocked(signIn.email).mockReturnValue(
      new Promise((resolve) => {
        resolveSubmit = resolve;
      }) as never,
    );
    const user = userEvent.setup();

    render(<SignIn />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    const googleButton = screen.getByRole("button", { name: /continue with google/i });
    expect(googleButton).toBeDisabled();

    resolveSubmit!({ error: null });
    expect(await screen.findByText("Signed in successfully!")).toBeInTheDocument();
  });
});
