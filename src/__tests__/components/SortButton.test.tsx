import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SortButton } from "../../components/SortButton/SortButton";

jest.mock("../../hooks/useClickedOutside", () => ({
  useClickedOutside: jest.fn(),
}));

describe("SortButton Component", () => {
  const mockCallback = jest.fn();
  const childrenConfig = [
    { name: "Episode", value: "episode_id" },
    { name: "Year", value: "year" },
  ];

  const defaultProps = {
    title: "Sort by...",
    childrenConfig,
    cb: mockCallback,
  };

  const useClickedOutside = require("../../hooks/useClickedOutside").useClickedOutside;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SortButton with default title", () => {
    render(<SortButton {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it("toggles dropdown visibility when button is clicked", () => {
    render(<SortButton {...defaultProps} />);

    expect(screen.queryByText("Episode")).not.toBeInTheDocument();
    expect(screen.queryByText("Year")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(defaultProps.title));

    expect(screen.getByText("Episode")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();

    fireEvent.click(screen.getByText(defaultProps.title));
    expect(screen.queryByText("Episode")).not.toBeInTheDocument();
    expect(screen.queryByText("Year")).not.toBeInTheDocument();
  });

  it("calls callback with correct value when dropdown option is clicked", () => {
    render(<SortButton {...defaultProps} />);

    fireEvent.click(screen.getByText(defaultProps.title));

    fireEvent.click(screen.getByText("Episode"));

    expect(mockCallback).toHaveBeenCalledWith("episode_id");

    expect(screen.queryByText("Episode")).not.toBeInTheDocument();
  });
});
