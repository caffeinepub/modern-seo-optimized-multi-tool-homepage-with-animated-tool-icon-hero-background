import { BookOpen } from 'lucide-react';
import { usePageSeo } from '@/hooks/usePageSeo';
import GuideCard from '@/components/guides/GuideCard';
import { getAllGuides } from '@/lib/guidesRegistry';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export default function GuidesPage() {
  usePageSeo({
    title: 'Tips and Guides - Online Free Tools',
    description: 'Browse our collection of expert tips and practical guides on productivity, online tools, and workflow optimization.',
  });

  const allGuides = getAllGuides();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Guides' },
        ]}
      />
      
      <div className="container px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="heading-accent-subtle">Tips & Guides</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert tips and practical guides to help you work smarter, not harder. Learn how to make the most of online tools and boost your productivity.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
