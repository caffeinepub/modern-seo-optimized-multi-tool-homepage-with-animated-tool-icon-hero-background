export interface GuideMetadata {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  tag: string;
  readingTime: string;
  publishedDate: string;
}

export const guidesRegistry: GuideMetadata[] = [
  {
    id: 'keyboard-shortcuts-faster-work',
    title: 'Essential Keyboard Shortcuts for Faster Work',
    path: '/guides/keyboard-shortcuts-faster-work',
    excerpt: 'Master these time-saving keyboard shortcuts to boost your productivity and work more efficiently across all your favorite applications.',
    tag: 'Productivity',
    readingTime: '5 min read',
    publishedDate: 'February 10, 2026',
  },
  {
    id: 'organize-browser-tabs-bookmarks',
    title: 'How to Organize Browser Tabs and Bookmarks',
    path: '/guides/organize-browser-tabs-bookmarks',
    excerpt: 'Learn practical strategies to manage your browser tabs and bookmarks effectively, reducing clutter and improving your online workflow.',
    tag: 'Organization',
    readingTime: '6 min read',
    publishedDate: 'February 8, 2026',
  },
  {
    id: 'pdf-workflow-checklist',
    title: 'PDF Workflow Checklist for Professionals',
    path: '/guides/pdf-workflow-checklist',
    excerpt: 'A comprehensive checklist to streamline your PDF workflows, from creation to sharing, using the best online tools and practices.',
    tag: 'PDF Tools',
    readingTime: '7 min read',
    publishedDate: 'February 5, 2026',
  },
  {
    id: 'optimize-images-web-performance',
    title: 'Optimize Images for Better Web Performance',
    path: '/guides/optimize-images-web-performance',
    excerpt: 'Discover how to compress and optimize images without losing quality, improving your website speed and user experience.',
    tag: 'Image Tools',
    readingTime: '5 min read',
    publishedDate: 'February 3, 2026',
  },
];

export function getAllGuides(): GuideMetadata[] {
  return guidesRegistry;
}

export function getGuideByPath(path: string): GuideMetadata | undefined {
  return guidesRegistry.find(guide => guide.path === path);
}

export function getLatestGuides(count: number = 4): GuideMetadata[] {
  return guidesRegistry.slice(0, count);
}
