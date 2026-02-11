import { ReactNode } from 'react';
import { LucideIcon, Zap, Shield, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageSeo } from '@/hooks/usePageSeo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from '@/router';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { getRelatedTools } from '@/lib/toolsRegistry';
import TrustSection from '@/components/shared/TrustSection';
import ToolIcon from '@/components/shared/ToolIcon';

interface ToolBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ToolStep {
  step: string;
  title: string;
  description: string;
}

interface ToolFAQ {
  question: string;
  answer: string;
}

interface ToolLandingTemplateProps {
  toolName: string;
  toolPath: string;
  seoTitle: string;
  seoDescription: string;
  heroDescription: string;
  toolIcon: LucideIcon;
  toolInterface: ReactNode;
  steps: ToolStep[];
  benefits?: ToolBenefit[];
  faqs: ToolFAQ[];
}

export default function ToolLandingOnlineFreeTemplate({
  toolName,
  toolPath,
  seoTitle,
  seoDescription,
  heroDescription,
  toolIcon,
  toolInterface,
  steps,
  benefits,
  faqs,
}: ToolLandingTemplateProps) {
  usePageSeo({
    title: seoTitle,
    description: seoDescription,
  });

  const defaultBenefits: ToolBenefit[] = benefits || [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: `Process your files in seconds with our optimized ${toolName.toLowerCase()} engine`,
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are processed securely and never stored on our servers',
    },
    {
      icon: Globe,
      title: '100% Free',
      description: 'No hidden fees, no registration required. Completely free to use',
    },
    {
      icon: Clock,
      title: 'Available 24/7',
      description: `Access our ${toolName.toLowerCase()} anytime, anywhere, on any device`,
    },
  ];

  // Get related tools based on category
  const relatedTools = getRelatedTools(toolPath, 3);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: toolName },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1 text-primary" />
              100% Free Tool
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="heading-accent-subtle">{toolName}</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-8">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 card-pink-hover group">
              <CardHeader className="p-5 md:p-6">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                  <ToolIcon icon={toolIcon} />
                  <span>{toolName}</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Use our free online tool to process your files instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 md:p-6">
                {toolInterface}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Usage */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
              <span className="heading-accent-subtle">How to Use {toolName}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {steps.map((item) => (
                <Card key={item.step} className="relative overflow-hidden card-pink-hover tap-target">
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-bl-full flex items-start justify-end p-2 md:p-3">
                    <span className="text-xl md:text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <CardHeader className="p-5 md:p-6">
                    <CardTitle className="text-lg md:text-xl pr-12">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 md:px-6 md:pb-6">
                    <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
              <span className="heading-accent-subtle">Why Choose Our {toolName}?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
              Experience the best free online tool with powerful features and unmatched convenience
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {defaultBenefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center card-pink-hover group tap-target"
                >
                  <CardHeader className="p-5 md:p-6">
                    <div className="mx-auto mb-4">
                      <ToolIcon icon={benefit.icon} />
                    </div>
                    <CardTitle className="text-base md:text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 md:px-6 md:pb-6">
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
              <span className="heading-accent-subtle">Frequently Asked Questions</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">
              Everything you need to know about our {toolName.toLowerCase()}
            </p>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-card border rounded-lg px-4 md:px-6 transition-all duration-300 hover:border-primary/30 focus-ring"
                >
                  <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors text-sm md:text-base py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                <span className="heading-accent-subtle">Related Tools</span>
              </h2>
              <p className="text-center text-muted-foreground mb-8 text-sm md:text-base">
                Explore more tools in the same category
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block p-5 md:p-6 border-2 rounded-lg transition-all duration-300 hover:border-primary hover:bg-primary/5 card-pink-hover group focus-ring tap-target"
                  >
                    <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try our free online tool →
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium focus-ring px-3 py-2 transition-all duration-300 text-sm md:text-base"
                >
                  View All Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust & Legal Links */}
      <section className="py-6 md:py-8 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              Your privacy matters. All processing happens in your browser. We don't store your files.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm">
              <Link to="/privacy" className="text-primary hover:underline transition-colors focus-ring px-2 py-1">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/terms" className="text-primary hover:underline transition-colors focus-ring px-2 py-1">
                Terms of Service
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/disclaimer" className="text-primary hover:underline transition-colors focus-ring px-2 py-1">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
