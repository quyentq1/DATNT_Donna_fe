import React from 'react';
import Button from './Button';

const Slider = ({ 
  title = "JOIN HANDS TO BUILD A BETTER COMMUNITY!", 
  subtitle = "Discover and support trustworthy charitable projects.",
  buttonText = "EXPLORE CAMPAIGN",
  backgroundImage = "/images/img_.png",
  onButtonClick
}) => {
  return (
    <div 
      className="relative w-full h-[396px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col absolute left-[100px] top-[147px] w-[518px] h-[116px]">
        <h1 className="text-2xl font-roboto font-medium text-slider-1 leading-[29px]">
          {title}
        </h1>
        <p className="text-sm font-roboto font-semibold text-global-5 leading-[17px] mt-[13px]">
          {subtitle}
        </p>
        <div className="mt-[21px]">
          <Button variant="secondary" size="md" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;