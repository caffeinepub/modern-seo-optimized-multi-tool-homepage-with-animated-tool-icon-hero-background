import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Image, Calculator, Wrench } from 'lucide-react';
import ToolIcon from '@/components/shared/ToolIcon';

const categories = [
  {
    title: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF documents with ease',
    icon: FileText
  },
  {
    title: 'Image Tools',
    description: 'Resize, crop, compress, and convert images in multiple formats',
    icon: Image
  },
  {
    title: 'Calculators',
    description: 'Financial, scientific, and specialized calculators for every need',
    icon: Calculator
  },
  {
    title: 'Utility Tools',
    description: 'Text editors, converters, generators, and productivity utilities',
    icon: Wrench
  }
];

export default function ToolCategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="heading-accent-subtle">Explore Tool Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our organized collection of tools designed to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const floatAnimationClass = `motion-safe:animate-float-delay-${index}`;
            
            return (
              <Card 
                key={category.title}
                className={`group cursor-pointer card-pink-hover focus-ring tap-target ${floatAnimationClass}`}
                tabIndex={0}
                role="button"
              >
                <CardHeader className="p-5 md:p-6">
                  <div className="mb-4">
                    <ToolIcon icon={category.icon} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 md:px-6 md:pb-6">
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
