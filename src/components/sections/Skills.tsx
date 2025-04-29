import React from 'react';
import { Code2, Database, Globe, Laptop, Server, BrainCircuit, BrainCog, BarChart } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
      title: "AI & Machine Learning",
      technologies: "TensorFlow, PyTorch, Keras, Scikit-Learn, NLP, Computer Vision"
    },
    {
      icon: <BrainCog className="w-8 h-8 text-green-500" />,
      title: "Deep Learning",
      technologies: "Neural Networks, Transfer Learning, Generative AI, Reinforcement Learning"
    },
    {
      icon: <Code2 className="w-8 h-8 text-purple-500" />,
      title: "Programming",
      technologies: "Python, R, SQL, JavaScript, HTML5, Tailwind CSS"
    },
    {
      icon: <BarChart className="w-8 h-8 text-orange-500" />,
      title: "Data Analysis",
      technologies: "Pandas, NumPy, SciPy, Matplotlib, Seaborn, Plotly, Power BI, Tableau"
    },
    {
      icon: <Database className="w-8 h-8 text-red-500" />,
      title: "Databases & Cloud",
      technologies: "MySQL, MongoDB, Google BigQuery, Google Cloud Platform"
    },
    {
      icon: <Server className="w-8 h-8 text-yellow-500" />,
      title: "API Development",
      technologies: "Flask, FastAPI, Streamlit, RESTful APIs"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 fade-up">Technical Skills</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto fade-up">
          A comprehensive overview of my technical expertise in AI, machine learning, and software development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                {skill.icon}
                <h3 className="text-xl font-semibold ml-3">{skill.title}</h3>
              </div>
              <p className="text-gray-400">{skill.technologies}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 