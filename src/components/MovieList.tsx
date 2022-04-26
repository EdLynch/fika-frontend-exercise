import React from 'react';
import MovieRow from './MovieRow';
import { Movie } from '../types';

type Props = {
  movies?: Movie[];
  isLoading: boolean;
  setActiveMovie: (id: number) => void;
};

export default function MovieList({
  movies,
  isLoading,
  setActiveMovie,
}: Props) {
  const Message = () =>
    isLoading ? <div>Loading...</div> : <div>No movies found</div>;

  return (
    <div className='w-full flex flex-col items-center min-h-[600px] my-4'>
      {isLoading || !movies?.length ? (
        <Message />
      ) : (
        <div className='w-full flex flex-wrap gap-6 justify-center'>
          {movies.map((movie) => (
            <MovieRow
              key={movie.id}
              {...movie}
              setActiveMovie={setActiveMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}
