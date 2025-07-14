import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Lấy clientId từ biến môi trường VITE_GOOGLE_CLIENT_ID */}
    <React.StrictMode>
      <App /> {/* 👈 Đây là phần bị thiếu khiến màn hình trắng */}
    </React.StrictMode>
  </GoogleOAuthProvider>
);
