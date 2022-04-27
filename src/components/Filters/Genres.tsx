import React from 'react';
import { useQuery } from 'react-query';
import { getGenres } from '../../api/getGenres';

type Props = {
  genres: number[];
  setGenres: (genres: number[]) => void;
};

export default function Genres({ genres, setGenres }: Props) {
  const { data } = useQuery('genres', getGenres);
  if (!data) return null;

  const toggle = (id: number) => {
    if (genres.includes(id)) {
      setGenres(genres.filter((genreId) => genreId !== id));
    } else {
      setGenres([...genres, id]);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-wrap max-w-xl justify-around'>
        {data.genres.map(({ id, name }) => (
          <div key={id} className='flex gap-1 items-center mx-2'>
            <input
              type='checkbox'
              id={name}
              name={name}
              checked={genres.includes(id)}
              onChange={() => toggle(id)}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
      </div>
      <button onClick={() => setGenres([])}>Clear Genres</button>
    </div>
  );
}
