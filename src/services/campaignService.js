import api from './api';

class CampaignService {
  // Get all campaigns (public)
  async getAllCampaigns(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filter parameters
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const queryString = params.toString();
      const url = queryString ? `/campaigns?${queryString}` : '/campaigns';

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get featured campaigns (public)
  async getFeaturedCampaigns() {
    try {
      const response = await api.get('/campaigns/featured');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get campaign categories (public)
  async getCategories() {
    try {
      const response = await api.get('/campaigns/categories');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get campaign by ID (public)
  async getCampaignById(id) {
    try {
      const response = await api.get(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create new campaign (authenticated)
  async createCampaign(campaignData) {
    try {
      const response = await api.post('/campaigns', campaignData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update campaign (authenticated)
  async updateCampaign(id, campaignData) {
    try {
      const response = await api.put(`/campaigns/${id}`, campaignData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete campaign (authenticated)
  async deleteCampaign(id) {
    try {
      const response = await api.delete(`/campaigns/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search campaigns
  async searchCampaigns(searchTerm, filters = {}) {
    try {
      const params = new URLSearchParams();
      params.append('search', searchTerm);

      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/campaigns?${params.toString()}`);
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

export default new CampaignService();
