import { Hero } from '@/components/home/Hero';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { GoldSection } from '@/components/home/GoldSection';
import { SilverSection } from '@/components/home/SilverSection';
import { WeddingSection } from '@/components/home/WeddingSection';
import { GiftSection } from '@/components/home/GiftSection';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramGrid } from '@/components/home/InstagramGrid';

/**
 * Home — sequência editorial com alternância deliberada de superfícies
 * (preto / off-white) para dar respiro entre as seções cinematográficas.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsSection />
      <FeaturedProducts />
      <GoldSection />
      <SilverSection />
      <WeddingSection />
      <GiftSection />
      <BrandStory />
      <Testimonials />
      <InstagramGrid />
    </>
  );
}
