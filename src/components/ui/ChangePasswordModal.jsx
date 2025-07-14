import React, { useState } from 'react';
import Button from './Button';
import EditText from './EditText';
import userService from '../../services/userService';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    setError(null);
  };

  const validateForm = () => {
    if (!formData.current_password) {
      setError('Current password is required');
      return false;
    }
    if (!formData.new_password) {
      setError('New password is required');
      return false;
    }
    if (formData.new_password.length < 6) {
      setError('New password must be at least 6 characters');
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.new_password)) {
      setError('New password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }
    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);

      await userService.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      setSuccess(true);
      // Reset form
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);

    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded">
            Password changed successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <EditText
            type="password"
            label="Current Password"
            value={formData.current_password}
            onChange={(e) => handleChange('current_password', e.target.value)}
            required
          />

          <EditText
            type="password"
            label="New Password"
            value={formData.new_password}
            onChange={(e) => handleChange('new_password', e.target.value)}
            required
          />

          <EditText
            type="password"
            label="Confirm New Password"
            value={formData.confirm_password}
            onChange={(e) => handleChange('confirm_password', e.target.value)}
            required
          />

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal; 