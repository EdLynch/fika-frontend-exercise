import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Pagination from '../Pagination';

test('renders 3 pages', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Pagination page={1} setPage={() => {}} totalPages={3} />
    </QueryClientProvider>
  );
  expect(screen.getByText(/1/i)).toBeInTheDocument();
  expect(screen.getByText(/2/i)).toBeInTheDocument();
  expect(screen.getByText(/3/i)).toBeInTheDocument();
});

test('renders only 1 page', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Pagination page={1} setPage={() => {}} totalPages={1} />
    </QueryClientProvider>
  );
  expect(screen.queryByText(/1/i)).toBeInTheDocument();
  expect(screen.queryByText(/2/i)).toBeNull();
  expect(screen.queryByText(/3/i)).toBeNull();
});

test('renders ... when many pages', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Pagination page={1} setPage={() => {}} totalPages={100} />
    </QueryClientProvider>
  );
  expect(screen.getAllByText(/.../i)).toHaveLength(2);
});

test('renders changing page works', () => {
  const queryClient = new QueryClient();
  let page = 1;
  const { rerender } = render(
    <QueryClientProvider client={queryClient}>
      <Pagination page={page} setPage={(p) => (page = p)} totalPages={3} />
    </QueryClientProvider>
  );
  expect(screen.getByText(/1/i)).toBeInTheDocument();
  expect(screen.getByText(/1/i)).toHaveClass('bg-sky-500');
  expect(screen.getByText(/2/i)).toBeInTheDocument();
  expect(screen.getByText(/3/i)).toBeInTheDocument();
  fireEvent(
    screen.getByText(/2/i),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  rerender(
    <QueryClientProvider client={queryClient}>
      <Pagination page={page} setPage={(p) => (page = p)} totalPages={3} />
    </QueryClientProvider>
  );
  expect(screen.getByText(/2/i)).toHaveClass('bg-sky-500');
});
