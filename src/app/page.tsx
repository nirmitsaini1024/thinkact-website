import Hero from '@/components/home/Hero';
import ModernFeaturesSection from '@/components/home/Features';
import Agents from '@/components/home/AgentsWorkFlow';
import IndustrySolutions from '@/components/home/IndustrySolutions';
import Cta from '@/components/home/Cta';
import ProductShowcase from '@/components/home/ProductShowCase';
import ThinkActAgentic from '@/components/home/ThinikActAgentic';
import FAQSection from '@/components/home/Faq';
import AiSteps from '@/components/home/AiSteps';

export default function Home() {
  return (
    <div>
      <Hero />
      <AiSteps />
      <ProductShowcase />
      <ThinkActAgentic />
      <ModernFeaturesSection />
      <Agents />
      <IndustrySolutions />
      <FAQSection />
      <Cta />
    </div>
  );
}
