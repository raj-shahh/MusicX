import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSearchQuery } from '../redux/services/Shazam';
import { Loader, Error, SongCard } from '../components';

const SearchArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 flex flex-col w-[250px] h-[350px] p-4  bg-songCardCol bg-opacity-90 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div onClick={() => navigate(`/artists/${artist.adamid}`)} className="rounded-[4px] relative w-full group">
        <img className="rounded-[4px]" src={artist.avatar} alt="aritst cover" />
      </div>
      <div className="mt-2 pl-2">
        <p className="text-white font-bold mt-1 hover:text-cyan-400">
          <Link to={artist ? `/artists/${artist?.adamid}` : '/top-artists'}>
            {artist.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

const Search = () => {
  const params = useParams();
  let { searchTerm } = params;
  searchTerm = searchTerm.replaceAll(' ', '%20');
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isLoading, searchError } = useSearchQuery(searchTerm);

  if (isLoading) return <Loader />;
  if (searchError) return <Error />;

  return (
    <div className="flex flex-col ">
      <h2 className="text-white font-bold text-xl mt-2">Search Results : </h2>

      <h2 className="text-gray-200 font-bold text-lg mt-2">Songs</h2>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10 mt-4">

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.tracks?.hits?.map((song, i) => (
            (!(song.track.images === undefined)) ? (
              <SongCard
                key={song.track.key}
                song={song.track}
                activeSong={activeSong}
                isPlaying={isPlaying}
                i={i}
                data={data?.tracks?.hits}
              />
            ) : console.log(`Song Not Available ${song.title}`)

          ))};
        </div>
      </div>
      <h2 className="text-gray-200 font-bold text-lg mt-2">Artists</h2>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10 mt-4">
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.artists?.hits?.map((artist, i) => (
            (!(artist?.artist?.avatar === undefined)) ? (
              <SearchArtistCard
                artist={artist.artist}
                key={i}
              />
            ) : console.log(`Artist Not Available ${artist.artist.name}`)

          ))};
        </div>
      </div>
    </div>
  );
};

export default Search;
