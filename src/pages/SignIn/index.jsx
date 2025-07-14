import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import CheckBox from '../../components/ui/CheckBox';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../services/api';

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    login,
    googleLogin,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
  } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      keepLoggedIn: e.target.checked,
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
    setErrors({});

    try {
      await login({
        email: formData.email,
        password: formData.password,
        keepLoggedIn: formData.keepLoggedIn,
      });

      // Success - user will be redirected by useEffect
      // navigate('/') will be called automatically by useEffect when isAuthenticated becomes true
    } catch (error) {
      // Handle specific error cases
      if (error.status === 401) {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
      } else if (error.status === 422) {
        // Handle validation errors
        const validationErrors = {};
        if (error.errors) {
          error.errors.forEach((err) => {
            validationErrors[err.field] = err.message;
          });
        }
        setErrors(validationErrors);
      } else {
        setErrors({
          general: error.message || 'Sign in failed. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Thay thế hàm handleGoogleSignIn bằng hàm xử lý credential từ Google
  const handleGoogleSignIn = async (credentialResponse) => {
    console.log('Google credentialResponse:', credentialResponse); // Log toàn bộ object trả về từ Google
    console.log('Google credential:', credentialResponse.credential); // Log riêng credential
    setIsLoading(true);
    setErrors({});
    try {
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('accessToken', res.data.accessToken);
      // TODO: Nếu có AuthContext, nên gọi hàm login context ở đây
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Google sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
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
            src="/images/img_top.png" // 👈 thay đúng tên file logo bạn dùng
            alt="DonaTrust Logo"
            className="w-[380px] h-auto object-contain"
          />
        </div>

        {/* Sign In Form */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-[46px]">
            <h1 className="text-[40px] font-inter font-bold leading-[49px]  text-global-9 mb-4">
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
              {errors.email && <p className="mt-1 ml-3 text-sm text-red-500">{errors.email}</p>}
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
                <p className="mt-1 ml-3 text-sm text-red-500">{errors.password}</p>
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

            {/* General Error Message */}
            {errors.general && (
              <div className="p-3 mb-4 bg-red-50 rounded-md border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Sign In Button */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading || authLoading}
                className="w-[399px]"
              >
                {isLoading || authLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center w-[399px] h-6 my-6">
              <div className="flex-1 h-px bg-global-7"></div>
              <span className="px-4 text-base font-medium font-inter text-global-12">or</span>
              <div className="flex-1 h-px bg-global-7"></div>
            </div>

            {/* Google Sign In */}
            <div className="w-[399px]">
              <GoogleLogin
                onSuccess={handleGoogleSignIn}
                onError={() => setErrors({ general: 'Google sign in failed. Please try again.' })}
                width="100%"
                size="large"
                shape="pill"
                text="signin_with"
              />
            </div>

            {/* Google OAuth Redirect Button */}
            

            {/* Create Account Link */}
            <div className="pt-6 text-center">
              <p className="text-lg font-inter text-global-11">
                <span className="font-normal">Need an account? </span>
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="font-semibold underline text-button-4 hover:no-underline"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="relative flex-1">
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
