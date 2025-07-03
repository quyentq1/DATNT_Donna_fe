import React from 'react';

const RatingBar = ({ 
  rating = 4, 
  maxRating = 5, 
  size = 'medium',
  readonly = true,
  onRatingChange
}) => {
  const sizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };
  
  const handleStarClick = (starIndex) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };
  
  return (
    <div className="flex flex-row space-x-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <img
          key={index}
          src={index < rating ? "/images/img_starpurple500.svg" : "/images/img_star_outline.svg"}
          alt={`Star ${index + 1}`}
          className={`${sizes[size]} ${!readonly ? 'cursor-pointer' : ''}`}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

export default RatingBar;