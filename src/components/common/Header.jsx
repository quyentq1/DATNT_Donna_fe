import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchView from '../ui/SearchView';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import ChangePasswordModal from '../ui/ChangePasswordModal';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  console.log('user', user);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/campaigns?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleChangePassword = () => {
    setShowUserMenu(false); // Close user menu
    setShowChangePassword(true); // Open change password modal
  };

  return (
    <>
      <div className="flex flex-row w-full h-[61px] bg-global-3 shadow-[0px_2px_5px_#abbed166]">
        <div className="flex flex-row w-full h-full items-center justify-between px-[70px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/img_logo.png" alt="DonaTrust Logo" className="w-[125px] h-[39px]" />
          </Link>

          {/* Center nav: Ẩn nếu là admin */}
          {user?.role !== 'admin' && (
            <div className="flex flex-row items-center space-x-8">
              {/* Search */}
              <SearchView placeholder="Search campaign..." onSearch={handleSearch} />

              {/* Navigation */}
              <nav className="flex flex-row items-center space-x-6">
                <Link
                  to="/"
                  className="text-base font-medium font-inter text-global-4 hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  to="/campaigns"
                  className="text-base font-medium font-inter text-global-4 hover:text-blue-600"
                >
                  Campaign
                </Link>
                <Link
                  to="/introduce"
                  className="text-base font-medium font-inter text-global-4 hover:text-blue-600"
                >
                  Introduce
                </Link>
                <Link
                  to="/contact"
                  className="text-base font-medium font-inter text-global-4 hover:text-blue-600"
                >
                  Contact
                </Link>
              </nav>

              {/* Language */}
              <div className="flex flex-row items-center">
                <span className="text-xs font-medium font-roboto text-global-4">EN</span>
                <img src="/images/img_expand.svg" alt="Language Dropdown" className="ml-1 w-4 h-4" />
              </div>
            </div>
          )}

          {/* Auth Section */}
          <div className="flex flex-row items-center space-x-3">
            {isAuthenticated ? (
              // User Menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-2 space-x-2 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <img
                    src={user?.avatar || '/images/img_avatar.png'}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.src = '/images/img_avatar.png';
                    }}
                  />
                  <span className="text-sm font-medium text-global-4">
                    {user?.full_name || 'User'}
                  </span>
                  <img src="/images/img_expand.svg" alt="Menu" className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile Dashboard
                      </Link>
                      <Link
                        to="/profile/edit"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/charity-registration"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Register Charity
                      </Link>
                      <Link
                        to="/dao-registration"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Join DAO
                      </Link>
                      <button
                        onClick={handleChangePassword}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                      >
                        Change Password
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-sm text-left text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Login/Register buttons
              <>
                <Link to="/signin">
                  <Button variant="login" size="small">
                    Login
                  </Button>
                </Link>

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
              </>
            )}
          </div>
        </div>

        {/* Overlay to close menu when clicking outside */}
        {showUserMenu && (
          <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default Header;
