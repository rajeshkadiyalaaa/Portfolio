import React, { useState, useEffect } from 'react';
import { Bird, Menu, X } from 'lucide-react';
import { useBirdPreference } from '../../hooks/useBirdPreference';
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/nav';

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
  const { birdEnabled, toggleBird } = useBirdPreference();

  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) => {
      const id = link.href.replace('#', '');
      return document.getElementById(id);
    }).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const id = visible[0].target.id;
        const match = NAV_LINKS.find((link) => link.href === `#${id}`);
        if (match) setActiveLink(match.label);
      },
      {
        rootMargin: '-42% 0px -48% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (label: string) => {
    setActiveLink(label);
    setMobileOpen(false);
  };

  return (
    <nav className="rk-nav">
      <div className="rk-nav-icons">
        <button
          type="button"
          className={`rk-nav-bird-toggle${birdEnabled ? ' rk-nav-bird-toggle--on' : ''}`}
          onClick={toggleBird}
          aria-pressed={birdEnabled}
          aria-label={birdEnabled ? 'Hide companion bird' : 'Show companion bird'}
          title={birdEnabled ? 'Hide bird' : 'Show bird'}
        >
          <Bird size={18} strokeWidth={1.75} />
        </button>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" data-bird-perch>
          <LinkedInIcon />
        </a>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" title="GitHub" data-bird-perch>
          <GitHubIcon />
        </a>
        <a href={SOCIAL_LINKS.email} title="Email" data-bird-perch>
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
            data-bird-perch
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href={SOCIAL_LINKS.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="rk-btn-resume"
        data-bird-perch
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
              data-bird-perch
            >
              {link.label}
            </a>
          ))}
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rk-btn-resume"
            style={{ width: 'fit-content' }}
            data-bird-perch
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
