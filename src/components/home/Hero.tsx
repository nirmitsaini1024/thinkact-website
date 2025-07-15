'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 z-0',
          '[background-size:70px_70px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]'
        )}
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      <div className="relative z-20 max-w-5xl text-center pt-16 sm:pt-24 lg:pt-32 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]"
        >
          Where <span className="text-black">Complexity</span> meets{' '}
          <span className="text-blue-600">Simplicity</span> - <br /> The AI{' '}
          <span className="text-blue-600">Agentic</span> Way
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Empowering businesses to transform complexity into intelligent
          automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href={'/contact-us'}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Start Your AI Journey
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
