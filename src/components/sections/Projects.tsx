import React from 'react';
import {
  Bot,
  LineChart,
  Palette,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  icon: LucideIcon;
  previewClass: string;
}

const projects: Project[] = [
  {
    title: 'AI Writing Assistant',
    description:
      'A full-stack AI-powered writing assistant for real-time grammar correction, tone transformation, and content enhancement.',
    technologies: ['React', 'Python', 'OpenRouter LLMs'],
    liveUrl: 'https://example.com/ai-writing-assistant',
    githubUrl: 'https://github.com/rajeshkadiyalaaa/AI-writing-assistant.git',
    icon: Bot,
    previewClass: 'rk-project-preview-ai',
  },
  {
    title: 'Dental Caries Analysis',
    description:
      'Deep learning system using Mask R-CNN and BERT to detect cavities, classify severity, and generate dental care recommendations.',
    technologies: ['Python', 'TensorFlow', 'Flask'],
    liveUrl: 'https://example.com/dental-caries-analysis',
    githubUrl: 'https://github.com/rajeshkadiyalaaa/Dental-Caries-Detection.git',
    icon: Stethoscope,
    previewClass: 'rk-project-preview-med',
  },
  {
    title: 'Adaptive Style Transfer',
    description:
      'Custom CycleGAN with AdaIN for arbitrary style transfer without retraining, with a Flask web app for real-time results.',
    technologies: ['Python', 'PyTorch', 'CycleGAN'],
    githubUrl:
      'https://github.com/rajeshkadiyalaaa/Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration.git',
    icon: Palette,
    previewClass: 'rk-project-preview-style',
  },
  {
    title: 'Sales Data Dashboard',
    description:
      'Interactive dashboard for sales analysis with data cleaning, transformation, and visualization by region and product.',
    technologies: ['Python', 'SQL', 'Streamlit'],
    githubUrl: 'https://github.com/rajeshkadiyalaaa/Sales-Data-Analysis-Project.git',
    icon: LineChart,
    previewClass: 'rk-project-preview-sales',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="rk-projects">
      <div className="rk-projects-bg" aria-hidden />

      <div className="rk-projects-inner">
        <header className="rk-projects-header">
          <p className="rk-projects-label">Projects</p>
          <h2 className="rk-projects-heading">Things I&apos;ve Built</h2>
          <p className="rk-projects-subtitle">
            A collection of AI-powered solutions and full-stack applications designed to solve
            real-world problems.
          </p>
        </header>

        <div className="rk-projects-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            const projectUrl = project.liveUrl || project.githubUrl || '#';

            return (
              <article key={project.title} className="rk-project-card">
                <div className={`rk-project-card-media ${project.previewClass}`}>
                  <div className="rk-project-card-media-inner">
                    <Icon size={48} strokeWidth={1.25} color="rgba(255,255,255,0.35)" />
                  </div>
                </div>
                <span className="rk-project-card-icon" aria-hidden>
                  <Icon size={18} strokeWidth={2.25} />
                </span>

                <div className="rk-project-card-body">
                  <h3 className="rk-project-card-title">{project.title}</h3>
                  <p className="rk-project-card-desc">{project.description}</p>
                  <div className="rk-project-card-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rk-project-card-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rk-project-card-link"
                  >
                    View Project →
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rk-projects-cta-wrap">
          <a
            href="https://github.com/rajeshkadiyalaaa"
            target="_blank"
            rel="noopener noreferrer"
            className="rk-projects-cta"
          >
            View all Projects →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
