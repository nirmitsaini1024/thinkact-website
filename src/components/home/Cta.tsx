'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCalendarDay } from 'react-icons/fa6';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const Cta: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="overflow-hidden relative">
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none -z-10 hidden md:block">
        {[0, 25, 50, 75, 100].map((p) => (
          <div
            key={p}
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: `${p}%` }}
          />
        ))}
      </div>

      {/* Main Section */}
      <motion.section
        ref={ref}
        className="relative bg-blue-600 flex flex-col items-center justify-center w-full px-6 py-20 md:py-28 rounded-xl mx-auto max-w-7xl lg:px-12 my-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-10 rounded-xl pointer-events-none -z-10" />

        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-4xl font-semibold text-center text-white leading-snug"
        >
          Ready to Transform Your Document Workflows?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-white/90 text-center max-w-xl mt-4 text-base md:text-lg"
        >
          Accelerate operational efficiency with structured, auditable, and
          AI-driven workflows.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/contact-us">
            <button className="flex items-center px-6 py-3 bg-white text-blue-600 font-medium text-sm md:text-base rounded-md shadow hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
              Book a Demo
              <span className="ml-3 bg-blue-50 rounded-full p-2 transition-transform duration-200 group-hover:scale-110">
                <FaCalendarDay size={18} />
              </span>
            </button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Cta;
