import AboutHero from '@/components/about/AboutHero';
import WhoWeAre from '@/components/about/WhoWeAre';
import Capabilities from '@/components/about/Capabilities';
import WhyVedhanth from '@/components/about/WhyVedhanth';
import OurApproach from '@/components/about/OurApproach';
import Industries from '@/components/about/Industries';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata = {
  title: 'About Us',
  description: 'About Vedhanth IT Solutions — electrical, ELV, security, networking and IT solutions in Mudalapalya, Bengaluru.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <Capabilities />
      <WhyVedhanth />
      <OurApproach />
      <Industries />
      <AboutCTA />
    </>
  );
}
