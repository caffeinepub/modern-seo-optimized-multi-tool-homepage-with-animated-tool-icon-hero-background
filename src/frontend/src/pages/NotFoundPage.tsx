import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/router';

export default function NotFoundPage() {
  return (
    <div className="container px-4 py-16 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
      </div>
      
      <Link to="/">
        <Button size="lg" className="gap-2">
          <Home className="h-5 w-5" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
