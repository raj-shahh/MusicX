import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_RAPID_API_KEY);
      headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
    getSimilarSongs: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}` }),
    getAroundYou: builder.query({ query: ({ countryCode }) => `/charts/track?listId=ip-country-chart-${countryCode}&pageSize=20` }),
    getByGenre: builder.query({ query: (genreListId) => `/charts/track?listId=${genreListId}` }),
    search: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}` }),
    getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?id=${artistId}` }),
    getArtistTopSongs: builder.query({ query: (artistId) => `/artists/get-top-songs?id=${artistId}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSimilarSongsQuery,
  useGetAroundYouQuery,
  useGetByGenreQuery,
  useSearchQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} = shazamApi;
