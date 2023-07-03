import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchQueryTerm = searchTerm;
    searchQueryTerm = searchQueryTerm.replaceAll(' ', '%20');
    navigate(`/search/${searchQueryTerm}`);
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-300 focus-within:text-white">
      <label htmlFor="search-field" className="sr-only">Search All Songs</label>
      <div className="flex flex-row items-center justify-start bg-black rounded-lg pl-2">
        <FiSearch className="w-5 h-5" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => (setSearchTerm(e.target.value))}
          className="p-4 outline-none rounded-lg border-none bg-black placeholder-gray-500 text-white flex-1"
        />
      </div>
    </form>
  );
};

export default Searchbar;
