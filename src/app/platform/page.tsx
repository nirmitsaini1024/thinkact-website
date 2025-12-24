import ProductShowcase from '@/components/home/ProductShowCase';
import ThinkActAgentic from '@/components/home/ThinikActAgentic';
import ModernFeaturesSection from '@/components/home/Features';
import IndustrySolutions from '@/components/home/IndustrySolutions';
import FAQSection from '@/components/home/Faq';
import Cta from '@/components/home/Cta';

export default function PlatformPage() {
  return (
    <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      <ProductShowcase />
      <ThinkActAgentic />
      <ModernFeaturesSection />
      <IndustrySolutions />
      <FAQSection />
      <Cta />
    </div>
  );
}






