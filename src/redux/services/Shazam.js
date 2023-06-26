import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'f80cd0a49cmshfc5d0a28b0def1ap1ec39cjsn2b57571922f5');
      headers.set('X-RapidAPI-Host', 'shazam.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/songs/get-details?key=${songid}` }),
    getSimilarSongs: builder.query({ query: ({ songid }) => `/songs/list-recommendations?key=${songid}` }),
    getAroundYou: builder.query({ query: ({ countryCode }) => `/charts/track?listId=ip-country-chart-${countryCode}&pageSize=20&startFrom=21` }),
    getByGenre: builder.query({ query: (genreListId) => `/charts/track?listId=${genreListId}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSimilarSongsQuery,
  useGetAroundYouQuery,
  useGetByGenreQuery,
} = shazamApi;
