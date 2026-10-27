import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Landing page", () => {
  it("links the header to each section", () => {
    render(<Home />);
    const nav = within(screen.getByTestId("site-header")).getByRole(
      "navigation",
    );
    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/#products", "/#plus", "/#privacy"]);
  });

  it("compares the Free and Copper Plus plans", () => {
    render(<Home />);
    const plans = screen.getByTestId("plus-pricing");
    expect(
      within(plans).getByRole("heading", { level: 3, name: "Free" }),
    ).toBeInTheDocument();
    expect(
      within(plans).getByRole("heading", { level: 3, name: "Copper Plus" }),
    ).toBeInTheDocument();
    expect(plans).toHaveTextContent("Refined answers: Included");
    expect(plans).toHaveTextContent("Refined answers: Not included");
  });

  it("shows the educational footer note", () => {
    render(<Home />);
    expect(screen.getByTestId("site-footer")).toHaveTextContent(
      "Fictional — for educational use.",
    );
  });
});
