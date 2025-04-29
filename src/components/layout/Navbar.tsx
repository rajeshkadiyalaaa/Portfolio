import React, { useState, useEffect } from 'react';
import { Menu, X, Code, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleResumeDropdown = () => {
    setResumeDropdownOpen(!resumeDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => {
      setResumeDropdownOpen(false);
    };

    if (resumeDropdownOpen) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [resumeDropdownOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Code size={24} className="text-purple-500" />
            <span className="text-white font-bold text-xl ml-2">Rajesh Kadiyala</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleResumeDropdown();
                }}
                className="flex items-center"
              >
                Resume <ChevronDown size={16} className="ml-2" />
              </Button>
              
              {resumeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 z-10">
                  <a 
                    href="Rajesh_Resume.pdf"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    View Resume
                  </a>
                  <a 
                    href="Rajesh_Resume.pdf"
                    download="Rajesh_Kadiyala_Resume.pdf"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-4 space-y-4 flex flex-col">
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#skills"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="space-y-2 mt-2">
              <a
                href="Rajesh_Resume.pdf"
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full justify-center" variant="outline">
                  View Resume
                </Button>
              </a>
              <a
                href="Rajesh_Resume.pdf"
                download="Rajesh_Kadiyala_Resume.pdf"
                className="block"
              >
                <Button className="w-full justify-center">
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 