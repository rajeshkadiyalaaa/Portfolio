import { Github, Linkedin, Mail, MapPin, type LucideIcon } from 'lucide-react';

/** Single source of truth for social links, contact info, and form delivery. */
export const EMAIL = 'rajeshkadiyalaaa@gmail.com';
export const GITHUB_URL = 'https://github.com/rajeshkadiyalaaa';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/rajesh-kadiyala';
export const RESUME_PATH = '/Kadiyala_Rajesh_Resume_2026.pdf';
export const LOCATION = 'Vijayawada, India';

export const SOCIAL_LINKS = {
  email: `mailto:${EMAIL}`,
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  resume: RESUME_PATH,
} as const;

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: SOCIAL_LINKS.email,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: LOCATION,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rajesh-kadiyala',
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/rajeshkadiyalaaa',
    href: SOCIAL_LINKS.github,
  },
];
