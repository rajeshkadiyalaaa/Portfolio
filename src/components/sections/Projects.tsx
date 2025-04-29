import React from 'react';
import { Code2, Globe, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "AI Writing Assistant",
    description: "A full-stack AI-powered writing assistant using React, Node.js, and Python with OpenRouter LLMs for real-time grammar correction, tone/style transformation, and content enhancement.",
    technologies: ["React", "Node.js", "Python", "Flask", "Express", "OpenRouter LLMs", "NLTK", "SQLite"],
    liveUrl: "https://example.com/ai-writing-assistant",
    githubUrl: "https://github.com/rajeshkadiyalaaa/AI-writing-assistant.git"
  },
  {
    title: "Dental Caries Analysis System",
    description: "A deep learning system using Mask R-CNN, ResNet-50, and BERT to detect cavities, classify severity, and generate personalized dental care recommendations from X-ray images.",
    technologies: ["Python", "TensorFlow", "Flask", "Mask R-CNN", "ResNet-50", "BERT", "Transfer Learning"],
    liveUrl: "https://example.com/dental-caries-analysis",
    githubUrl: "https://github.com/rajeshkadiyalaaa/Dental-Caries-Detection.git"
  },
  {
    title: "Adaptive Style Transfer with CycleGAN",
    description: "Implemented a custom CycleGAN with Adaptive Instance Normalization (AdaIN) to enable arbitrary style transfer without retraining for new styles, with a Flask-based web app for real-time user-defined style transfer.",
    technologies: ["Python", "PyTorch", "Flask", "CycleGAN", "AdaIN", "Deep Learning"],
    githubUrl: "https://github.com/rajeshkadiyalaaa/Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration.git"
  },
  {
    title: "Sales Data Analysis Dashboard",
    description: "An interactive dashboard built with SQL and Streamlit for sales data analysis, with data cleaning, transformation, and visualization capabilities for extracting sales insights by region, product, and time.",
    technologies: ["Python", "SQL", "Pandas", "Streamlit", "Matplotlib", "Seaborn", "Plotly", "SQLite"],
    githubUrl: "https://github.com/rajeshkadiyalaaa/Sales-Data-Analysis-Project.git"
  }
];

function Projects() {
  return (
    <section id="projects" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 fade-up">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto fade-up">
          A selection of my recent AI, machine learning, and full-stack development projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300 fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Globe size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <Github size={18} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects; 