import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Image, Calculator, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF documents with ease',
    icon: FileText,
    color: 'text-primary'
  },
  {
    title: 'Image Tools',
    description: 'Resize, crop, compress, and convert images in multiple formats',
    icon: Image,
    color: 'text-primary'
  },
  {
    title: 'Calculators',
    description: 'Financial, scientific, and specialized calculators for every need',
    icon: Calculator,
    color: 'text-primary'
  },
  {
    title: 'Utility Tools',
    description: 'Text editors, converters, generators, and productivity utilities',
    icon: Wrench,
    color: 'text-primary'
  }
];

export default function ToolCategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Explore Tool Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our organized collection of tools designed to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                tabIndex={0}
                role="button"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
