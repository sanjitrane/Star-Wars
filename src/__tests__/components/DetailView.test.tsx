import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DetailView from '../../components/DetailView/DetailView';
import { RootState } from '../../app/store';
import rootReducer from '../../app/rootReducer';
import { selectEpisode } from '../../features/Episodes/episodesSlice';

jest.mock('../../utils/helpers', () => ({
  getRatingObj: jest.fn(),
}));

const episode = {
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

const initialState: RootState = {
  episodes: {
    episodes: [episode],
    selected: null,
    loading: false,
    error: null,
  },
  ratings: {
    loading: false,
    ratings: {},
    error: null
  },
  sort: {
    sortType: 'episode_id',
  },
  search: {
    searchTerm: '',
  },
};

describe.only('DetailView Component', () =>{
  let store:ReturnType<typeof configureStore>
  beforeEach(()=>{
    store = configureStore({reducer:rootReducer, preloadedState: initialState});
  })

  it('renders default information when no episode is selected', () => {
    render(
      <Provider store={store}>
        <DetailView/>
      </Provider>
    );

    expect(screen.getByText('Star Wars')).toBeInTheDocument();
    expect(screen.getByText(/Star Wars is an American epic space opera/)).toBeInTheDocument();
  });

  it('renders detailed information when an episode is selected', async()=>{
      store.dispatch(selectEpisode(episode.episode_id));
      render(<Provider store={store}>
        <DetailView/>
      </Provider>);

    await act(async()=>{
      expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
      expect(screen.getByText('Test crawl')).toBeInTheDocument();
      expect(screen.getByText('Directed by: Irvin Kershner')).toBeInTheDocument();
      expect(screen.getByText('Average rating:')).toBeInTheDocument();
    })


  })
  
})