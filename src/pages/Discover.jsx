/* eslint-disable*/

import { React } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/Shazam';

const Discover = () => {
  const genreTitle = 'Pop';
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (isFetching) return <Loader title="Sit Tight as we load..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col ">
      <div className="w-full pr-6 flex justify-between items-center mt-4 mb-5 sm:flex-row flex-col">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        <select
          onChange={() => { }}
          value=""
          className="bg-black text-white p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >

          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>

      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10 mt-4">

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data.tracks.map((song, i) => (
            (!(song.images===undefined)) ? <SongCard
              key={song.key}
              song={song}
              activeSong={activeSong}
              isPlaying={isPlaying}
              i={i}
              data={data}
            /> : console.log("Song Not Available "+song.title)
            
          ))};
        </div>

      </div>
    </div>
  );
};

export default Discover;
