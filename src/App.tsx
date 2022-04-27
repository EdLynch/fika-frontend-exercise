import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import useDebounce from './hooks/useDebounce';
import Filters from './components/Filters';
import ActiveMovieModal from './components/ActiveMovieModal';
import { useMovies } from './hooks/queries/useMovies';
import { useSearchMovies } from './hooks/queries/useSearchMovies';

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [genres, setGenres] = useState<number[]>([]);
  const [activeMovie, setActiveMovie] = useState<number | null>(null);
  // Search is debounced to avoid wasteful requests while typing
  const debouncedSearch = useDebounce(searchTerm, 250);
  const { allMovieData, allLoading } = useMovies(
    page,
    genres,
    searchTerm.length === 0
  );
  const { searchMoveData, searchLoading } = useSearchMovies(
    page,
    debouncedSearch,
    searchTerm.length > 0
  );

  let data = allMovieData;
  let isLoading = allLoading;

  // Will use the search endpoint if there is a search searchTerm, discover endpoint if not
  // Works well with two endpoints but would need to be reconsidered if more are to be added
  if (debouncedSearch.length > 0) {
    data = searchMoveData;
    isLoading = searchLoading;
  }

  // Reset page on filter change
  // Avoid been on an empty page
  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage]);

  // Update pagecount on change
  // Not derived directly to avoid pagination jumping while loading
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
      <ActiveMovieModal
        activeMovie={data?.results.find(({ id }) => id === activeMovie)}
        close={() => setActiveMovie(null)}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.min(pageCount || 0, 500)}
      />
    </div>
  );
}

export default App;
