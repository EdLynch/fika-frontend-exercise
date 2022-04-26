import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { useQuery } from 'react-query';
import { getMovies } from './api/getMovies';
import { searchMovies } from './api/searchMovies';
import Pagination from './components/Pagination';
import useDebounce from './hooks/useDebounce';
import Filters from './components/Filters';
import ActiveMovieModal from './components/ActiveMovieModal';

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [genres, setGenres] = useState<number[]>([]);
  const [activeMovie, setActiveMovie] = useState<number | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 250);
  const { data: allMovieData, isLoading: allLoading } = useQuery(
    ['movies', page, ...genres],
    () => getMovies(page, genres),
    {
      enabled: searchTerm.length === 0,
    }
  );
  const { data: searchMoveData, isLoading: searchLoading } = useQuery(
    ['movieSearch', page, debouncedSearch],
    () => searchMovies(page, debouncedSearch),
    {
      enabled: searchTerm.length > 0,
    }
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage]);

  let data = allMovieData;
  let isLoading = allLoading;

  if (debouncedSearch.length > 0) {
    data = searchMoveData;
    isLoading = searchLoading;
  }

  useEffect(() => {
    if (data?.total_pages) {
      setPageCount(data?.total_pages);
    }
  }, [data?.total_pages]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-5xl mt-3'>Fika Search</h1>
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genres={genres}
        setGenres={setGenres}
      />
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        setActiveMovie={setActiveMovie}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.min(pageCount || 0, 500)}
      />
      <ActiveMovieModal
        activeMovie={data?.results.find(({ id }) => id === activeMovie)}
        close={() => setActiveMovie(null)}
      />
    </div>
  );
}

export default App;
