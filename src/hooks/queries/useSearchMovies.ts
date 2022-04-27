import { useQuery } from 'react-query';
import { searchMovies } from '../../api/searchMovies';

export const useSearchMovies = (
  page: number,
  searchTerm: string,
  enabled: boolean
) => {
  const { data: searchMoveData, isLoading: searchLoading } = useQuery(
    ['movieSearch', page, searchTerm],
    () => searchMovies(page, searchTerm),
    {
      enabled,
    }
  );
  return { searchMoveData, searchLoading };
};
