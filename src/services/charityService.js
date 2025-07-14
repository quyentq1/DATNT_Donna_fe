import api from './api';

class CharityService {
  // Get all charities (public)
  async getAllCharities(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const queryString = params.toString();
      const url = queryString ? `/charities?${queryString}` : '/charities';

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get charity by ID (public)
  async getCharityById(id) {
    try {
      const response = await api.get(`/charities/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Register charity (authenticated)
  async registerCharity(charityData) {
    try {
      // Map frontend nested structure to backend flat structure
      const backendData = {
        name: charityData.organizationInfo?.name || charityData.organizationName,
        description: charityData.purposeOfRegistration,
        mission: charityData.purposeOfRegistration, // Use purpose as mission for now
        license_number: charityData.documents?.license || 'pending_upload',
        license_document: charityData.documents?.license || 'pending_upload',
        address: charityData.organizationInfo?.address,
        city: charityData.organizationInfo?.city || 'Unknown', // Add default city
        phone: charityData.organizationInfo?.phoneNumber || charityData.organizationInfo?.phone,
        email: charityData.organizationInfo?.email,
        website_url: charityData.organizationInfo?.website || null,
      };

      console.log('📤 Charity registration payload:', backendData);

      const response = await api.post('/charities/register', backendData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get my charity (authenticated)
  async getMyCharity() {
    try {
      const response = await api.get('/charities/my-charity');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update my charity (authenticated)
  async updateMyCharity(charityData) {
    try {
      const response = await api.put('/charities/my-charity', charityData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get charity stats (authenticated)
  async getCharityStats() {
    try {
      const response = await api.get('/charities/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create campaign (authenticated)
  async createCampaign(campaignData) {
    try {
      const response = await api.post('/charities/campaigns', campaignData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get my campaigns (authenticated)
  async getMyCampaigns(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const queryString = params.toString();
      const url = queryString ? `/charities/campaigns?${queryString}` : '/charities/campaigns';

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get my campaign by ID (authenticated)
  async getMyCampaignById(id) {
    try {
      const response = await api.get(`/charities/campaigns/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update my campaign (authenticated)
  async updateMyCampaign(id, campaignData) {
    try {
      const response = await api.put(`/charities/campaigns/${id}`, campaignData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete my campaign (authenticated)
  async deleteMyCampaign(id) {
    try {
      const response = await api.delete(`/charities/campaigns/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add progress update (authenticated)
  async addProgressUpdate(campaignId, updateData) {
    try {
      const response = await api.post(`/charities/campaigns/${campaignId}/progress`, updateData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get campaign stats (authenticated)
  async getCampaignStats(campaignId) {
    try {
      const response = await api.get(`/charities/campaigns/${campaignId}/stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create financial report (authenticated)
  async createFinancialReport(reportData) {
    try {
      const response = await api.post('/charities/financial-reports', reportData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get my financial reports (authenticated)
  async getMyFinancialReports(filters = {}) {
    try {
      const params = new URLSearchParams();

      if (filters.year) params.append('year', filters.year);
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const queryString = params.toString();
      const url = queryString
        ? `/charities/financial-reports?${queryString}`
        : '/charities/financial-reports';

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get financial report by ID (authenticated)
  async getMyFinancialReportById(id) {
    try {
      const response = await api.get(`/charities/financial-reports/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update financial report (authenticated)
  async updateMyFinancialReport(id, reportData) {
    try {
      const response = await api.put(`/charities/financial-reports/${id}`, reportData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete financial report (authenticated)
  async deleteMyFinancialReport(id) {
    try {
      const response = await api.delete(`/charities/financial-reports/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate auto report (authenticated)
  async generateAutoReport(reportData) {
    try {
      const response = await api.post('/charities/financial-reports/generate', reportData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Submit financial report (authenticated)
  async submitFinancialReport(id) {
    try {
      const response = await api.post(`/charities/financial-reports/${id}/submit`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get financial overview (authenticated)
  async getFinancialOverview() {
    try {
      const response = await api.get('/charities/financial-overview');
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

export default new CharityService();
