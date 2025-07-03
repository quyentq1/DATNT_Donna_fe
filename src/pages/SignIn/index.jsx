import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import CheckBox from '../../components/ui/CheckBox';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      keepLoggedIn: e.target.checked
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user session if "Keep me logged in" is checked
      if (formData.keepLoggedIn) {
        localStorage.setItem('userSession', JSON.stringify({
          email: formData.email,
          timestamp: Date.now()
        }));
      }
      
      alert('Sign in successful! Welcome back to DonaTrust.');
      navigate('/');
    } catch (error) {
      alert('Sign in failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign In functionality would be implemented here. Redirecting to Google OAuth...');
    // In a real app, this would redirect to Google OAuth
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-row min-h-screen bg-global-3">
      {/* Left Side - Sign In Form */}
      <div className="flex flex-col w-full max-w-[531px] px-24 py-14">
        {/* Logo */}
<div className="flex justify-center items-center mb-10">
  <img 
    src="/images/img_top.png"  // 👈 thay đúng tên file logo bạn dùng
    alt="DonaTrust Logo"
    className="w-[120px] h-auto object-contain"
  />
</div>


        {/* Sign In Form */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-[46px]">
            <h1 className="text-[40px] font-inter font-bold leading-[49px] text-center text-global-9 mb-4">
              Sign in
            </h1>
            <p className="text-lg font-inter font-normal leading-[22px] text-global-13">
              Please login to continue to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="flex flex-col space-y-6">
            {/* Email Field */}
            <div>
              <EditText
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                variant="floating"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-3">{errors.email}</p>
              )}
            </div>

            <div>
              <EditText
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                variant="floating"
                showPasswordToggle={true}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-3">{errors.password}</p>
              )}
            </div>

            {/* Keep me logged in */}
            <div className="pt-2">
              <CheckBox
                label="Keep me logged in"
                checked={formData.keepLoggedIn}
                onChange={handleCheckboxChange}
                id="keepLoggedIn"
              />
            </div>

            {/* Sign In Button */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading}
                className="w-[399px]"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center w-[399px] h-6 my-6">
              <div className="flex-1 h-px bg-global-7"></div>
              <span className="px-4 text-base font-inter font-medium text-global-12">
                or
              </span>
              <div className="flex-1 h-px bg-global-7"></div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="google"
              size="large"
              onClick={handleGoogleSignIn}
              className="w-[399px] shadow-sm"
            >
              <span className="text-lg font-inter font-semibold text-global-9">
                Sign in with Google
              </span>
              <img 
                src="/images/img_plus.svg" 
                alt="Google" 
                className="w-6 h-6 ml-4"
              />
            </Button>

            {/* Create Account Link */}
            <div className="text-center pt-6">
              <p className="text-lg font-inter text-global-11">
                <span className="font-normal">Need an account? </span>
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="font-semibold text-button-4 underline hover:no-underline"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="flex-1 relative">
        <img 
          src="/images/img_container_1000x825.png" 
          alt="Children playing in traditional clothing" 
          className="w-full h-full object-cover rounded-l-[24px]"
        />
      </div>
    </div>
  );
};

export default SignInPage;