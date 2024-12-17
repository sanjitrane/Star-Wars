import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header/Header";

jest.mock("../../utils/settings", () => ({
  settings: {
    logo: "https://example.com/star-wars-logo.svg",
  },
}));

describe("Header Component", () => {
  it("renders the header with the logo", () => {
    render(<Header />);

    const headerElement = screen.getByRole("img", { name: "star-wars-logo" });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute("src", "https://example.com/star-wars-logo.svg");
    expect(headerElement).toHaveAttribute("alt", "star-wars-logo");
  });
});
