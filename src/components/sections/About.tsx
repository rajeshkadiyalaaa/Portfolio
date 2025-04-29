import React from 'react';
import { Cpu, Code, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" className="py-24 bg-black" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"> Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            AI & Machine Learning Engineer with a passion for building intelligent and scalable solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Cpu className="w-12 h-12 text-purple-500 mb-4" />,
              title: "AI & Machine Learning",
              description: "Experienced in developing AI solutions including NLP, computer vision, and generative AI models with frameworks like TensorFlow and PyTorch."
            },
            {
              icon: <Code className="w-12 h-12 text-pink-500 mb-4" />,
              title: "Web Development",
              description: "Building end-to-end applications with React, Node.js, Python, Flask, and RESTful APIs."
            },
            {
              icon: <Brain className="w-12 h-12 text-blue-500 mb-4" />,
              title: "Data Analysis",
              description: "Skilled in data analysis, cleaning, visualization, and statistical analysis using Python libraries like Pandas, NumPy, Matplotlib, and Seaborn."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all">
                {card.icon}
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 