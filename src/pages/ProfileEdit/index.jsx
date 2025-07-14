import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import userService from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    date_of_birth: '',
    address: '',
    district: '',
    ward: '',
    bio: '',
    profile_image: '',
  });

  const [originalData, setOriginalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getProfile();
      const userData = response.user || response;

      const profileData = {
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        gender: userData.gender || '',
        date_of_birth: userData.date_of_birth || '',
        address: userData.address || '',
        district: userData.district || '',
        ward: userData.ward || '',
        bio: userData.bio || '',
        profile_image: userData.profile_image || '',
      };

      setFormData(profileData);
      setOriginalData(profileData);
    } catch (error) {
      setError(error.message || 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      const changedFields = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== originalData[key] && key !== 'email') {
          changedFields[key] = formData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        return;
      }

      await userService.updateProfile(changedFields);
      setOriginalData({ ...formData });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="flex flex-col items-center">
        <img
          src={formData.profile_image || '/images/avt.jpg'}
          alt="Avatar"
          className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-md object-cover"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800">Edit Profile</h2>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4 md:px-8">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-6">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditText
              label="Full Name"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              required
            />
            <EditText
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <EditText
              label="Gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              placeholder="male / female / other"
            />
            <EditText
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
            />
            <EditText
              label="District"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
            />
            <EditText
              label="Ward"
              value={formData.ward}
              onChange={(e) => handleInputChange('ward', e.target.value)}
            />
            <EditText
              label="Address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <EditText
              label="Profile Image URL"
              value={formData.profile_image}
              onChange={(e) => handleInputChange('profile_image', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              maxLength={255}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/255</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (cannot change)</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 text-gray-500"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-48 h-12 font-bold"
            >
              {isSaving ? 'Saving...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
