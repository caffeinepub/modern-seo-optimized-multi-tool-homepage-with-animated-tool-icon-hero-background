import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import ToolCategoriesSection from '@/components/home/ToolCategoriesSection';
import FeaturedToolsGrid from '@/components/home/FeaturedToolsGrid';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ToolCategoriesSection />
      <FeaturedToolsGrid />
    </>
  );
}
