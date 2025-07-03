import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Account created successfully! Welcome to DonaTrust!');
      
      // Redirect to sign in page
      navigate('/signin');
    } catch (error) {
      alert('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google Sign Up functionality would be implemented here');
  };

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="flex flex-row min-h-screen bg-global-3">
      {/* Left Side - Sign Up Form */}
      <div className="flex flex-col w-full max-w-[550px] px-[105px] py-8">
        {/* Logo */}
 <div className="flex justify-center items-center mb-10">
  <img 
    src="/images/img_top.png"  
    alt="DonaTrust Logo"
    className="w-[120px] h-auto object-contain"
  />
</div>

        {/* Sign Up Form */}
        <div className="flex flex-col">
          {/* Header */}
          <h1 className="text-[40px] font-inter font-bold leading-[49px] text-center text-global-9 mb-4">
            Sign up
          </h1>
          
          <p className="text-lg font-inter font-normal leading-[27px] text-left text-global-13 mb-[75px] max-w-[399px]">
            Sign up to join hands for the community with DonaTrust
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp} className="flex flex-col space-y-5">
            {/* Name Field */}
            <div className="relative">
              <EditText
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                className="w-[399px]"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <EditText
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                className="w-[399px]"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <EditText
                label="Phone number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={!!errors.phone}
                className="w-[399px]"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <EditText
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                showPasswordToggle={true}
                className="w-[399px]"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <EditText
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                showPasswordToggle={true}
                className="w-[399px]"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-[399px] h-[54px] mt-[20px]"
            >
              {isLoading ? 'Creating Account...' : 'Sign up'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-[399px] h-6 mt-[20px] mb-[20px]">
            <div className="flex-1 h-px bg-global-7"></div>
            <span className="px-4 text-base font-inter font-medium leading-5 text-global-12">
              or
            </span>
            <div className="flex-1 h-px bg-global-7"></div>
          </div>

          {/* Google Sign Up Button */}
          <Button
            variant="google"
            onClick={handleGoogleSignUp}
            className="w-[399px] h-[54px] mb-[35px] shadow-sm"
          >
            <span className="text-lg font-inter font-semibold leading-[22px] text-global-9">
              Continue with Google
            </span>
            <img 
              src="/images/img_plus.svg" 
              alt="Google" 
              className="w-6 h-6 ml-2"
            />
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-lg font-inter font-normal leading-[22px] text-global-11">
              Already have an account?{' '}
            </span>
            <button
              onClick={handleSignInRedirect}
              className="text-lg font-inter font-semibold leading-[22px] text-global-10 underline hover:opacity-80"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 flex items-center justify-center p-3">
        <img 
          src="/images/img_container.png" 
          alt="Community children" 
          className="w-full max-w-[825px] h-auto max-h-[1000px] object-cover rounded-[24px]"
        />
      </div>
    </div>
  );
};

export default SignUpPage;