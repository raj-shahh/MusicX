import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSimilarSongsQuery } from '../redux/services/Shazam';

const SongDetails = () => {
  const { songid } = useParams();
  const { data: songDetails, isFetching: isFetchingSongDetails, Error: songDetailsError } = useGetSongDetailsQuery({ songid });
  const { data: similarSongs, isFetching: isFetchingSimilarSongs, Error: similarSongsError } = useGetSimilarSongsQuery({ songid });

  if (isFetchingSongDetails || isFetchingSimilarSongs) return <Loader />;
  if (songDetailsError || similarSongsError) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader songDetails={songDetails} />
      <h2 className="mb-5 text-white font-bold text-xl">LYRICS</h2>
      {
        (songDetails?.sections[1]?.type === 'LYRICS') ? songDetails?.sections[1].text.map((line, i) => (
          <p key={i} className="text-white text-base hover:text-gray-300">{line}</p>
        )) : <p className="text-white">Sorry! No Lyrics Found</p>
      }
      <div className="mb-5 mt-5 text-white font-bold">
        <h2 className="text-xl mb-5">SIMILAR SONGS</h2>
        <RelatedSongs similarSongs={similarSongs} />
      </div>
    </div>
  );
};

export default SongDetails;
