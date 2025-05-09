import React, { useRef, useState } from 'react';
import { Code2, Globe, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScroll, motion, useTransform } from 'framer-motion';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollX } = useScroll({
    container: carouselRef
  });
  
  // Create scroll progress for progress indicator
  const scrollProgress = useTransform(
    scrollX, 
    [0, (carouselRef.current?.scrollWidth || 0) - (carouselRef.current?.clientWidth || 0)], 
    ["0%", "100%"]
  );

  // Update active index based on scroll position
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.scrollWidth / projects.length;
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  // Handle scroll navigation
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 420; // Approximate width of a card + margin
      const newScrollPosition = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 fade-up">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto fade-up">
          A selection of my recent AI, machine learning, and full-stack development projects.
        </p>
        
        {/* Scroll progress indicator */}
        <div className="relative h-1 bg-gray-800 rounded-full mb-8 mx-auto w-48">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            style={{ width: scrollProgress }}
          />
        </div>
        
        {/* Scroll animation indicators */}
        <div className="relative">
          {/* Left scroll indicator */}
          <motion.div 
            className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              x: [-5, 0, -5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2
            }}
          >
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 bg-gray-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-600/40 hover:text-white transition-all border border-gray-700/30"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          </motion.div>
          
          {/* Right scroll indicator */}
          <motion.div 
            className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              x: [5, 0, 5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2
            }}
          >
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 bg-gray-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-600/40 hover:text-white transition-all border border-gray-700/30"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        
          {/* Mobile scroll hint */}
          <motion.div 
            className="absolute left-0 right-0 bottom-[-50px] md:hidden flex justify-center items-center"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              x: [-10, 10, -10]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3
            }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <ChevronLeft size={16} />
              <span>Swipe</span>
              <ChevronRight size={16} />
            </div>
          </motion.div>
        
        <div 
          ref={carouselRef} 
          className="flex overflow-x-auto pb-12 hide-scrollbar" 
          style={{ 
            scrollBehavior: 'smooth', 
            WebkitOverflowScrolling: 'touch'
          }}
          onScroll={handleScroll}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="flex-shrink-0 w-full md:w-[400px] mr-6 last:mr-0 bg-gray-900 rounded-xl overflow-hidden border border-gray-800/50"
              style={{ 
                animationDelay: `${index * 200}ms`,
                height: '350px' // Reduced height since we're removing the image
              }}
              whileHover={{ y: -10, boxShadow: "0 10px 30px -15px rgba(2, 12, 27, 0.7)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 flex flex-col h-full">
                <motion.h3 
                  className="text-xl font-semibold mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.title}
                </motion.h3>
                
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gray-800/60 text-sm px-3 py-1 rounded-full border border-gray-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-2">
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
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

export default Projects; 