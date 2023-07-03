import { Link, useNavigate } from 'react-router-dom';

const ArtistCard = ({ song }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 flex flex-col w-[250px] h-[350px] p-4  bg-songCardCol bg-opacity-90 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div onClick={() => navigate(`/artists/${song?.artists[0]?.adamid}`)} className="rounded-[4px] relative w-full group">
        <img className="rounded-[4px]" src={song?.images?.background} alt={song?.images?.coverart} />
      </div>
      <div className="mt-2 pl-2">
        <p className="text-white font-bold mt-1 hover:text-cyan-400">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.artists[0].alias.charAt(0).toUpperCase() + song.artists[0].alias.substr(1)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;
