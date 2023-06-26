import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAroundYouQuery } from '../redux/services/Shazam';
import { Loader, Error, SongCard } from '../components';

const CountryTracks = ({ country = 'India', countryCode = 'IN' }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetAroundYouQuery({ countryCode });

  if (isFetching) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col ">
      <h2 className="font-bold text-3xl text-white text-left">Around You {country}</h2>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10 mt-4">

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data.tracks.map((song, i) => (
            (!(song.images === undefined)) ? (
              <SongCard
                key={song.key}
                song={song}
                activeSong={activeSong}
                isPlaying={isPlaying}
                i={i}
                data={data}
              />
            ) : console.log(`Song Not Available ${song.title}`)

          ))};
        </div>

      </div>
    </div>
  );
};

export default CountryTracks;
