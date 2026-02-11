import { BookOpen } from 'lucide-react';
import GuideCard from '@/components/guides/GuideCard';
import { getLatestGuides } from '@/lib/guidesRegistry';
import { Link } from '@/router';
import { Button } from '@/components/ui/button';

export default function LatestGuidesSection() {
  const latestGuides = getLatestGuides(4);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Tips and Guides
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover expert tips and practical guides to help you work smarter with online tools and boost your productivity.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {latestGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link to="/guides">
              <Button size="lg" variant="outline" className="group">
                View All Guides
                <BookOpen className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
