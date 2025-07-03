import React, { useState } from 'react';

const DatePicker = ({ 
  value = '', 
  onChange, 
  placeholder = 'Select date',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDateChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
    setIsOpen(false);
  };
  
  return (
    <div className={`relative w-[617px] h-[41px] ${className}`}>
      <div className="w-full h-full bg-datepicker-1 border border-global-1 rounded-[10px] flex items-center px-3">
        <input
          type="date"
          value={value}
          onChange={handleDateChange}
          className="w-full bg-transparent text-base font-inter text-global-9 outline-none"
          placeholder={placeholder}
        />
        <img 
          src="/images/img__37x25.png" 
          alt="Calendar" 
          className="w-[25px] h-[37px] ml-2"
        />
      </div>
    </div>
  );
};

export default DatePicker;