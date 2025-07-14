import React, { useState } from 'react';

const EditText = ({
  label = '',
  placeholder = '',
  type = 'text',
  value,
  onChange,
  variant = 'default',
  showPasswordToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const inputType = type === 'password' && showPassword ? 'text' : type;
  const shouldFloat = isFocused || Boolean(value);

  const getVariantClasses = () => {
    switch (variant) {
      case 'floating':
        return {
          container: 'relative w-full',
          input:
            'w-full px-3 pt-6 pb-2 border border-button-4 rounded-[10px] text-base font-inter font-medium text-global-1 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-4',
          label:
            'absolute left-3 bg-global-3 px-1 transition-all duration-200 pointer-events-none font-inter font-medium text-button-4 ' +
            (shouldFloat ? 'top-[-8px] text-xs' : 'top-4 text-base'),
        };
      default:
        return {
          container: 'w-full',
          label: 'block mb-1 text-sm font-medium font-inter text-global-4',
          input:
            'w-full px-3 py-2 border border-global-7 rounded-[10px] text-base font-inter font-medium text-global-1 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-4 focus:border-button-4',
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div className={`${classes.container} ${className}`}>
      {variant === 'floating' ? (
        <>
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className={classes.input}
            {...props}
          />
          {label && <label className={classes.label}>{label}</label>}
        </>
      ) : (
        <>
          {label && <label className={classes.label}>{label}</label>}
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={classes.input}
            {...props}
          />
        </>
      )}

      {showPasswordToggle && type === 'password' && (
        <button
          type="button"
          onClick={handlePasswordToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
        >
          <img
            src="/images/img_eyeoff.svg"
            alt={showPassword ? 'Hide password' : 'Show password'}
            className="w-6 h-6"
          />
        </button>
      )}
    </div>
  );
};

export default EditText;
