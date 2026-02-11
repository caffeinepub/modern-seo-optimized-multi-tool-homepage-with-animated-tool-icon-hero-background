import { ReactNode } from 'react';
import { Clock, Tag, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

interface GuideArticleLayoutProps {
  title: string;
  tag: string;
  readingTime: string;
  publishedDate: string;
  children: ReactNode;
}

export default function GuideArticleLayout({
  title,
  tag,
  readingTime,
  publishedDate,
  children,
}: GuideArticleLayoutProps) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Guides', path: '/guides' },
          { label: title },
        ]}
      />
      
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">
                  <Tag className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {tag}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {readingTime}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {publishedDate}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="heading-accent-subtle">{title}</span>
              </h1>
            </header>

            {/* Article Content */}
            <div className="prose prose-slate max-w-none">
              {children}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
