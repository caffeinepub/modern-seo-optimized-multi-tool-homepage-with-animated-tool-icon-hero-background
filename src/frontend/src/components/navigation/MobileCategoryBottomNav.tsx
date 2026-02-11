import { FileText, Image, Calculator, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'pdf',
    label: 'PDF Tools',
    icon: FileText,
    path: '/#pdf-tools'
  },
  {
    id: 'image',
    label: 'Image Tools',
    icon: Image,
    path: '/#image-tools'
  },
  {
    id: 'calculators',
    label: 'Calculators',
    icon: Calculator,
    path: '/#calculators'
  },
  {
    id: 'utilities',
    label: 'Utility Tools',
    icon: Wrench,
    path: '/#utilities'
  }
];

export default function MobileCategoryBottomNav() {
  const handleCategoryClick = (path: string) => {
    // Navigate to home and scroll to category
    if (window.location.pathname !== '/') {
      window.location.href = path;
    } else {
      const hash = path.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile category navigation"
    >
      <div className="grid grid-cols-4 gap-1 p-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => handleCategoryClick(category.path)}
              className="flex flex-col items-center justify-center h-auto py-2 px-1 gap-1 tap-target focus-ring"
              aria-label={category.label}
            >
              <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium leading-tight text-center">
                {category.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
