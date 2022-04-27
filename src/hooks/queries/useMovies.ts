import { getMovies } from '../../api/getMovies';
import { useQuery } from 'react-query';

export const useMovies = (page: number, genres: number[], enabled: boolean) => {
  const { data: allMovieData, isLoading: allLoading } = useQuery(
    ['movies', page, ...genres],
    () => getMovies(page, genres),
    {
      enabled,
    }
  );
  return {allMovieData, allLoading}
};
