import React from 'react';

const SKILL_TAGS = [
  'Python',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'Pandas',
  'NumPy',
  'SQL',
  'React',
  'Flask',
  'OpenAI API',
  'Git',
];

const About: React.FC = () => {
  return (
    <section id="about" className="rk-about">
      <div className="rk-about-inner">
        <div className="rk-about-photo-wrap">
          <div className="rk-about-photo-ring" aria-hidden />
          <div className="rk-about-photo">
            <img src="/profile.png" alt="Rajesh Kadiyala" />
          </div>
        </div>

        <div className="rk-about-content">
          <p className="rk-about-label">About me</p>
          <h2 className="rk-about-heading">
            Building intelligent systems with design, discipline, and precision.
          </h2>
          <p className="rk-about-intro">
            AI Engineer focused on Machine Learning, Generative AI, and intelligent systems.
          </p>
          <p className="rk-about-desc">
            I build products that combine clean design, real-world utility, and technical depth —
            from AI-powered applications to full-stack systems.
          </p>
          <div className="rk-about-tags">
            {SKILL_TAGS.map((tag) => (
              <span key={tag} className="rk-about-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <img src="/mountain.svg" alt="" className="rk-about-mountains" aria-hidden />
    </section>
  );
};

export default About;
