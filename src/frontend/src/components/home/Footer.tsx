import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';
import { Link } from '@/router';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'online-tools';

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Guides', path: '/guides' },
  ];

  const toolCategories = [
    'PDF Tools',
    'Image Tools',
    'Calculators',
    'Utility Tools',
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Terms & Conditions', path: '/terms' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: SiFacebook, 
      url: 'https://facebook.com',
      ariaLabel: 'Visit our Facebook page'
    },
    { 
      name: 'Twitter', 
      icon: SiX, 
      url: 'https://twitter.com',
      ariaLabel: 'Visit our Twitter profile'
    },
    { 
      name: 'Instagram', 
      icon: SiInstagram, 
      url: 'https://instagram.com',
      ariaLabel: 'Visit our Instagram profile'
    },
    { 
      name: 'YouTube', 
      icon: SiYoutube, 
      url: 'https://youtube.com',
      ariaLabel: 'Visit our YouTube channel'
    },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo, Description, Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-lg">Online Tools</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your go-to platform for free online tools. Fast, secure, and easy to use. No registration required.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="footer-social-link h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm text-muted-foreground hover:text-primary inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tool Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
              Tool Categories
            </h3>
            <ul className="space-y-3">
              {toolCategories.map((category) => (
                <li key={category}>
                  <span className="text-sm text-muted-foreground block">
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm text-muted-foreground hover:text-primary inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Attribution */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Online Free Tools. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span>using</span>
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
