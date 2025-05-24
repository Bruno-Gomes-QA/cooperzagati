'use client'

import { Header } from "@/components/Home/Header";
import { Carousel } from "@/components/Home/Carousel";
import { FeatureSection } from "@/components/Home/FeatureSection";
import { Footer } from "@/components/Home/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <FeatureSection />
      <Footer />
    </div>
  );
}
