import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/charity-registration" element={<CharityRegistrationPage />} />
        <Route path="/campaign/:id" element={<CampaignDetailPage />} />
        <Route path="/dao-registration" element={<DaoRegistrationPage />} />
        <Route path="/campaigns" element={<CampaignListPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/profile" element={<ProfileDashboardPage />} />
        <Route path="/notification" element={<NotificationPage />}/>
        <Route path="/registeradao" element={<DaoMemberPage />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;