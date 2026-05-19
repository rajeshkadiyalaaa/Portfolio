import type { LucideIcon } from 'lucide-react';
import { BarChart3, Briefcase, GraduationCap, Palette } from 'lucide-react';

export type TimelineEntry = {
  period: string;
  title: string;
  organization: string;
  description: string;
};

/** Chronological milestones for the alternating career timeline (oldest → newest). */
export type CareerMilestone = TimelineEntry & {
  trackLabel: string;
  icon: LucideIcon;
  kind: 'education' | 'experience';
};

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    period: '2021 – 2025',
    trackLabel: '2021–25',
    title: 'B.Tech, AI & ML',
    organization: 'Usha Rama College of Engineering and Technology',
    description: 'Focused on Machine Learning, Deep Learning and AI.',
    icon: GraduationCap,
    kind: 'education',
  },
  {
    period: 'Apr 2024 – Nov 2024',
    trackLabel: '2024',
    title: 'Graphic Designer',
    organization: 'Freelancer',
    description: 'Designed posters, cards and other graphics for clients.',
    icon: Palette,
    kind: 'experience',
  },
  {
    period: 'Jan – Apr 2025',
    trackLabel: '2025',
    title: 'Data Analytics Intern',
    organization: '360DigiTMG',
    description:
      'Built dashboards and data pipelines; presented findings to non-technical stakeholders.',
    icon: BarChart3,
    kind: 'experience',
  },
  {
    period: 'May 2025 – Mar 2026',
    trackLabel: '2025–26',
    title: 'Operations Executive',
    organization: 'Lefrut',
    description:
      'Coordinated daily operations, supported product decisions, and built internal tooling.',
    icon: Briefcase,
    kind: 'experience',
  },
];
