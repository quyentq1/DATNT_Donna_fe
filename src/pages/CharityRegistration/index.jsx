import React, { useState, useEffect } from 'react';
import Footer from '../../components/common/Footer';
import EditText from '../../components/ui/EditText';
import CheckBox from '../../components/ui/CheckBox';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import charityService from '../../services/charityService';

const CharityRegistration = () => {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    organizationName: '',
    website: '',
    organizationEmail: '',
    organizationPhone: '',
    address: '',
    purposeOfRegistration: '',
    confirmAccurate: false,
    agreeTerms: false,
  });

  const [files, setFiles] = useState({
    license: null,
    description: null,
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || user.name || '',
        email: user.email || '',
      }));
    }
  }, [isAuthenticated, user]);

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

  const handleCheckboxChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked,
    }));
    // Clear error when user checks
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));
    // Clear error when user selects file
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.organizationName.trim())
      newErrors.organizationName = 'Organization name is required';
    if (!formData.organizationEmail.trim())
      newErrors.organizationEmail = 'Organization email is required';
    if (!formData.organizationPhone.trim())
      newErrors.organizationPhone = 'Organization phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.purposeOfRegistration.trim())
      newErrors.purposeOfRegistration = 'Purpose of registration is required';

    // File validation
    if (!files.license) newErrors.license = 'License document is required';
    if (!files.description) newErrors.description = 'Organization description is required';

    // Checkbox validation
    if (!formData.confirmAccurate)
      newErrors.confirmAccurate = 'Please confirm information accuracy';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Please agree to terms and conditions';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.organizationEmail && !/\S+@\S+\.\S+/.test(formData.organizationEmail)) {
      newErrors.organizationEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!isAuthenticated) {
      alert('You must be logged in to register as a charity. Please sign in first.');
      window.location.href = '/signin';
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare form data for API
      const charityData = {
        representativeInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        },
        organizationInfo: {
          name: formData.organizationName,
          website: formData.website || null,
          email: formData.organizationEmail,
          phoneNumber: formData.organizationPhone,
          address: formData.address,
        },
        purposeOfRegistration: formData.purposeOfRegistration,
        // Note: File upload would typically be handled separately
        // or the API would need to accept multipart/form-data
        documents: {
          license: files.license?.name,
          description: files.description?.name,
          logo: files.logo?.name,
        },
      };

      await charityService.registerCharity(charityData);

      alert(
        'Charity registration submitted successfully! We will review your application and get back to you soon.'
      );

      // Reset form
      setFormData({
        fullName: user?.fullName || user?.name || '',
        email: user?.email || '',
        phoneNumber: '',
        role: '',
        organizationName: '',
        website: '',
        organizationEmail: '',
        organizationPhone: '',
        address: '',
        purposeOfRegistration: '',
        confirmAccurate: false,
        agreeTerms: false,
      });

      setFiles({
        license: null,
        description: null,
        logo: null,
      });
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
          general: 'A charity registration already exists for this user or organization.',
        });
      } else {
        setErrors({
          general: error.message || 'Registration failed. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-global-3 flex flex-col">
      {/* Hero Background Image */}
      <div
        className="relative w-full h-[349px] bg-cover bg-center"
        style={{ backgroundImage: `url('/images/img_.png')` }}
      >
        <div className="absolute top-[316px] right-[40px]">
          <img
            src="/images/img_24_user_interface_image.svg"
            alt="Image Icon"
            className="w-6 h-6 rounded-[5px]"
          />
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex justify-center items-start py-20">
        <div className="relative">
          {/* Form Background Image */}
          <img
            src="/images/img_image_27.png"
            alt="Form Background"
            className="w-[1115px] h-[743px]"
          />

          {/* Form Content Overlay */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[600px] bg-global-3 bg-opacity-95 p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-inter font-semibold text-center text-global-1 mb-8">
                REGISTER AS A CHARITY ORGANIZATION
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Representative Information */}
                <div>
                  <h2 className="text-lg font-inter font-medium text-global-1 mb-4">
                    REPRESENTATIVE INFORMATION
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Full Name
                      </label>
                      <EditText
                        value={formData.fullName}
                        onChange={handleInputChange('fullName')}
                        placeholder="Enter your full name"
                        required
                        error={errors.fullName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">Email</label>
                      <EditText
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        placeholder="Enter your email address"
                        required
                        error={errors.email}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Phone Number
                      </label>
                      <EditText
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange('phoneNumber')}
                        placeholder="Enter your phone number"
                        required
                        error={errors.phoneNumber}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">Role</label>
                      <EditText
                        value={formData.role}
                        onChange={handleInputChange('role')}
                        placeholder="Enter your role in the organization"
                        required
                        error={errors.role}
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Information */}
                <div>
                  <h2 className="text-lg font-inter font-medium text-global-1 mb-4">
                    ORGANIZATION INFORMATION
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Organization Name
                      </label>
                      <EditText
                        value={formData.organizationName}
                        onChange={handleInputChange('organizationName')}
                        placeholder="Enter organization name"
                        required
                        error={errors.organizationName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Website (optional)
                      </label>
                      <EditText
                        type="url"
                        value={formData.website}
                        onChange={handleInputChange('website')}
                        placeholder="Enter organization website"
                        error={errors.website}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Organization Email
                      </label>
                      <EditText
                        type="email"
                        value={formData.organizationEmail}
                        onChange={handleInputChange('organizationEmail')}
                        placeholder="Enter organization email"
                        required
                        error={errors.organizationEmail}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Organization Phone
                      </label>
                      <EditText
                        type="tel"
                        value={formData.organizationPhone}
                        onChange={handleInputChange('organizationPhone')}
                        placeholder="Enter organization phone number"
                        required
                        error={errors.organizationPhone}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">Address</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address')(e.target.value)}
                        placeholder="Enter organization address"
                        required
                        className="w-full px-3 py-2 border border-global-4 rounded-md text-base font-inter text-global-1 placeholder-edittext-2 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-1 focus:border-transparent resize-vertical min-h-[80px]"
                        error={errors.address}
                      />
                    </div>
                  </div>
                </div>

                {/* Verification Documents */}
                <div>
                  <h2 className="text-lg font-inter font-medium text-global-1 mb-4">
                    VERIFICATION DOCUMENTS
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-2">
                        Upload license / certification
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          onChange={handleFileChange('license')}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          id="license-upload"
                        />
                        <label
                          htmlFor="license-upload"
                          className="px-4 py-2 bg-global-2 border border-global-4 rounded-md cursor-pointer hover:bg-global-15 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-global-6">
                          {files.license ? files.license.name : 'No file chosen'}
                        </span>
                        {errors.license && <p className="text-sm text-red-500">{errors.license}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-2">
                        Upload organization description
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          onChange={handleFileChange('description')}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="description-upload"
                        />
                        <label
                          htmlFor="description-upload"
                          className="px-4 py-2 bg-global-2 border border-global-4 rounded-md cursor-pointer hover:bg-global-15 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-global-6">
                          {files.description ? files.description.name : 'No file chosen'}
                        </span>
                        {errors.description && (
                          <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-2">
                        Upload logo
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          onChange={handleFileChange('logo')}
                          accept=".jpg,.jpeg,.png,.svg"
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="px-4 py-2 bg-global-2 border border-global-4 rounded-md cursor-pointer hover:bg-global-15 transition-colors"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-global-6">
                          {files.logo ? files.logo.name : 'No file chosen'}
                        </span>
                        {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purpose of Registration */}
                <div>
                  <h2 className="text-lg font-inter font-medium text-global-1 mb-4">
                    PURPOSE OF REGISTRATION
                  </h2>
                  <textarea
                    value={formData.purposeOfRegistration}
                    onChange={(e) => handleInputChange('purposeOfRegistration')(e.target.value)}
                    placeholder="Please describe your purpose for registering with DonaTrust and how you plan to use the platform..."
                    required
                    className="w-full px-3 py-2 border border-global-4 rounded-md text-base font-inter text-global-1 placeholder-edittext-2 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-1 focus:border-transparent resize-vertical min-h-[100px]"
                    error={errors.purposeOfRegistration}
                  />
                </div>

                {/* Confirmation Checkboxes */}
                <div className="space-y-3">
                  <CheckBox
                    checked={formData.confirmAccurate}
                    onChange={handleCheckboxChange('confirmAccurate')}
                    label="I confirm that the information provided is accurate"
                    error={errors.confirmAccurate}
                  />

                  <CheckBox
                    checked={formData.agreeTerms}
                    onChange={handleCheckboxChange('agreeTerms')}
                    label="I agree to the terms and conditions"
                    error={errors.agreeTerms}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="px-12 py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW'}
                  </Button>
                </div>
                {errors.general && <p className="text-center text-red-500">{errors.general}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CharityRegistration;
