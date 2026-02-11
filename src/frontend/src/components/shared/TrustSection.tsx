import { Shield, DollarSign, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrustItem {
  icon: typeof Shield;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: 'No data stored',
    description: 'All processing happens in your browser. Your files never leave your device.',
  },
  {
    icon: DollarSign,
    title: '100% free tools',
    description: 'No hidden fees, no subscriptions, no registration required. Completely free forever.',
  },
  {
    icon: Lock,
    title: 'Secure browser-based processing',
    description: 'Your data stays private with client-side processing. No uploads to external servers.',
  },
  {
    icon: Users,
    title: 'Used by thousands',
    description: 'Join thousands of users who trust our tools for their daily tasks.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="heading-accent-subtle">Why Trust Our Tools?</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your privacy and security are our top priorities. Here's what makes our tools safe and reliable.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="text-center card-pink-hover group"
                >
                  <CardHeader>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
