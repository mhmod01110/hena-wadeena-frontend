import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionCards } from "@/components/home/MissionCards";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { PriceSnapshot } from "@/components/home/PriceSnapshot";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <MissionCards />
      <FeaturedSection />
      <PriceSnapshot />
    </Layout>
  );
};

export default Index;
