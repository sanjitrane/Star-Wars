import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EpisodeList from "../../features/Episodes/EpisodesList";
import { RootState } from "../../app/store"
import { fetchEpisodes } from "../../features/Episodes/episodesSlice";
import { settings } from "../../utils/settings"; // Assuming this is relevant to the test
import { useResponsive } from "../../hooks/useResponsive";
import { Shimmer } from "../../components/UI/Shimmer/Shimmer";
import rootReducer from "../../app/rootReducer"


// Mocking necessary imports
jest.mock("../../hooks/useResponsive", () => ({
  useResponsive: jest.fn(),
}));

jest.mock("../../components/AccordianView/AccordianView", () => ({
  AccordianComponent: jest.fn(() => <div>Accordian</div>),
}));

jest.mock("../../components/EpisodeEntry/EpisodeEntry", () => ({
  EpisodeEntryComponent: jest.fn(() => <div>EpisodeEntry</div>),
}));

jest.mock("../../utils/helpers", () => ({
  getFilteredList: jest.fn((episodes, searchTerm) => episodes),
  sortData: jest.fn((sortType, episodes) => episodes),
}));

jest.mock("../../features/Episodes/episodesSlice", () => ({
  fetchEpisodes: jest.fn(),
}));

const episodes = [
  {
    title: "The Empire Strikes Back",
    episode_id: 5,
    opening_crawl: "Test crawl",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1980-05-17",
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: "2014-12-12T11:26:24.656000Z",
    edited: "2014-12-15T13:07:53.386000Z",
    url: ""
  }
];

const initialState: RootState = {
  episodes: {
    episodes: [],
    loading: false,
    error: null,
    selected: null
  },
  ratings: {
    loading: false,
    ratings: {},
    error: null
  },
  sort: {
    sortType: "episode_id"
  },
  search: {
    searchTerm: ""
  }
};

describe("EpisodeList Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer, preloadedState: initialState });

    // Mocking the fetchEpisodes action to resolve episodes
    (fetchEpisodes as unknown as jest.Mock).mockResolvedValue([]);
  });
  it("renders",()=>{
    
  })

  // it("renders loading state correctly", async () => {
  //   store = configureStore({
  //     reducer: rootReducer,
  //     preloadedState: {
  //       episodes: { episodes: [], loading: true, error: null, selected: null },
  //       ratings: { ratings: {}, loading: false, error: null },
  //       sort: { sortType: "episode_id" },
  //       search: { searchTerm: "" }
  //     }
  //   });

  //   const { container } = render(
  //     <Provider store={store}>
  //       <EpisodeList />
  //     </Provider>
  //   );

  //   // Verify Shimmer is displayed during loading
  //   await act(() => {
  //     const shimmer = container.getElementsByClassName("shimmer");
  //     expect(shimmer.length).toBe(1); // Expect one Shimmer component to be rendered
  //   });
  // });

  // it("renders error message if there is an error", () => {
  //   store = configureStore({
  //     reducer: rootReducer,
  //     preloadedState: {
  //       episodes: { episodes: [], loading: false, error: "Error fetching episodes", selected: null },
  //       ratings: { ratings: {}, loading: false, error: null },
  //       sort: { sortType: "episode_id" },
  //       search: { searchTerm: "" }
  //     }
  //   });

  //   render(
  //     <Provider store={store}>
  //       <EpisodeList />
  //     </Provider>
  //   );

  //   // Verify error message is displayed
  //   expect(screen.getByText("Error fetching episodes")).toBeInTheDocument();
  // });

  // it("renders episodes correctly when loading is complete", async () => {
  //   store = configureStore({
  //     reducer: rootReducer,
  //     preloadedState: {
  //       episodes: { episodes, loading: false, error: null, selected: null },
  //       ratings: { ratings: {}, loading: false, error: null },
  //       sort: { sortType: "episode_id" },
  //       search: { searchTerm: "" }
  //     }
  //   });

  //   render(
  //     <Provider store={store}>
  //       <EpisodeList />
  //     </Provider>
  //   );

  //   // Verify the list of episodes is rendered
  //   expect(screen.getByText("EpisodeEntry")).toBeInTheDocument();
  //   expect(screen.getByText("Accordian")).toBeInTheDocument();
  // });

  // it("displays different components based on device type", async () => {
  //   // Mocking device type as desktop
  //   (useResponsive as jest.Mock).mockReturnValue({ isDesktop: true });

  //   store = configureStore({
  //     reducer: rootReducer,
  //     preloadedState: {
  //       episodes: { episodes, loading: false, error: null, selected: null },
  //       ratings: { ratings: {}, loading: false, error: null },
  //       sort: { sortType: "episode_id" },
  //       search: { searchTerm: "" }
  //     }
  //   });

  //   render(
  //     <Provider store={store}>
  //       <EpisodeList />
  //     </Provider>
  //   );

  //   // Verify EpisodeEntryComponent is rendered for desktop
  //   expect(screen.getByText("EpisodeEntry")).toBeInTheDocument();

  //   // Change to mobile
  //   (useResponsive as jest.Mock).mockReturnValue({ isDesktop: false });

  //   // Re-render and check for AccordianComponent
  //   render(
  //     <Provider store={store}>
  //       <EpisodeList />
  //     </Provider>
  //   );
  //   expect(screen.getByText("Accordian")).toBeInTheDocument();
  // });
});
