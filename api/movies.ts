import apiClient from './apiClient';
import {MoviePage} from './types/movie';

export const fetchUpcomingMovies = async (page: number) => {
  console.log('page = ' + page);
  const response = await apiClient.get<MoviePage>(
    `/movie/upcoming?page=${page}&language=en-US`,
  );
  return response.data.results;
};
