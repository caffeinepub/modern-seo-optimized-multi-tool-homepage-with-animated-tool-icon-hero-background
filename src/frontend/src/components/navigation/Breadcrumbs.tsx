import { ChevronRight } from 'lucide-react';
import { Link } from '@/router';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-muted/30 py-3 border-b"
    >
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span 
                    className={isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
