import React, { useState } from "react";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (onSearch) onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onClear) onClear();
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
      <div className="flex items-stretch">
        <div className="relative mr-2 w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-12 pr-10 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 mr-2 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-10.59L13.41 12 16 14.59 14.59 16 12 13.41 9.41 16 8 14.59 10.59 12 8 9.41 9.41 8 12 10.59 14.59 8 16 9.41 13.41 12 16 14.59z"
                />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="absolute left-0 top-0 mt-3 ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </svg>
          </button>
        </div>

        {searchTerm && (
          <button
            type="submit"
            onClick={handleSearch}
            className="text-white rounded-lg px-4 py-2 bg-gray-400 h-full hover:bg-gray-300 transition-all"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
