import { MovieResponse } from '../types';

export const getMovies = (
  page: number,
  genres: number[]
): Promise<MovieResponse> =>
  fetch(
    `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&page=${page}&include_adult=false${
      genres.length ? `&with_genres=${genres.join(',')}` : ''
    }`
  ).then((res) => res.json());
