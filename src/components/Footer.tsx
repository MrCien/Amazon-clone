// amazon_next_yt/components/Footer.tsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#232F3E] text-white text-sm mt-10">
      <div className="px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div>
          <h3 className="font-bold mb-2">Get to Know Us</h3>
          <ul>
            <li className="mb-1">About Us</li>
            <li className="mb-1">Careers</li>
            <li className="mb-1">Press Releases</li>
            <li className="mb-1">Amazon Science</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Connect with Us</h3>
          <ul>
            <li className="mb-1">Facebook</li>
            <li className="mb-1">Twitter</li>
            <li className="mb-1">Instagram</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul>
            <li className="mb-1">Sell on Amazon</li>
            <li className="mb-1">Become an Affiliate</li>
            <li className="mb-1">Advertise Your Products</li>
            <li className="mb-1">Amazon Pay</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul>
            <li className="mb-1">Your Account</li>
            <li className="mb-1">Returns Centre</li>
            <li className="mb-1">100% Purchase Protection</li>
            <li className="mb-1">Help</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 bg-[#131A22]">
        <p>© 2025 Amazon Clone by Shivam Namdeo</p>
      </div>
    </footer>
  );
};

export default Footer;
