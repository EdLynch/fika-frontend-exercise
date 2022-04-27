import React from 'react';
import { Movie } from '../types';

export default function MovieItem({
  id,
  title,
  poster_path,
  vote_average,
  vote_count,
  setActiveMovie,
}: Movie & {
  setActiveMovie: (id: number) => void;
}) {
  return (
    <div
      className='relative w-32 aspect-[2/3] hover:scale-110 transition-all cursor-pointer rounded-lg overflow-hidden'
      onClick={() => setActiveMovie(id)}
    >
      <img
        src={`${process.env.REACT_APP_BASE_IMG_PATH}${poster_path}`}
        className='absolute top-0 left-0 w-full h-full z-10'
        alt={title}
      />
      <span className='absolute rounded-tl-lg right-0 bottom-0 p-1 bg-white z-20'>
        {vote_count > 0 ? `${vote_average}/10` : 'TBD'}
      </span>
    </div>
  );
}
