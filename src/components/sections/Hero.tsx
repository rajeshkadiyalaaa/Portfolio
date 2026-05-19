import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useHeroVideoPlayback } from '../../hooks/useHeroVideoPlayback';
import { WaterRipple } from '../ui/water-ripple';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { skipVideo, media } = useHeroVideoPlayback(sectionRef, videoRef);
  const [videoUnavailable, setVideoUnavailable] = useState(skipVideo);
  const showVideo = !skipVideo && !videoUnavailable;

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`rk-hero${media.isMobile ? ' rk-hero--mobile' : ''}`}
      data-water-ripple
    >
      <WaterRipple />
      <div className="rk-hero-bg" aria-hidden />

      <div
        className="rk-hero-poster"
        role="presentation"
        aria-hidden
        style={{ backgroundImage: `url('${media.poster}')` }}
      />

      {showVideo ? (
        <video
          ref={videoRef}
          className="rk-hero-video"
          src={media.videoSrc}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          onError={() => setVideoUnavailable(true)}
        />
      ) : null}

      <div className="rk-hero-glow" aria-hidden />
      <div className="rk-hero-scrim" aria-hidden />

      <div className="rk-hero-content">
        <h1 className="rk-name">
          Rajesh
          <br />
          Kadiyala
        </h1>
        <p className="rk-title">
          <TypeAnimation
            sequence={[
              'AI/ML Engineer',
              2000,
              'Graphic & Product Designer',
              2000,
              'Data Analyst',
              2000,
              'Operations & Startup Executive',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </p>
        <a href="#contact" className="rk-hero-cta" data-bird-perch>
          Let&apos;s Talk
          <ArrowRight className="rk-hero-cta__arrow" size={20} strokeWidth={2} aria-hidden />
        </a>
      </div>
    </section>
  );
};

export default Hero;
