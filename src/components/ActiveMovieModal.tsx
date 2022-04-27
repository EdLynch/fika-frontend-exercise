import React from 'react';
import { Movie } from '../types';
import { useQuery } from 'react-query';
import { getGenres } from '../api/getGenres';

type Props = {
  activeMovie?: Movie;
  close: () => void;
};

export default function ActiveMovieModal({ activeMovie, close }: Props) {
  const { data } = useQuery('genres', getGenres);

  let genres = data?.genres || [];
  if (activeMovie === null || activeMovie === undefined) return null;
  const { title, poster_path, vote_average, overview, genre_ids } = activeMovie;

  // Avoid empty element issues if a genere gets removed or can't find id
  const movieGenres = genre_ids
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter((genre) => genre !== undefined);

  return (
    <div className='flex items-center justify-center fixed top-0 left-0 w-[100vw] h-[100vh] z-50'>
      <div className='relative flex flex-col gap-4 items-center z-30 bg-white p-8 mx-12 rounded-xl max-w-xl max-h-[90%] overflow-scroll'>
        <h1 className='text-xl'>{title}</h1>
        {genres && <div>{movieGenres.join(', ')}</div>}
        <img
          src={`${process.env.REACT_APP_BASE_IMG_PATH}${poster_path}`}
          className='top-0 left-0 w-52 z-10'
          alt={title}
        />
        <span className='=rounded-tl-lg right-0 bottom-0 p-2 text-xl bg-white z-20'>
          {vote_average ? `${vote_average}/10` : 'TBD'}
        </span>
        <p>{overview}</p>
        <button className='absolute top-4 right-4 text-2xl' onClick={close}>
          x
        </button>
      </div>
      <div
        className='absolute top-0 left-0 w-full h-full bg-slate-100 opacity-50'
        onClick={close}
      ></div>
    </div>
  );
}
