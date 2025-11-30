import TamiPage from '@/components/tami/TamiPage';

export default function Home() {
  return (
    <div className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      <main className="min-h-screen flex flex-col">
        {/* <Hero /> */}
        {/* <AiSteps /> */}
        <div id="tami">
          <TamiPage />
        </div>
      </main>
    </div>
  );
}
