import React from 'react';
import { SKILL_TAGS } from '../../data/skills';
import { WaterRipple } from '../ui/water-ripple';
import { ScrollReveal } from '../ui/scroll-reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="rk-about" data-water-ripple>
      <WaterRipple />

      {/* Section-level art — frames portrait without sitting in the photo column */}
      <img
        src="/background/about_upper_left.png"
        alt=""
        className="rk-about-upper-left"
        width={239}
        height={199}
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      <img
        src="/background/about_upper_right.png"
        alt=""
        className="rk-about-upper-right"
        width={344}
        height={368}
        loading="lazy"
        decoding="async"
        aria-hidden
      />

      <div className="rk-about-inner">
        <div className="rk-about-visual">
          <ScrollReveal variant="left" className="rk-about-photo-wrap">
            <div className="rk-about-photo-inner">
              <img src="/profile.png" alt="Rajesh Kadiyala" />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="right" className="rk-about-content">
          <ScrollReveal as="p" variant="up" delay={0} className="rk-about-label">
            About me
          </ScrollReveal>
          <ScrollReveal as="h2" variant="up" delay={100} className="rk-about-heading">
            AI Engineer, Product Designer & Creative Problem Solver.
          </ScrollReveal>
          <ScrollReveal as="p" variant="up" delay={200} className="rk-about-intro">
            I build intelligent, user-focused digital experiences that bridge the gap between
            technical complexity and intuitive design.
          </ScrollReveal>
          <ScrollReveal as="p" variant="up" delay={280} className="rk-about-desc">
            With a strong foundation in AI/ML engineering combined with hands-on startup operations
            and product thinking, I specialize in transforming raw logic into highly functional
            tools. Driven by an obsession with high-fidelity execution, I focus on building scalable
            products that solve real problems and create immediate business value.
          </ScrollReveal>
          <div className="rk-about-tags" role="list" aria-label="Technical skills">
            {SKILL_TAGS.map((tag, index) => (
              <ScrollReveal
                key={tag}
                variant="up"
                delay={380 + index * 80}
                className="rk-about-tag-reveal"
              >
                <span className="rk-about-tag" role="listitem" data-bird-perch>
                  {tag}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <img
        src="/about-footer.webp"
        srcSet="/about-footer-1280.webp 1280w, /about-footer.webp 1920w"
        sizes="100vw"
        alt=""
        className="rk-about-footer"
        loading="lazy"
        decoding="async"
        aria-hidden
      />
    </section>
  );
};

export default About;
