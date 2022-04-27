import React from 'react';
import MovieRow from './MovieItem';
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
    isLoading ? (
      <div className='flex items-center justify-center w-16 h-16 mt-10 relative'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-16 w-16 bg-sky-500'></span>
      </div>
    ) : (
      <div className='text-4xl mt-8 text-slate-500'>No movies found</div>
    );

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
