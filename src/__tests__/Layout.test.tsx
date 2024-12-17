import React from "react";
import {render, screen} from "@testing-library/react";
import Layout from "../Layout";
import { Shimmer } from "../components/UI/Shimmer/Shimmer";
import EpisodeList from "../features/Episodes/EpisodesList";
import { useResponsive } from "../hooks/useResponsive";

jest.mock('../hooks/useResponsive',()=>({
  useResponsive:jest.fn()
}));

jest.mock('../components/DetailView/DetailView',()=>()=>(
  <div data-testid = "detail-view">Detail View Component</div>
));

jest.mock('../components/UI/Shimmer/Shimmer', ()=>({
  Shimmer: ()=><div data-testid="shimmer">Loading...</div>
}));

jest.mock('../features/Episodes/EpisodesList',()=>()=>(
  <div data-testid="episode-list">Episode List Component</div>
));

describe("Layout Component", ()=>{
  it('renders EpisodeList component', ()=>{
    (useResponsive as jest.Mock).mockReturnValue({
      isTablet:false,
      isDesktop: false
    });
    render(<Layout/>);
    const episodeList = screen.getByTestId("episode-list");
    expect(episodeList).toBeInTheDocument();
    expect(episodeList).toHaveTextContent('Episode List Component')
  });

  it('renders DetailView when isDesktop is true', async()=>{
    (useResponsive as jest.Mock).mockReturnValue({
      isTablet: false,
      isDesktop: true
    });
    render(<Layout/>);
    const shimmer = screen.getByTestId('shimmer');
    expect(shimmer).toBeInTheDocument();

    const detailView = await screen.findByTestId('detail-view');
    expect(detailView).toBeInTheDocument();
    expect(detailView).toHaveTextContent("Detail View Component");
  });

  it('does not renders DetailView when isDesktop is false', async()=>{
    (useResponsive as jest.Mock).mockReturnValue({
      isTablet: true,
      isDesktop: false
    });
    render(<Layout/>);

    const detailView = screen.queryByTestId('detail-view');
    expect(detailView).not.toBeInTheDocument();

    const shimmer = screen.queryByTestId('shimmer');
    expect(shimmer).not.toBeInTheDocument();

    const episodeList = screen.getByTestId('episode-list');
    expect(episodeList).toBeInTheDocument();
  })
})