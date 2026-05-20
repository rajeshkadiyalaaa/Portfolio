import { Bot, FileQuestion, LineChart, Palette, Stethoscope, type LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  icon: LucideIcon;
  previewImage: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Scribe- AI Document Writer',
    description:
      'Scribe helps you write better, faster. Draft in a clean editor, ask the AI for ideas or rewrites, get suggestions to polish your text, and export when youre done—all in one place.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenRouter LLMs','Vite','Cursor','Render','Docker'],
    liveUrl: 'https://scribe-23gk.onrender.com/',
    githubUrl: 'https://github.com/rajeshkadiyalaaa/AI-writing-assistant.git',
    icon: Bot,
    previewImage: '/Project_Images/Assistant.png',
  },
  {
    title: 'Dental Caries Analysis',
    description:
      'Dental caries affects over 3.5 billion people globally. Early detection significantly changes outcomes, but access to expert dental radiograph interpretation is uneven. This project is an attempt to automate part of that diagnostic process.',
    technologies: ['Python', 'PyTorch', 'Mask R-CNN', 'BERT(Finetuned)', 'OpenCV', 'ResNet-50', 'scikit-learn'],
    githubUrl: 'https://github.com/rajeshkadiyalaaa/Dental-Caries-Detection.git',
    icon: Stethoscope,
    previewImage: '/Project_Images/Dental_caries.png',
  },
  {
    title: 'Adaptive Style Transfer',
    description:
      'An extended neural style transfer system that combines CycleGANs unpaired image translation with Adaptive Instance Normalization for controllable, high-quality style application.',
    technologies: ['Python', 'PyTorch', 'AdaIN', 'OpenCV', 'CycleGAN', 'GAN', 'VGG19', 'Matplotlib'],
    githubUrl:
      'https://github.com/rajeshkadiyalaaa/Adaptive-Style-Transfer-in-CycleGAN-with-AdaIN-Integration.git',
    icon: Palette,
    previewImage: '/Project_Images/image_style_Transfer.png',
  },
  {
    title: 'MCQ Generator',
    description:
      'An NLP-based system that automatically generates multiple-choice questions from raw PDF or text documents — useful for education, training platforms, and content assessment tooling.',
    technologies: [
      'Python',
      'Jupyter Notebook',
      'NLP (spaCy / NLTK)',
      'PDF parsing',
      'scikit-learn',
    ],
    githubUrl:
      'https://github.com/rajeshkadiyalaaa/MCQS-Generator-Using-Machine-learning-NLP',
    icon: FileQuestion,
    previewImage: '/Project_Images/MCQS.png',
  },
  {
    title: 'POS System',
    description:
      'A complete point-of-sale and inventory management system built for a real fruit shop business. Fully deployed as a standalone Windows desktop application — no installation required.',
    technologies: ['React', 'Electron', 'Supabase (PostgreSQL + RLS)', 'Tailwind CSS', 'TypeScript', 'Cursor'],
    githubUrl: 'https://github.com/rajeshkadiyalaaa/lefrut-pos.git',
    icon: LineChart,
    previewImage: '/Project_Images/Point of sale.png',
  },
];
