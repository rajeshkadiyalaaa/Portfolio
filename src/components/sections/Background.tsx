import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EDUCATION, EXPERIENCE, type TimelineEntry } from '../../data/background';
import { WaterRipple } from '../ui/water-ripple';
import { ScrollReveal } from '../ui/scroll-reveal';
import { BrushUnderline } from '../ui/brush-underline';
import { SectionLabel } from '../ui/section-label';

type BackgroundColumnProps = {
  title: string;
  icon: React.ReactNode;
  entries: TimelineEntry[];
  baseDelay: number;
};

const BackgroundColumn: React.FC<BackgroundColumnProps> = ({ title, icon, entries, baseDelay }) => (
  <div className="rk-background-column">
    <ScrollReveal variant="up" delay={baseDelay} className="rk-background-column-header">
      <span className="rk-background-column-icon" aria-hidden data-bird-perch>
        {icon}
      </span>
      <div className="rk-background-column-heading">
        <h3 className="rk-background-column-title">{title}</h3>
        <BrushUnderline align="center" />
      </div>
    </ScrollReveal>

    <div className="rk-background-timeline" aria-label={`${title} timeline`}>
      {entries.map((entry, index) => (
        <ScrollReveal
          key={`${entry.title}-${entry.period}`}
          as="article"
          variant="up"
          delay={baseDelay + 80 + index * 90}
          className="rk-background-entry"
        >
          <div className="rk-background-entry-rail">
            <time className="rk-background-date" dateTime={entry.period}>
              {entry.period}
            </time>
            <span className="rk-background-node" aria-hidden />
          </div>
          <div className="rk-background-card">
            <h4 className="rk-background-card-title">{entry.title}</h4>
            <p className="rk-background-card-org">{entry.organization}</p>
            <p className="rk-background-card-desc">{entry.description}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
);

const Background: React.FC = () => {
  return (
    <section id="background" className="rk-background" data-water-ripple>
      <div className="rk-background-art" aria-hidden>
        <img
          src="/background/upper_left.png"
          alt=""
          className="rk-background-art__piece rk-background-art__piece--upper-left"
          width={269}
          height={173}
          loading="lazy"
          decoding="async"
        />
        <img
          src="/background/upper_right.png"
          alt=""
          className="rk-background-art__piece rk-background-art__piece--upper-right"
          width={452}
          height={298}
          loading="lazy"
          decoding="async"
        />
        <img
          src="/background/downleft.png"
          alt=""
          className="rk-background-art__piece rk-background-art__piece--down-left"
          width={279}
          height={331}
          loading="lazy"
          decoding="async"
        />
        <img
          src="/background/downright.png"
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

        <div className="rk-background-columns">
          <BackgroundColumn
            title="Education"
            icon={<GraduationCap size={22} strokeWidth={1.75} />}
            entries={EDUCATION}
            baseDelay={280}
          />
          <BackgroundColumn
            title="Experience"
            icon={<Briefcase size={22} strokeWidth={1.75} />}
            entries={EXPERIENCE}
            baseDelay={320}
          />
        </div>
      </div>
    </section>
  );
};

export default Background;
