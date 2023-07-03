import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const TopPlayCard = ({ song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => (
  <div className="w-full flex flex-row items-center text-white py-2 p-4 hover:bg-[#000000] cursor-pointer">

    <div className="flex-1 flex flex-row items-center justify-between">
      <img src={song?.images?.coverart} alt={song.title} className="w-[60px] rounded-lg" />
      <div className="flex-1 flex flex-col justify-between mx-3">
        { (!(song?.key === undefined))
          ? (
            <Link to={`/songs/${song?.key}`} className="font-bold">
              {song.title}
            </Link>
          ) : (
            <div className="font-bold">
              {song.title}
            </div>
          )}
        { (!(song?.artists[0]?.adamid === undefined)) ? (
          <Link to={`/artists/${song?.artists?.[0]?.adamid}`} className="text-gray-300 text-sm hover:text-cyan-400">
            {song?.subtitle}
          </Link>
        ) : (
          <div className="text-gray-300 text-sm hover:text-cyan-400">
            {song?.subtitle}
          </div>
        )}
      </div>
    </div>

    <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePlay={() => handlePlayClick(song, i)} handlePause={() => handlePauseClick()} />

  </div>
);

const RelatedSongs = ({ similarSongs }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const data = similarSongs?.tracks;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    (!(data === undefined)) ? (data.map((song, i) => (
      <TopPlayCard key={i} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick} />
    ))) : <p className="text-white">Sorry! No Similar Songs Found</p>
  );
};

export default RelatedSongs;
