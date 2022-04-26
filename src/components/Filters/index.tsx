import React, { useState, useEffect } from 'react';
import Genres from './Genres';
import classNames from 'classnames';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  genres: number[];
  setGenres: (genres: number[]) => void;
};

const Tab = ({
  activeTab,
  setActiveTab,
  tab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tab: string;
}) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={classNames(
      'border-b-4',
      activeTab === tab ? 'border-green-600' : 'border-slate-600'
    )}
  >
    {tab}
  </button>
);

export default function Filters({
  searchTerm,
  setSearchTerm,
  genres,
  setGenres,
}: Props) {
  const [activeTab, setActiveTab] = useState('Search');
  useEffect(() => {
    setSearchTerm('');
    setGenres([]);
  }, [activeTab, setSearchTerm, setGenres]);
  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-4 mb-4'>
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} tab='Search' />
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} tab='Genre' />
      </div>
      <div>
        {activeTab === 'Search' && (
          <input
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
            placeholder='Search...'
            className='border border-slate-500'
          />
        )}
        {activeTab === 'Genre' && (
          <Genres genres={genres} setGenres={setGenres} />
        )}
      </div>
    </div>
  );
}
