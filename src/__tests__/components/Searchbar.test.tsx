import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import searchReducer, { assignSearch } from "../../features/Search/searchSlice";
import { settings } from "../../utils/settings";

jest.mock("../../utils/settings", () => ({
  settings: {
    searchIcon: "https://example.com/search-icon.svg",
  },
}));

jest.mock("../../hooks/useDebounce", () => ({
  useDebounce: (fn: Function) => fn, 
}));

describe("SearchBar Component", () => {
  const setupStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        search: searchReducer,
      },
      preloadedState,
    });
  };

  it("renders search icon and input field", () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchIcon = screen.getByAltText("search-icon");
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveAttribute("src", "https://example.com/search-icon.svg");

    const inputElement = screen.getByPlaceholderText("Type to filter...");
    expect(inputElement).toBeInTheDocument();
  });

  it("focuses input when search icon is clicked", () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchIcon = screen.getByAltText("search-icon");
    const inputElement = screen.getByPlaceholderText("Type to filter...");

    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(inputElement);
  });

  it("dispatches assignSearch action when input value changes", () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Type to filter...");

    fireEvent.change(inputElement, { target: { value: "Star Wars" } });

    const actions = store.getState().search.searchTerm;
    expect(actions).toBe("Star Wars");
  });
});
