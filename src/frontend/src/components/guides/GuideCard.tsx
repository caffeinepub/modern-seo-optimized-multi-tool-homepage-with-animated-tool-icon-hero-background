import { Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/router';
import type { GuideMetadata } from '@/lib/guidesRegistry';

interface GuideCardProps {
  guide: GuideMetadata;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link to={guide.path} className="block group">
      <Card className="h-full card-pink-hover focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1 text-primary" />
              {guide.tag}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              {guide.readingTime}
            </span>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {guide.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {guide.excerpt}
          </p>
          <p className="text-xs text-muted-foreground">
            Published: {guide.publishedDate}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
