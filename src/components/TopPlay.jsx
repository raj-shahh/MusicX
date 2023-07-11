import { React, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper';
import { useGetTopChartsQuery } from '../redux/services/Shazam';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

// import 'swiper/css';
// import 'swiper/css/free-mode';

const TopPlayCard = ({ song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => (
  <div className="w-full flex flex-row items-center text-white py-2 p-4 hover:bg-[#000000] cursor-pointer">
    <h3 className="font-bold mr-3">{i + 1}.</h3>

    <div className="flex-1 flex flex-row items-center justify-between">
      <img src={song.images.coverart} className="w-[60px] rounded-lg" />
      <div className="flex-1 flex flex-col justify-between mx-3">
        <Link to={`/songs/${song?.key}`} className="font-bold hover:text-cyan-400">
          {song?.title?.split('[')[0]}
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`} className="text-gray-300 text-sm hover:text-cyan-400">
          {song?.subtitle}
        </Link>
      </div>
    </div>

    <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePlay={() => handlePlayClick(song, i)} handlePause={() => handlePauseClick()} />

  </div>
);

const TopPlay = () => {
  const refToTop = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topSongs = data?.tracks?.slice(0, 5);

  useEffect(() => {
    refToTop.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (

    <div ref={refToTop} className="xl:ml-6 ml-0 xl:mb-0 mb-6 mt-1 flex flex-col flex-1 xl:max-w-[500px] max-w-full">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between justify-items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts" className="text-white text-base visited:text-white hover:text-cyan-400">See More</Link>
        </div>

        <div className="flex flex-col mt-4 gap-1">
          {topSongs?.map((song, i) => (
            <TopPlayCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick} />
          ))}
        </div>
      </div>

      {/* <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between justify-items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to='/top-artists' className='text-white text-base visited:text-white hover:text-cyan-400'>See More</Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {
            topSongs?.map((song,i)=>(
              <SwiperSlide key={song.key} style={{width:'20%', height:'auto'}} className='rounded-full animate-slideright'>
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images?.background} alt="" className='rounded-full w-[80px] object-cover' />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div> */}
    </div>

  );
};

export default TopPlay;
