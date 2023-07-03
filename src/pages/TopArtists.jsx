import { React } from 'react';
import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/Shazam';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  if (isFetching) return <Loader title="Sit Tight as we load..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col ">
      <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>

      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10 mt-4">

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data.tracks.map((song) => (
            (!(song.images === undefined)) ? (
              <ArtistCard
                key={song?.artists?.[0].adamid}
                song={song}
              />
            ) : console.log(`Song Not Available ${song.title}`)

          ))};
        </div>

      </div>
    </div>
  );
};

export default TopArtists;
