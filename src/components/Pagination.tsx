import React from 'react';
import classNames from 'classnames';

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const Item = ({
  page,
  setPage,
  active,
}: Pick<Props, 'page' | 'setPage'> & { active?: boolean }) => (
  <button
    className={classNames('text-xl w-12 text-center', {
      'bg-sky-500 rounded-full text-white': active,
    })}
    onClick={() => setPage(page)}
  >
    {page}
  </button>
);

export default function Pagination({ page, totalPages, setPage }: Props) {
  return (
    <div className='flex justify-between gap-4 w-96 mb-4 mx-4 max-w-[95%]'>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        {'<'}
      </button>
      {/* First page  */}
      {page > 2 && <Item page={1} setPage={setPage} />}
      {page - 1 !== 1 && page !== 1 && '...'}
      {/* prev  */}
      {page > 1 && <Item page={page - 1} setPage={setPage} />}
      {/* cur  */}
      <Item page={page} setPage={setPage} active />
      {/* next  */}
      {totalPages > page && <Item page={page + 1} setPage={setPage} />}
      {page + 1 !== totalPages &&
        page !== totalPages &&
        totalPages > 1 &&
        '...'}
      {/* last page  */}
      {totalPages > page + 1 && <Item page={totalPages} setPage={setPage} />}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        {'>'}
      </button>
    </div>
  );
}
