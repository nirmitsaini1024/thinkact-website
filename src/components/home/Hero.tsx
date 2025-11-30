'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center px-4 py-4 pt-20 md:pt-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 z-0',
          '[background-size:70px_70px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]'
        )}
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />

      <div className="relative z-20 max-w-4xl text-center px-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
        >
          &quot;Where <span className="text-black">Complexity</span> meets{' '}
          <span className="text-blue-600">Simplicity</span> - <br />
          The AI <span className="text-blue-600">Agentic</span> Way&quot;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs md:text-sm mt-2 text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Empowering businesses to transform complexity into intelligent
          automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2"
        >
          <Link href={'/contact-us'}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Start Your AI Journey
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
