import React from 'react';
import { Link } from 'react-router-dom';
import SearchView from '../ui/SearchView';
import Button from '../ui/Button';

const Header = () => {
  return (
    <div className="flex flex-row w-full h-[61px] bg-global-3 shadow-[0px_2px_5px_#abbed166]">
      <div className="flex flex-row w-full h-full items-center justify-between px-[70px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/img_logo.png"
            alt="DonaTrust Logo"
            className="w-[125px] h-[39px]"
          />
        </Link>

        {/* Center nav */}
        <div className="flex flex-row items-center space-x-8">
          {/* Search */}
          <SearchView placeholder="Search campaign..." />

          {/* Navigation */}
          <nav className="flex flex-row items-center space-x-6">
            <Link to="/" className="text-base font-inter font-medium text-global-4">
              Home
            </Link>
            <Link to="/campaign" className="text-base font-inter font-medium text-global-4">
              Campaign
            </Link>
            <Link to="/introduce" className="text-base font-inter font-medium text-global-4">
              Introduce
            </Link>
            <Link to="/contact" className="text-base font-inter font-medium text-global-4">
              Contact
            </Link>
          </nav>

          {/* Language */}
          <div className="flex flex-row items-center">
            <span className="text-xs font-roboto font-medium text-global-4">EN</span>
            <img
              src="/images/img_expand.svg"
              alt="Language Dropdown"
              className="w-4 h-4 ml-1"
            />
          </div>
        </div>

<div className="flex flex-row items-center space-x-3">
  {/* Login */}
  <Link to="/signin">
    <Button variant="login" size="small">
      Login
    </Button>
  </Link>

  {/* Register Now */}
  <Link to="/signup">
    <Button variant="register" size="small">
      <span className="mr-2">Register Now</span>
      <img
        src="/images/img_16_arrows_directions_right.svg"
        alt="Arrow Right"
        className="w-[11px] h-[11px]"
      />
    </Button>
  </Link>
</div>
      </div>
    </div>
  );
};

export default Header;
