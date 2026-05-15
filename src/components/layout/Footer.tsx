import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="rk-footer">
      <p>© {new Date().getFullYear()} Rajesh Kadiyala. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
