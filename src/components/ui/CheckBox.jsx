import React from 'react';

const CheckBox = ({ 
  label = "Keep me logged in", 
  checked = false, 
  onChange,
  id = "checkbox"
}) => {
  return (
    <div className="flex flex-row items-center w-[176px] h-[25px]">
      <div className="relative w-6 h-6">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <img 
          src="/images/img_square.svg" 
          alt="Checkbox" 
          className="w-6 h-6"
        />
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-button-4 rounded-sm"></div>
          </div>
        )}
      </div>
      <label 
        htmlFor={id}
        className="text-base font-inter font-medium text-checkbox-1 ml-[10px] cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;