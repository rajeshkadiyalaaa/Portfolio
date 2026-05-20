import React from 'react';
import { SKILL_TAGS } from '../../data/skills';
import { staticAsset } from '../../lib/staticAssets';
import { WaterRipple } from '../ui/water-ripple';
import { ScrollReveal } from '../ui/scroll-reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="rk-about" data-water-ripple>
      <WaterRipple />

      {/* Section-level art — frames portrait without sitting in the photo column */}
      <img
        src={staticAsset('/background/about_upper_left.png')}
        alt=""
        className="rk-about-upper-left"
        width={239}
        height={199}
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      <img
        src={staticAsset('/background/about_upper_right.png')}
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
            Generalist Engineer... 
          </ScrollReveal>
          <ScrollReveal as="p" variant="up" delay={200} className="rk-about-intro">
          Full-stack AI engineer specializing in Computer Vision, NLP, and production web applications. Based in Vijayawada, India.
          </ScrollReveal>
          <ScrollReveal as="p" variant="up" delay={280} className="rk-about-desc">
          I work at the intersection of machine learning and product engineering. On one side: training deep learning pipelines for real detection and classification problems. 
          On the other: building the interfaces and backend systems that make those models useful to actual people.
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
