import React from 'react';
import { Link } from 'react-router-dom';
import EditText from '../ui/EditText';

const Footer = () => {
  return (
    <footer className="w-full bg-footer-1 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-y-10">
        {/* Logo + Copyright */}
        <div className="flex flex-col max-w-[270px]">
          <img
            src="/images/img_footerlogo.png"
            alt="Footer Logo"
            className="w-[198px] h-[62px]"
          />
          <p className="text-[9px] font-inter text-footer-1 mt-4">Copyright © 2025.</p>
          <p className="text-[9px] font-inter text-footer-1">All rights reserved</p>
          <div className="flex flex-row mt-4 space-x-4">
            <img src="/images/img_social_icons.svg" alt="Social Icon" className="w-[22px] h-[22px]" />
            <img src="/images/img_social_icons_white_a700.svg" alt="Social Icon" className="w-[22px] h-[22px]" />
            <img src="/images/img_social_icons_white_a700_22x22.svg" alt="Social Icon" className="w-[22px] h-[22px]" />
            <img src="/images/img_social_icons_22x22.svg" alt="Social Icon" className="w-[22px] h-[22px]" />
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h3 className="text-[13px] font-inter font-semibold text-global-8">Company</h3>
          <Link to="/about" className="text-[9px] font-inter text-footer-1 mt-4">About us</Link>
          <Link to="/blog" className="text-[9px] font-inter text-footer-1 mt-1">Blog</Link>
          <Link to="/contact" className="text-[9px] font-inter text-footer-1 mt-1">Contact us</Link>
          <Link to="/pricing" className="text-[9px] font-inter text-footer-1 mt-1">Pricing</Link>
          <Link to="/testimonials" className="text-[9px] font-inter text-footer-1 mt-1">Testimonials</Link>
        </div>

        {/* Support Links */}
        <div className="flex flex-col">
          <h3 className="text-[13px] font-inter font-semibold text-global-8">Support</h3>
          <Link to="/help" className="text-[9px] font-inter text-footer-1 mt-4">Help center</Link>
          <Link to="/terms" className="text-[9px] font-inter text-footer-1 mt-1">Terms of service</Link>
          <Link to="/legal" className="text-[9px] font-inter text-footer-1 mt-1">Legal</Link>
          <Link to="/privacy" className="text-[9px] font-inter text-footer-1 mt-1">Privacy policy</Link>
          <Link to="/status" className="text-[9px] font-inter text-footer-1 mt-1">Status</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col max-w-[220px]">
          <h3 className="text-[13px] font-inter font-semibold text-global-8">Stay up to date</h3>
          <div className="mt-4">
            <EditText placeholder="Your email address" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
