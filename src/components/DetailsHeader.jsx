import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const DetailsHeader = ({ artist = null, songDetails = null }) => {
  let artistImage = artist?.attributes?.artwork?.url;
  artistImage = artistImage?.replace('{w}', '800');
  artistImage = artistImage?.replace('{h}', '800');

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const data = songDetails;
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-row items-center justify-between relative mt-5 mb-5 p-[15px] bg-[#000000] md:h-23 h-25 w-full text-white">
      <div className="flex flex-row items-center">
        {
        (artist) ? <img src={artistImage} alt="Artist coverart" className="md:h-18 h-20 rounded-full outline-white outline outline-4" /> : <img src={songDetails?.images?.coverart} alt="Song coverart" className="md:h-18 h-20 rounded-full outline-white outline outline-4" />
      }

        {
        (artist) ? (
          <div className="md:ml-8 ml-4 flex flex-col justify-center">
            <div className="text-white font-bold text-2xl md:text-3xl">{artist?.attributes?.name}</div>
            <p className="text-sm text-gray-200">
              Genre : {artist?.attributes?.genreNames?.[0]}
            </p>
          </div>
        ) : (
          <div className="md:ml-8 ml-4 flex flex-col justify-center">
            <div className="text-white font-bold text-2xl md:text-3xl">{songDetails.title}</div>
            <Link to={`/artists/${songDetails?.artists[0]?.adamid}`} className="text-base text-gray-200 hover:text-cyan-400">
              Artist : {songDetails.subtitle}
            </Link>
            <p className="text-sm text-gray-200">
              Genre : {songDetails?.genres?.primary}
            </p>
          </div>
        )
      }
      </div>

      {
        (artist) ? <p className="hidden">NO OPTIONS</p> : <PlayPause className="p-2" isPlaying={isPlaying} activeSong={activeSong} song={songDetails} handlePlay={() => handlePlayClick(songDetails, 1)} handlePause={() => handlePauseClick()} />

      }
    </div>
  );
};

export default DetailsHeader;
