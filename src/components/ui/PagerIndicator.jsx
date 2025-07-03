import React from 'react';

const PagerIndicator = ({ 
  totalPages = 3, 
  currentPage = 0, 
  onPageChange 
}) => {
  return (
    <div className="flex flex-row space-x-3 w-8 h-[6px]">
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={`w-[6px] h-[6px] rounded-[3px] cursor-pointer ${
            index === currentPage ? 'bg-global-5' : 'bg-pagerindicator-1'
          }`}
          onClick={() => onPageChange && onPageChange(index)}
        />
      ))}
    </div>
  );
};

export default PagerIndicator;