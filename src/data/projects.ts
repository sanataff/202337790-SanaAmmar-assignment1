/**
 * Project catalogue for the portfolio.
 *
 * This is the single source of truth for the Projects section. The UI reads
 * from here, so adding a project is a one-line data change — no markup edits.
 */

export type ProjectCategory = 'Mobile' | 'Web' | 'Design';

export type Project = {
  id: string;
  title: string;
  summary: string;
  /** Longer copy revealed when a card is expanded. */
  details: string;
  stack: string[];
  category: ProjectCategory;
  url: string;
  year: number;
  featured: boolean;
};

/** Categories shown in the filter bar, in display order. */
export const categories: Array<'All' | ProjectCategory> = [
  'All',
  'Mobile',
  'Web',
  'Design',
];

export const projects: Project[] = [
  {
    id: 'tathkera',
    title: 'Tathkera App',
    summary: 'A ticket-booking app for events and travel in the region.',
    details:
      'Led the product design and shipped the mobile client with animations and a Firebase backend. Focused on a fast checkout flow and clear seat selection.',
    stack: ['React Native', 'Expo', 'Reanimated', 'Firebase'],
    category: 'Mobile',
    url: 'https://apps.apple.com/sa/app/tathkera/id6754595321',
    year: 2024,
    featured: true,
  },
  {
    id: 'interverse-landing',
    title: 'Interverse Landing Page',
    summary: 'Marketing site that introduces the Interverse platform.',
    details:
      'Designed and built a responsive landing page with a component-driven layout, tuned typography, and performance-minded delivery.',
    stack: ['Next.js', 'Figma', 'Tailwind CSS'],
    category: 'Web',
    url: 'https://intrverse.com/',
    year: 2024,
    featured: true,
  },
  {
    id: 'interverse-dashboard',
    title: 'Interverse Dashboard',
    summary: 'Product dashboard for managing the platform from one place.',
    details:
      'Owned the end-to-end product design: information architecture, reusable UI patterns, and interaction states across the dashboard.',
    stack: ['Next.js', 'Figma', 'Product Design'],
    category: 'Web',
    url: 'https://bysana.vercel.app/projects/interverse-dashboard',
    year: 2024,
    featured: true,
  },
  {
    id: 'kfupm-student',
    title: 'KFUPM Student App',
    summary: 'A campus companion app concept for KFUPM students.',
    details:
      'Redesigned core student journeys — schedule, services, and announcements — into a clearer, more consistent mobile experience.',
    stack: ['Figma'],
    category: 'Mobile',
    url: 'https://apps.apple.com/sa/app/kfupm-student/id1630637797?l=ar',
    year: 2023,
    featured: false,
  },
  {
    id: 'rafeeq',
    title: 'Rafeeq',
    summary: 'A companion concept exploring approachable, friendly guidance.',
    details:
      'Explored branding, visual language, and interaction patterns for a companion product focused on everyday guidance.',
    stack: ['Figma'],
    category: 'Design',
    url: 'https://www.figma.com/design/S7vjP45p9KnZbkJErahjUs/Untitled?node-id=0-1&t=sWmRziPLWUvBhzpL-1',
    year: 2023,
    featured: false,
  },
];

export type SortOption = 'featured' | 'newest' | 'title';

export const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'featured', label: 'Featured first' },
  { value: 'newest', label: 'Newest first' },
  { value: 'title', label: 'Title (A–Z)' },
];
