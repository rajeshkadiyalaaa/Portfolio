import React from 'react';
import CareerAlternatingTimeline from '../background/CareerAlternatingTimeline';
import { staticAsset } from '../../lib/staticAssets';
import { WaterRipple } from '../ui/water-ripple';
import { ScrollReveal } from '../ui/scroll-reveal';
import { BrushUnderline } from '../ui/brush-underline';
import { SectionLabel } from '../ui/section-label';

const Background: React.FC = () => {
  return (
    <section id="background" className="rk-background" data-water-ripple>
      <div className="rk-background-art" aria-hidden>
        <img
          src={staticAsset('/background/upper_left.png')}
          alt=""
          className="rk-background-art__piece rk-background-art__piece--upper-left"
          width={269}
          height={173}
          loading="lazy"
          decoding="async"
        />
        <img
          src={staticAsset('/background/upper_right.png')}
          alt=""
          className="rk-background-art__piece rk-background-art__piece--upper-right"
          width={452}
          height={298}
          loading="lazy"
          decoding="async"
        />
        <img
          src={staticAsset('/background/downleft.png')}
          alt=""
          className="rk-background-art__piece rk-background-art__piece--down-left"
          width={279}
          height={331}
          loading="lazy"
          decoding="async"
        />
        <img
          src={staticAsset('/background/downright.png')}
          alt=""
          className="rk-background-art__piece rk-background-art__piece--down-right"
          width={697}
          height={376}
          loading="lazy"
          decoding="async"
        />
      </div>

      <WaterRipple />

      <div className="rk-background-inner">
        <header className="rk-background-header">
          <ScrollReveal variant="up" delay={0}>
            <SectionLabel>Background</SectionLabel>
          </ScrollReveal>
          <ScrollReveal as="h2" variant="up" delay={100} className="rk-background-heading">
            My Path. My Progress.
          </ScrollReveal>
          <BrushUnderline />
          <ScrollReveal as="p" variant="up" delay={200} className="rk-background-subtitle">
            A journey of continuous learning, hands-on experience, and building meaningful impact
            through technology.
          </ScrollReveal>
        </header>

        <CareerAlternatingTimeline />
      </div>
    </section>
  );
};

export default Background;
