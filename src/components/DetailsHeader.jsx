import { Link } from 'react-router-dom';

const DetailsHeader = ({ artist = null, songDetails }) => (
  <div className="flex flex-row items-center relative mt-5 mb-5 p-[15px] bg-[#000000] md:h-23 h-25 w-full text-white">
    {
      (artist) ? <p>Artist Image</p> : <img src={songDetails?.images?.coverart} alt="Song coverart" className="md:h-18 h-20 rounded-full outline-white outline outline-4" />
    }
    {
      (artist) ? <p>Artist Name</p> : (
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
);

export default DetailsHeader;
