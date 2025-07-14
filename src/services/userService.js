import api from './api';

class UserService {
  // Get user profile (authenticated)
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile (authenticated)
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password (authenticated)
  async changePassword(passwordData) {
    try {
      const response = await api.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload avatar (authenticated)
  async uploadAvatar(avatarFile) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await api.post('/users/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Deactivate account (authenticated)
  async deactivateAccount() {
    try {
      const response = await api.put('/users/deactivate');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user statistics (authenticated)
  async getUserStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user donations (authenticated)
  async getUserDonations(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.status) params.append('status', filters.status);

      const queryString = params.toString();
      const url = queryString ? `/donations?${queryString}` : '/donations';

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user's supported campaigns (authenticated)
  async getSupportedCampaigns() {
    try {
      const response = await api.get('/users/supported-campaigns');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      return {
        status,
        message: data.message || 'An error occurred',
        errors: data.errors || [],
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 0,
        message: 'Network error. Please check your connection.',
        errors: [],
      };
    } else {
      // Something else happened
      return {
        status: 0,
        message: error.message || 'An unexpected error occurred',
        errors: [],
      };
    }
  }
}

export default new UserService();
