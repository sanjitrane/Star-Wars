import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Accordion from '../../components/AccordianView/AccordianView';
import { RootState } from '../../app/store';
import rootReducer from '../../app/rootReducer';
import { selectEpisode } from '../../features/Episodes/episodesSlice';


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
    sortType: 'title',
  },
  search: {
    searchTerm: '',
  },
};



  describe('Accordian Component', ()=>{
    let store:ReturnType<typeof configureStore>
    beforeEach(()=>{
      store = configureStore({reducer:rootReducer, preloadedState: initialState});
    })
    it('renders the EpisodeEntry component', async() => {
      render(
        <Provider store={store}>
          <Accordion episode={episode} />
        </Provider>
      );
  
      await act(async()=>{
        const episodeEntryElement = screen.getByText('The Empire Strikes Back');
        expect(episodeEntryElement).toBeInTheDocument();
      })
    });

    it('does not show DetailView component when no episode is selected', async() => {
      render(
        <Provider store={store}>
          <Accordion episode={episode} />
        </Provider>
      );
      await act(async()=>{
      const detailViewElement = screen.queryByText('Test crawl'); 
      expect(detailViewElement).not.toBeInTheDocument();
      });
    });

    it('shows DetailView when the episode is selected', async()=>{
      store.dispatch(selectEpisode(episode.episode_id));
      render(
        <Provider store={store}>
          <Accordion episode={episode} />
        </Provider>
      );
      await act(async()=>{
        const detailViewElement = screen.getByText('Test crawl'); 
        expect(detailViewElement).toBeInTheDocument();
      })
    })
  })