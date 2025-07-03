import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import EditText from '../../components/ui/EditText';
import CheckBox from '../../components/ui/CheckBox';
import Button from '../../components/ui/Button';

const CharityRegistration = () => {
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
    agreeTerms: false
  });

  const [files, setFiles] = useState({
    license: null,
    description: null,
    logo: null
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCheckboxChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    setFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.confirmAccurate || !formData.agreeTerms) {
      alert('Please confirm the information accuracy and agree to terms and conditions.');
      return;
    }

    // Simulate form submission
    alert('Registration submitted successfully! We will review your application and get back to you soon.');
    
    // Reset form
    setFormData({
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
      agreeTerms: false
    });
    
    setFiles({
      license: null,
      description: null,
      logo: null
    });
  };

  return (
    <div className="min-h-screen bg-global-3 flex flex-col">
      <Header />
      
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
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Email
                      </label>
                      <EditText
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        placeholder="Enter your email address"
                        required
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
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Role
                      </label>
                      <EditText
                        value={formData.role}
                        onChange={handleInputChange('role')}
                        placeholder="Enter your role in the organization"
                        required
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
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-inter text-global-1 mb-1">
                        Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        placeholder="Enter organization address"
                        required
                        className="w-full px-3 py-2 border border-global-4 rounded-md text-base font-inter text-global-1 placeholder-edittext-2 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-1 focus:border-transparent resize-vertical min-h-[80px]"
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
                    onChange={handleInputChange('purposeOfRegistration')}
                    placeholder="Please describe your purpose for registering with DonaTrust and how you plan to use the platform..."
                    required
                    className="w-full px-3 py-2 border border-global-4 rounded-md text-base font-inter text-global-1 placeholder-edittext-2 bg-global-3 focus:outline-none focus:ring-2 focus:ring-button-1 focus:border-transparent resize-vertical min-h-[100px]"
                  />
                </div>

                {/* Confirmation Checkboxes */}
                <div className="space-y-3">
                  <CheckBox
                    checked={formData.confirmAccurate}
                    onChange={handleCheckboxChange('confirmAccurate')}
                    label="I confirm that the information provided is accurate"
                  />
                  
                  <CheckBox
                    checked={formData.agreeTerms}
                    onChange={handleCheckboxChange('agreeTerms')}
                    label="I agree to the terms and conditions"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    className="px-12 py-3"
                  >
                    SUBMIT FOR REVIEW
                  </Button>
                </div>
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