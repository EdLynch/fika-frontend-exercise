export const getGenres = (): Promise<{
  genres: { id: number; name: string }[];
}> =>
  fetch(
    `${process.env.REACT_APP_API_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  ).then((res) => res.json());
