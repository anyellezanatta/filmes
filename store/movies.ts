import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {fetchUpcomingMovies} from '../api/movies';
import {Movie} from '../api/types/movie';
import {RootState} from './store';

// type MovieSliceState = EntityState<Movie> & {
//   loading: boolean;
//   error: string;
// };

export const loadUpcomingMovies = createAsyncThunk<Movie[], number, {}>(
  'movies/loadUpcomingMovies',
  async page => {
    return await fetchUpcomingMovies(page);
  },
);

const moviesAdapter = createEntityAdapter<Movie>({
  selectId: movie => movie.id,
  sortComparer: (a, b) => b.popularity - a.popularity,
});

export const setSelectedMovie = createAction<number>('movies/setSelectedMovie');

//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
type MovieSliceState = {
  loading: boolean;
  error: string;
  selectedMovieId: number;
};

const movieSlice = createSlice({
  name: 'movies',
  initialState: moviesAdapter.getInitialState<MovieSliceState>({
    loading: false,
    error: '',
    selectedMovieId: 0,
  }),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUpcomingMovies.pending, state => {
        state.loading = true;
      })
      .addCase(loadUpcomingMovies.fulfilled, (state, action) => {
        moviesAdapter.addMany(state, action.payload);
        state.loading = false;
      })
      .addCase(setSelectedMovie, (state, action) => {
        state.selectedMovieId = action.payload;
      });
  },
});

export const movieReducer = movieSlice.reducer;

export const {
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectTotalMovies,
} = moviesAdapter.getSelectors((state: RootState) => state.movies);

export const selectLoadingMoviesError = (state: RootState) =>
  state.movies.error;

export const getSelectedMovie = (state: RootState) =>
  state.movies.entities[state.movies.selectedMovieId];
