import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Calculator, 
  FileCode,
  Scissors,
  Palette,
  Lock,
  Zap,
  Hash,
  FileType,
  Percent,
  Clock
} from 'lucide-react';

const featuredTools = [
  {
    title: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document',
    icon: FileText,
    badge: 'Popular'
  },
  {
    title: 'Image Compressor',
    description: 'Reduce image file size without losing quality',
    icon: Image,
    badge: 'New'
  },
  {
    title: 'Loan Calculator',
    description: 'Calculate monthly payments and total interest',
    icon: Calculator,
    badge: 'Popular'
  },
  {
    title: 'JSON Formatter',
    description: 'Format and validate JSON data instantly',
    icon: FileCode,
    badge: null
  },
  {
    title: 'Image Cropper',
    description: 'Crop and resize images to exact dimensions',
    icon: Scissors,
    badge: null
  },
  {
    title: 'Color Picker',
    description: 'Extract colors from images and generate palettes',
    icon: Palette,
    badge: 'New'
  },
  {
    title: 'Password Generator',
    description: 'Create strong, secure passwords instantly',
    icon: Lock,
    badge: 'Popular'
  },
  {
    title: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: Zap,
    badge: null
  },
  {
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, and SHA-256 hashes',
    icon: Hash,
    badge: null
  },
  {
    title: 'File Converter',
    description: 'Convert files between different formats',
    icon: FileType,
    badge: 'Popular'
  },
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    icon: Percent,
    badge: null
  },
  {
    title: 'Time Zone Converter',
    description: 'Convert times between different time zones',
    icon: Clock,
    badge: null
  }
];

export default function FeaturedToolsGrid() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most popular and frequently used tools, ready to help you get things done
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 relative overflow-hidden"
                tabIndex={0}
                role="button"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {tool.badge && (
                      <Badge 
                        variant={tool.badge === 'Popular' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
