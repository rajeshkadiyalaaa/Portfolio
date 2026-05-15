import React, { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useHeroVideoPlayback } from '../../hooks/useHeroVideoPlayback';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipVideo = useHeroVideoPlayback(sectionRef, videoRef);

  return (
    <section id="home" className="rk-hero" ref={sectionRef}>
      <div className="rk-hero-bg" aria-hidden />

      {!skipVideo ? (
        <video
          ref={videoRef}
          className="rk-hero-video"
          poster="/hero-content.png"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
        />
      ) : (
        <div className="rk-hero-poster" role="presentation" aria-hidden />
      )}

      <div className="rk-hero-glow" aria-hidden />

      <div className="rk-hero-content">
        <h1 className="rk-name">
          Rajesh
          <br />
          Kadiyala
        </h1>
        <p className="rk-title">
          <TypeAnimation
            sequence={[
              'AI & ML Engineer',
              2000,
              'Web Developer',
              2000,
              'Data Analyst',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </p>
        <p className="rk-tagline">
          Building intelligent systems and applications that combine AI, machine learning, and web
          technologies to solve real-world problems.
        </p>
      </div>

      <a href="#about" className="rk-scroll-hint">
        <div className="rk-scroll-line" />
        Scroll
      </a>
    </section>
  );
};

export default Hero;
