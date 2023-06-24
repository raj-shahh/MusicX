/* eslint-disable */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

// eslint-disable-next-line no-unused-vars
const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();
  // const isSongImagesUndefined=song.images;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song,data,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="mt-4 flex flex-col w-[250px] h-[350px] p-4  bg-songCardCol bg-opacity-90 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="rounded-[4px] relative w-full group">
        <div className={`rounded-[4px] box-border absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title == song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={()=>handlePauseClick()} handlePlay={()=>handlePlayClick(song,data,i)} />
        </div>
        {/* {
          (isSongImagesUndefined===undefined) ? <img className="rounded-[4px]" src={noSongImage} alt="" /> : <img className="rounded-[4px]" src={song.images.coverart} alt={song.images.coverarthq} />
        } */}
        <img className="rounded-[4px]" src={song.images.coverart} alt={song.images.coverarthq} />
      </div>
      <div className="mt-2 pl-2">
        <h1 className="font-bold text-white">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </h1>
        <p className="text-white text-xs mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
