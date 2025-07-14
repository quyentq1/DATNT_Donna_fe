import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import AdminLayout from './components/common/AdminLayout';

// Import page components
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import CharityRegistrationPage from './pages/CharityRegistration';
import CampaignDetailPage from './pages/CampaignDetail';
import DaoRegistrationPage from './pages/DaoRegistration';
import CampaignListPage from './pages/CampaignList';
import ProfileEditPage from './pages/ProfileEdit';
import ProfileDashboardPage from './pages/ProfileDashboard';
import NotificationPage from './pages/Notification';
import DaoMemberPage from './pages/RegisterDAO';
import DonationPage from './pages/DonationPage';
import VerifyEmailPage from './pages/VerifyEmail';

import { default as NewsManagement } from './pages/Admin/NewsManagement';
import CharityPendingPage from './pages/CharityPending';
import { CampaignDetail as AdminCampaignDetail } from './pages/CharityPending';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Admin routes */}
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <NewsManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/charity-pending"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <CharityPendingPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/charity-pending/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AdminCampaignDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="campaigns" element={<CampaignListPage />} />
          <Route path="campaign/:id" element={<CampaignDetailPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="registeradao" element={<DaoMemberPage />} />
          <Route path="donationinfor" element={<DonationPage />} />

          {/* Protected routes */}
          <Route
            path="charity-registration"
            element={
              <ProtectedRoute>
                <CharityRegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="dao-registration"
            element={
              <ProtectedRoute>
                <DaoRegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileDashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
