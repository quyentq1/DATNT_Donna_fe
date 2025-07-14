// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      "Tìm kiếm chiến dịch...": "Tìm kiếm chiến dịch...",
      "Chiến dịch": "Chiến dịch",
      "Tổ chức gây quỹ": "Tổ chức gây quỹ",
      "Giới thiệu": "Giới thiệu",
      "Đăng nhập": "Đăng nhập",
      "Đăng ký": "Đăng ký",
    }
  },
  en: {
    translation: {
      "Tìm kiếm chiến dịch...": "Search campaign...",
      "Chiến dịch": "Campaign",
      "Tổ chức gây quỹ": "Organizations",
      "Giới thiệu": "About",
      "Đăng nhập": "Login",
      "Đăng ký": "Register",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // default language
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
