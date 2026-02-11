import { Button } from '@/components/ui/button';
import ToolIconParticles from './ToolIconParticles';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      <ToolIconParticles />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your Complete
            <span className="block text-primary mt-2">Online Free Tools</span>
            <span className="block mt-2">Website</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access powerful, professional-grade tools right in your browser. 
            No downloads, no sign-ups—just instant solutions for your everyday tasks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-base px-8 group">
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              View All Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
