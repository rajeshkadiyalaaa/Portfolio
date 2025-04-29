import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import AnimatedBackground from '../AnimatedBackground';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 z-10 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Rajesh Kadiyala
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            <TypeAnimation
              sequence={[
                'AI & ML Engineer',
                2000,
                'Web Developer',
                2000,
                'Data Analyst',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Building intelligent systems and applications that combine AI, machine learning, and web technologies to solve real-world problems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4 mb-12"
          >
            <a href="https://github.com/rajeshkadiyalaaa" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Github className="mr-2" size={20} />
                GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rajesh-kadiyala" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Linkedin className="mr-2" size={20} />
                LinkedIn
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg">
                <Mail className="mr-2" size={20} />
                Contact Me
              </Button>
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#about" className="inline-block animate-bounce">
              <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 