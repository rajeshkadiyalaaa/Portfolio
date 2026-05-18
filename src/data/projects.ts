import { Bot, LineChart, Palette, Stethoscope, type LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  icon: LucideIcon;
  previewClass: string;
  /** PDF shown in card media; first page at rest, vertical scroll on hover */
  previewPdf?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'AI Writing Assistant',
    description:
      'A full-stack AI-powered writing assistant for real-time grammar correction, tone transformation, and content enhancement.',
    technologies: ['React', 'Python', 'OpenRouter LLMs'],
    githubUrl: 'https://github.com/rajeshkadiyalaaa/AI-writing-assistant.git',
    icon: Bot,
    previewClass: 'rk-project-preview-ai',
    previewPdf: '/project-previews/ai-assistant.pdf',
  },
  {
    title: 'Dental Caries Analysis',
    description:
      'Deep learning system using Mask R-CNN and BERT to detect cavities, classify severity, and generate dental care recommendations.',
    technologies: ['Python', 'TensorFlow', 'Flask'],
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
    previewPdf: '/project-previews/image-style-transfer.pdf',
  },
  {
    title: 'POS System',
    description:
      'Le Frut POS replaces slow, error-prone manual billing with an automated React/Electron system. Designed to eliminate paper bills and manual calculations, it features real-time inventory tracking, ',
    technologies: ['React', 'Electron', 'Supabase', 'Tailwind CSS', 'Vite', 'Cursor'],
    githubUrl: 'https://github.com/rajeshkadiyalaaa/lefrut-pos.git',
    icon: LineChart,
    previewClass: 'rk-project-preview-sales',
    previewPdf: '/project-previews/pos-system.pdf',
  },
];
