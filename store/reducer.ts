import {combineReducers} from '@reduxjs/toolkit';
import {movieReducer} from './movies';

export const reducer = combineReducers({
  movies: movieReducer,
});
