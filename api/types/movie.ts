export type Movie = {
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  poster_path?: string;
  overview: string;
  vote_average: number;
};

export type MoviePage = {
  page: number;
  results: Movie[];
};
