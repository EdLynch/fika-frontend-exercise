import { MovieResponse } from '../types';

export const searchMovies = (
  page: number,
  searchTerm: string
): Promise<MovieResponse> =>
  fetch(
    `${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchTerm}`
  ).then((res) => res.json());
