import loader from '../assets/loader.svg';

const Loader = ({ title = 'Loading' }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loader} alt="Failed to Render Loader" className="w-32 h-32 object-contain" />
    <h2 className="font-bold text-2xl text-white mt-2">{title}</h2>
  </div>
);

export default Loader;
