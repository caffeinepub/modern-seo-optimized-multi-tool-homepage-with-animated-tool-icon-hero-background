import { ReactNode, useEffect, useState } from 'react';
import Footer from '@/components/home/Footer';
import MobileCategoryBottomNav from '@/components/navigation/MobileCategoryBottomNav';
import { useRouter } from '@/router';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentPath } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(timer);
  }, [currentPath]);

  return (
    <div className="min-h-screen flex flex-col">
      <main 
        className={`flex-1 mobile-bottom-safe ${isTransitioning ? 'motion-safe:animate-page-enter' : ''}`}
        key={currentPath}
      >
        {children}
      </main>
      <Footer />
      <MobileCategoryBottomNav />
    </div>
  );
}
