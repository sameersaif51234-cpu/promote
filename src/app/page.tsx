import { InteractiveSpaceBackground } from '@/components/InteractiveSpaceBackground';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Steps } from '@/components/home/Steps';
import { Reviews } from '@/components/home/Reviews';
import { CTA } from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20 relative min-h-screen text-white">

      {/* Interactive Space Background */}
      <InteractiveSpaceBackground />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Steps & Reviews Section */}
      <Steps>
        <Reviews />
      </Steps>

      {/* CTA Bottom */}
      <CTA />
    </div>
  );
}
