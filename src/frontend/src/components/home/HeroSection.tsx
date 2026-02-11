import { Button } from '@/components/ui/button';
import ToolIconParticles from './ToolIconParticles';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      <ToolIconParticles />
      
      {/* Gradient pink highlight accents - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="hidden md:block absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[400px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-2xl opacity-40" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your Complete
            <span className="block mt-2">
              <span className="heading-accent text-primary">Online Free Tools</span>
            </span>
            <span className="block mt-2">Website</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access powerful, professional-grade tools right in your browser. 
            No downloads, no sign-ups—just instant solutions for your everyday tasks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-base px-8 group btn-primary-glow tap-target-mobile w-full sm:w-auto">
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 transition-all duration-300 hover:border-primary/50 hover:text-primary tap-target-mobile w-full sm:w-auto">
              View All Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
