import React from 'react';

const SearchView = ({ 
  placeholder = "Search...", 
  value = "", 
  onChange, 
  onSearch 
}) => {
  return (
    <div className="flex items-center w-[320px] h-[42px] bg-white rounded-full border border-gray-300 px-4 shadow-sm">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent border-none outline-none text-[14px] font-inter text-gray-700 placeholder-gray-400"
      />
      <img 
        src="/images/img_24_user_interface_search.svg" 
        alt="Search" 
        className="w-[20px] h-[20px] cursor-pointer"
        onClick={onSearch}
      />
    </div>
  );
};

export default SearchView;
