import Hero from '@/components/home/Hero';
import IndustrySolutions from '@/components/home/IndustrySolutions';
import Cta from '@/components/home/Cta';
import ThinkActAgentic from '@/components/home/ThinikActAgentic';
import FAQSection from '@/components/home/Faq';
import AiSteps from '@/components/home/AiSteps';
import DocAgentic from '@/components/home/DocAgentic';
import Knowledger from '@/components/home/Knowledger';

export default function Home() {
  return (
    <div>
      <Hero />
      <AiSteps />
      <DocAgentic />
      <Knowledger />
      <ThinkActAgentic />
      <IndustrySolutions />
      <FAQSection />
      <Cta />
    </div>
  );
}
