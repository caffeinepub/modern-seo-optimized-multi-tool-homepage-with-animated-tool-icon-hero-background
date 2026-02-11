import { Wrench, Shield, Zap, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container px-4 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-muted-foreground mb-12">
          Welcome to Online Free Tools – your trusted destination for powerful, browser-based utilities that make everyday tasks simpler and faster.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that everyone deserves access to high-quality digital tools without barriers. Our mission is to provide a comprehensive suite of free, easy-to-use online utilities that empower individuals, students, professionals, and businesses to work more efficiently. We're committed to making powerful tools accessible to everyone, regardless of technical expertise or budget.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-primary" />
            What We Offer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our platform hosts a growing collection of browser-based tools spanning multiple categories:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>PDF Tools:</strong> Merge, split, compress, and convert PDF documents with ease</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Image Utilities:</strong> Resize, compress, convert, and optimize images in various formats</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Calculators:</strong> Financial, scientific, and everyday calculators for quick computations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Text & Data Tools:</strong> Format, convert, and analyze text and data efficiently</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            All our tools run directly in your browser, ensuring fast performance and complete privacy – your files never leave your device.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">100% Free</h3>
              <p className="text-muted-foreground">No hidden fees, no subscriptions, no credit card required. All tools are completely free to use.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">Your files are processed locally in your browser. We don't store, access, or transmit your data.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No Installation</h3>
              <p className="text-muted-foreground">Access all tools instantly from any modern browser. No downloads or installations required.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Always Available</h3>
              <p className="text-muted-foreground">Our tools are available 24/7 from any device with an internet connection.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Our Commitment
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We are dedicated to maintaining the highest standards of quality, security, and user experience. Our team continuously works to:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Add new tools based on user feedback and emerging needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Improve existing tools with better features and performance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Ensure compatibility across all modern browsers and devices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Maintain transparent privacy practices and secure infrastructure</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Built on Modern Technology</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform leverages cutting-edge web technologies to deliver fast, reliable, and secure tools. We utilize client-side processing powered by modern JavaScript APIs, ensuring your data remains private while providing desktop-quality performance directly in your browser. Our infrastructure is built on the Internet Computer blockchain, providing decentralized hosting and enhanced security.
          </p>
        </section>

        <section className="bg-primary/5 p-8 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed">
            We value your feedback and suggestions. Whether you have a feature request, found a bug, or just want to say hello, we'd love to hear from you. Visit our <a href="/contact" className="text-primary hover:underline font-medium">Contact page</a> to get in touch with our team.
          </p>
        </section>
      </div>
    </div>
  );
}
