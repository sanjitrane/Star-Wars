import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Toolbar from "../../components/Toolbar/Toolbar";
import rootReducer from "../../app/rootReducer";
import { assignSort } from "../../features/Sort/sortSlice";
import { RootState } from "../../app/store";

jest.mock("../../utils/settings", () => ({
  settings: {
    sortConfig: [
      { name: "Episode", value: "episode_id" },
      { name: "Year", value: "year" },
    ],
    searchIcon: "search-icon.svg",
    logo: "logo.svg",
  },
}));

describe("Toolbar Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        sort: {
          sortType: "episode_id",
        },
        search: {
          searchTerm: "",
        },
      },
    });
  });

  it("renders the SortButton and SearchBar components", () => {
    render(
      <Provider store={store}>
        <Toolbar />
      </Provider>
    );

    expect(screen.getByText("Sort by...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type to filter...")).toBeInTheDocument();
  });

  it("dispatches assignSort action when a sort option is selected", () => {
    render(
      <Provider store={store}>
        <Toolbar />
      </Provider>
    );

    fireEvent.click(screen.getByText("Sort by..."));

    fireEvent.click(screen.getByText("Year"));

    const state = store.getState() as RootState;
    expect(state.sort.sortType).toBe("year");
  });

  it("renders the current sort type based on Redux state", () => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        sort: {
          sortType: "year",
        },
        search: {
          searchTerm: "",
        },
      },
    });

    render(
      <Provider store={store}>
        <Toolbar />
      </Provider>
    );

    fireEvent.click(screen.getByText("Sort by..."));

    expect(screen.getByText("Episode")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
  });
});
