export interface Episode{
  title: string,
  episode_id: number,
  opening_crawl: string,
  director:string,
  producer: string,
  release_date: string,
  characters:string[],
  planets:string[],
  starships:string[],
  vehicles:string[],
  species:string[],
  created:string,
  edited:string,
  url:string,
}

type Rating = {
Source:string,
Value: string,
}

export type MovieTitle = string

export interface OMDBResponse{
  Title: MovieTitle,
  Year: string,
  Poster:string,
  Ratings: Rating[] | [],
  imdbRating:string,
  episodeId: number,
}

export interface EpisodeDetail extends Episode{
  poster:string,
  ratings: Rating[],
  imdbRating:string,
}