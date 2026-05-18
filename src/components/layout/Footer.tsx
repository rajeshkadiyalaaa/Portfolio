import React from 'react';
import { ScrollReveal } from '../ui/scroll-reveal';

const Footer: React.FC = () => {
  return (
    <ScrollReveal as="footer" variant="up" delay={0} className="rk-footer">
      <p>© {new Date().getFullYear()} Rajesh Kadiyala. All rights reserved.</p>
    </ScrollReveal>
  );
};

export default Footer;
