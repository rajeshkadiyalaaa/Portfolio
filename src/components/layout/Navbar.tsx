import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      const match = NAV_LINKS.find((link) => link.href === `#${current}`);
      if (match) {
        setActiveLink(match.label);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string) => {
    setActiveLink(label);
    setMobileOpen(false);
  };

  return (
    <nav className="rk-nav">
      <div className="rk-nav-icons">
        <a
          href="https://www.linkedin.com/in/rajesh-kadiyala"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://github.com/rajeshkadiyalaaa"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <GitHubIcon />
        </a>
        <a href="mailto:rajeshkadiyala2003@gmail.com" title="Email">
          <MailIcon />
        </a>
      </div>

      <div className="rk-nav-links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={activeLink === link.label ? 'active' : ''}
            onClick={() => handleNavClick(link.label)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="Rajesh_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="rk-btn-resume"
      >
        Resume
      </a>

      <button
        type="button"
        className="rk-nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen && (
        <div className="rk-nav-mobile-menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={activeLink === link.label ? 'active' : ''}
              onClick={() => handleNavClick(link.label)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="Rajesh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rk-btn-resume"
            style={{ width: 'fit-content' }}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
