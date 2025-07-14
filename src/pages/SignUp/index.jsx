import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { useAuth } from '../../context/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register, googleLogin, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    setErrors({});

    try {
      await register({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
      });

      alert('Account created successfully! Please check your email to verify your account.');
      navigate('/signin');
    } catch (error) {
      // Handle specific error cases
      if (error.status === 422) {
        // Handle validation errors
        const validationErrors = {};
        if (error.errors) {
          error.errors.forEach((err) => {
            validationErrors[err.field] = err.message;
          });
        }
        setErrors(validationErrors);
      } else if (error.status === 409) {
        setErrors({
          email: 'An account with this email already exists',
        });
      } else {
        setErrors({
          general: error.message || 'Failed to create account. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      // Note: In a real implementation, you would use Google OAuth2 SDK
      // This is a placeholder for Google OAuth integration
      alert(
        'Google OAuth integration needs to be implemented. Please use email/password registration for now.'
      );

      // Example of how it would work:
      // const googleToken = await getGoogleToken(); // This would come from Google OAuth
      // await googleLogin(googleToken);
    } catch (error) {
      setErrors({
        general: error.message || 'Google sign up failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="flex flex-row min-h-screen bg-global-3">
      {/* Left Side - Sign Up Form */}
      <div className="flex flex-col w-full max-w-[531px] px-24 py-14">
        {/* Logo */}
        <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[381px] h-auto mb-6 sm:mb-8 lg:mb-10">
          <img src="/logo-auth.png" alt="DonaTrust Logo" className="object-contain w-full h-auto" />
        </div>

        {/* Sign Up Form */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-[46px]">
            <h1 className="text-[40px] font-inter font-bold leading-[49px] text-global-9 mb-4">
              Sign up
            </h1>
            <p className="text-lg font-inter font-normal leading-[22px] text-global-13">
              Sign up to join hands for the community with DonaTrust
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="flex flex-col space-y-6">
            {/* Name Field */}
            <div>
              <EditText
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                variant="floating"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 ml-3 text-sm text-red-500">{errors.name}</p>}
            </div>

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

            {/* Phone Field */}
            <div>
              <EditText
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                variant="floating"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 ml-3 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div>
              <EditText
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                variant="floating"
                showPasswordToggle={true}
              />
              {errors.confirmPassword && (
                <p className="mt-1 ml-3 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="p-3 mb-4 bg-red-50 rounded-md border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading || authLoading}
                className="w-[399px]"
              >
                {isLoading || authLoading ? 'Creating Account...' : 'Sign up'}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center w-[399px] h-6 my-6">
              <div className="flex-1 h-px bg-global-7"></div>
              <span className="px-4 text-base font-medium font-inter text-global-12">or</span>
              <div className="flex-1 h-px bg-global-7"></div>
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="google"
              size="large"
              onClick={handleGoogleSignUp}
              className="w-[399px] shadow-sm"
            >
              <span className="text-lg font-semibold font-inter text-global-9">
                Sign up with Google
              </span>
              <img src="/images/img_plus.svg" alt="Google" className="ml-4 w-6 h-6" />
            </Button>

            {/* Sign In Link */}
            <div className="pt-6 text-center">
              <p className="text-lg font-inter text-global-11">
                <span className="font-normal">Already have an account? </span>
                <button
                  type="button"
                  onClick={handleSignInRedirect}
                  className="font-semibold underline text-button-4 hover:no-underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="relative flex-1">
        <img
          src="/images/img_container.png"
          alt="Children playing in traditional clothing"
          className="w-full h-full object-cover rounded-l-[24px]"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
