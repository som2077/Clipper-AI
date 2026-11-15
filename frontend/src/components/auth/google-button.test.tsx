import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { GoogleButton } from "./google-button";
import { signIn } from "@/lib/auth-client";

vi.mock("@/lib/auth-client", () => ({
  signIn: {
    social: vi.fn(),
  },
}));

const originalLocation = window.location;

describe("GoogleButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "" },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  it("renders the Google sign-in button with label and icon", () => {
    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "false");
  });

  it("calls signIn.social with provider 'google' and callbackURL when clicked", async () => {
    vi.mocked(signIn.social).mockResolvedValue({} as never);
    const user = userEvent.setup();

    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(signIn.social).toHaveBeenCalledTimes(1);
    expect(signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "/",
    });
  });

  it("uses postAuthPath with window.location.search for callbackURL", async () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?next=/tasks" },
      writable: true,
      configurable: true,
    });
    vi.mocked(signIn.social).mockResolvedValue({} as never);
    const user = userEvent.setup();

    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "/tasks",
    });
  });

  it("falls back to root '/' when search contains an unsafe redirect", async () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?next=https://malicious.com" },
      writable: true,
      configurable: true,
    });
    vi.mocked(signIn.social).mockResolvedValue({} as never);
    const user = userEvent.setup();

    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "/",
    });
  });

  it("shows loading state while sign in is pending", async () => {
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(signIn.social).mockReturnValue(pendingPromise as never);
    const user = userEvent.setup();

    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();

    resolvePromise!({});
    await waitFor(() => {
      expect(signIn.social).toHaveBeenCalled();
    });
  });

  it("displays error message and calls onError when signIn.social returns an error", async () => {
    vi.mocked(signIn.social).mockResolvedValue({
      error: { message: "Google account sign-in was cancelled" },
    } as never);
    const onError = vi.fn();
    const user = userEvent.setup();

    render(<GoogleButton onError={onError} />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Google account sign-in was cancelled",
    );
    expect(onError).toHaveBeenCalledWith("Google account sign-in was cancelled");
    expect(button).toHaveAttribute("aria-busy", "false");
    expect(button).not.toBeDisabled();
  });

  it("falls back to default error message when response.error message is missing", async () => {
    vi.mocked(signIn.social).mockResolvedValue({
      error: {},
    } as never);
    const onError = vi.fn();
    const user = userEvent.setup();

    render(<GoogleButton onError={onError} />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to sign in");
    expect(onError).toHaveBeenCalledWith("Failed to sign in");
    expect(button).toHaveAttribute("aria-busy", "false");
  });

  it("displays error and calls onError when signIn.social throws an exception", async () => {
    vi.mocked(signIn.social).mockRejectedValue(new Error("Network connection lost"));
    const onError = vi.fn();
    const user = userEvent.setup();

    render(<GoogleButton onError={onError} />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(await screen.findByRole("alert")).toHaveTextContent("Network connection lost");
    expect(onError).toHaveBeenCalledWith("Network connection lost");
    expect(button).toHaveAttribute("aria-busy", "false");
    expect(button).not.toBeDisabled();
  });

  it("respects the disabled prop", async () => {
    const user = userEvent.setup();

    render(<GoogleButton disabled />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(signIn.social).not.toHaveBeenCalled();
  });

  it("calls custom onClick prop when clicked", async () => {
    vi.mocked(signIn.social).mockResolvedValue({} as never);
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<GoogleButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(signIn.social).toHaveBeenCalledTimes(1);
  });

  it("does not trigger social sign in if onClick prevents default", async () => {
    const onClick = vi.fn((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    });
    const user = userEvent.setup();

    render(<GoogleButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(signIn.social).not.toHaveBeenCalled();
  });
});
