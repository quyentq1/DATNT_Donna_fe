import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    accountName: 'Đạt Nguyễn Tiến',
    contactEmail: 'datnguyen109@gmail.com',
    sex: '',
    dateOfBirth: '',
    phoneNumber: '',
    linkFacebook: '',
    linkYoutube: '',
    linkTiktok: '',
    address: '',
    introduction: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Information updated successfully!');
  };

  return (
    <div className="min-h-screen bg-global-3 shadow-2xl">
      <Header />

      {/* Add padding-top to push below fixed header */}
      <main className="relative pt-24">
        {/* Avatar and Label */}
        <div className="flex flex-col items-center">
          <img 
            src="/images/avt.jpg" 
            alt="Profile Picture" 
            className="w-[120px] h-[120px] rounded-full border-4 border-global-3 bg-white"
          />
          <span className="mt-4 text-xl font-bold font-inter text-global-8">List</span>
        </div>

        {/* Edit Form Section */}
<div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <h1 className="text-2xl font-bold font-inter text-global-1 text-center mb-12">
            Edit personal information
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <EditText
                  label="Account Name"
                  value={formData.accountName}
                  onChange={(value) => handleInputChange('accountName', value)}
                  required
                  className="h-[45px]"
                />

                <div>
                  <label className="block text-sm font-medium font-inter text-global-4 mb-1">
                    Sex
                  </label>
                  <select
                    value={formData.sex}
                    onChange={(e) => handleInputChange('sex', e.target.value)}
                    className="w-full h-[45px] px-3 py-2 border border-global-8 rounded-lg bg-global-3 text-base font-inter text-global-9 outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium font-inter text-global-4 mb-1">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full h-[45px] px-3 py-2 border border-global-8 rounded-lg bg-global-3 text-base font-inter text-global-9 outline-none"
                    placeholder="dd/mm/yyyy"
                  />
                </div>

                <EditText
                  label="Phone number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(value) => handleInputChange('phoneNumber', value)}
                  placeholder="Phone number"
                  className="h-[45px]"
                />

                <EditText
                  label="Introduce yourself"
                  value={formData.introduction}
                  onChange={(value) => handleInputChange('introduction', value)}
                  placeholder="Maximum 255 characters"
                  rows={4}
                  maxLength={255}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <EditText
                  label="Contact Email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(value) => handleInputChange('contactEmail', value)}
                  className="h-[45px]"
                />

                <EditText
                  label="Link Facebook"
                  value={formData.linkFacebook}
                  onChange={(value) => handleInputChange('linkFacebook', value)}
                  placeholder="Link facebook"
                  className="h-[45px]"
                />

                <EditText
                  label="Link Youtube"
                  value={formData.linkYoutube}
                  onChange={(value) => handleInputChange('linkYoutube', value)}
                  placeholder="Link youtube"
                  className="h-[45px]"
                />

                <EditText
                  label="Link Tiktok"
                  value={formData.linkTiktok}
                  onChange={(value) => handleInputChange('linkTiktok', value)}
                  placeholder="Link tiktok"
                  className="h-[45px]"
                />

                <EditText
                  label="Address"
                  value={formData.address}
                  onChange={(value) => handleInputChange('address', value)}
                  placeholder="Address"
                  className="h-[45px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                variant="primary"
                className="w-[153px] h-[31px] text-xs font-bold"
              >
                Update Information
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileEdit;
