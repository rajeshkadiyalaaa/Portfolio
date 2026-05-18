import React from 'react';
import { PROJECTS } from '../../data/projects';
import { SOCIAL_LINKS } from '../../data/nav';
import ProjectCarousel from '../projects/ProjectCarousel';
import { WaterRipple } from '../ui/water-ripple';
import { ScrollReveal } from '../ui/scroll-reveal';
import { SectionLabel } from '../ui/section-label';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="rk-projects" data-water-ripple>
      <WaterRipple />
      <img
        src="/mountain-art.webp"
        alt=""
        className="rk-projects-mountain-art"
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      <img
        src="/mountain-right.webp"
        alt=""
        className="rk-projects-mountain-right"
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      <div className="rk-projects-bg" aria-hidden />

      <div className="rk-projects-inner">
        <header className="rk-projects-header">
          <ScrollReveal variant="up" delay={0}>
            <SectionLabel>Projects</SectionLabel>
          </ScrollReveal>
          <ScrollReveal as="h2" variant="up" delay={100} className="rk-projects-heading">
            Things I&apos;ve Built
          </ScrollReveal>
          <ScrollReveal as="p" variant="up" delay={200} className="rk-projects-subtitle">
            These are some of the projects I built throughout my journey.
          </ScrollReveal>
        </header>

        <ScrollReveal variant="up" delay={280}>
          <ProjectCarousel />
        </ScrollReveal>

        <ScrollReveal variant="up" delay={PROJECTS.length * 100 + 80} className="rk-projects-cta-wrap">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rk-projects-cta"
            data-bird-perch
          >
            View all Projects →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
