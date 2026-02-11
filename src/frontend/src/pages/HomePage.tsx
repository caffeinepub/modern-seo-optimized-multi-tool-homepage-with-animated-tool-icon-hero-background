import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import ToolCategoriesSection from '@/components/home/ToolCategoriesSection';
import FeaturedToolsGrid from '@/components/home/FeaturedToolsGrid';
import TrustSection from '@/components/shared/TrustSection';
import LatestGuidesSection from '@/components/home/LatestGuidesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <TrustSection />
      <ToolCategoriesSection />
      <FeaturedToolsGrid />
      <LatestGuidesSection />
    </>
  );
}
