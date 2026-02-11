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
import ToolIcon from '@/components/shared/ToolIcon';

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
            <span className="heading-accent-subtle">Featured Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most popular and frequently used tools, ready to help you get things done
          </p>
        </div>

        {/* Mobile: Horizontal swipe scroll */}
        <div className="md:hidden overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {featuredTools.map((tool, index) => {
              const floatAnimationClass = `motion-safe:animate-float-delay-${index % 4}`;
              
              return (
                <Card 
                  key={tool.title}
                  className={`group cursor-pointer card-pink-hover focus-ring relative overflow-hidden scroll-snap-center ${floatAnimationClass}`}
                  style={{ minWidth: '280px', maxWidth: '280px' }}
                  tabIndex={0}
                  role="button"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <ToolIcon icon={tool.icon} />
                      {tool.badge && (
                        <Badge 
                          variant={tool.badge === 'Popular' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
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

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredTools.map((tool, index) => {
            const floatAnimationClass = `motion-safe:animate-float-delay-${index % 4}`;
            
            return (
              <Card 
                key={tool.title}
                className={`group cursor-pointer card-pink-hover focus-ring relative overflow-hidden ${floatAnimationClass}`}
                tabIndex={0}
                role="button"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <ToolIcon icon={tool.icon} />
                    {tool.badge && (
                      <Badge 
                        variant={tool.badge === 'Popular' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
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
