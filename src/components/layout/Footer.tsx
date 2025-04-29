import React from 'react';
import { Code, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code size={24} className="text-purple-500" />
              <span className="text-white font-bold text-xl">Rajesh Kadiyala</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI & ML Engineer
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/rajeshkadiyalaaa" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rajesh-kadiyala" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:rajeshkadiyalaaa@gmail.com" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Expertise</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Deep Learning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Computer Vision</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Natural Language Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Full Stack Development</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Education</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Usha Rama College of Engineering and Technology</li>
              <li className="text-gray-400">B.Tech in AI & Machine Learning</li>
              <li className="text-gray-400">2021 - 2025</li>
              <li className="text-gray-400">GPA: 7.7</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rajesh Kadiyala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 