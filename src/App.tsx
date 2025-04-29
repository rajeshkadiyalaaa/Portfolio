import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import { initScrollAnimations } from './utils/animations';
import './styles/animations.css';

function App() {
  useEffect(() => {
    document.title = 'Rajesh Kadiyala - AI & ML Engineer';
    const observer = initScrollAnimations();
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;