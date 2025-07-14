import React, { useState } from 'react';

const SearchView = ({ placeholder = 'Search...', value = '', onChange, onSearch }) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-[320px] h-[42px] bg-white rounded-full border border-gray-300 px-4 shadow-sm">
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="flex-1 bg-transparent border-none outline-none text-[14px] font-inter text-gray-700 placeholder-gray-400"
      />
      <img
        src="/images/img_24_user_interface_search.svg"
        alt="Search"
        className="w-[20px] h-[20px] cursor-pointer hover:opacity-70"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchView;
