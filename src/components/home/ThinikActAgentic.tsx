'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

const ThinkActAgentic: React.FC = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, amount: 0.3 });
  const router = useRouter();

  return (
    <section className="relative w-full bg-gray-100 pt-28 pb-24 px-6 md:pt-32 md:pb-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16">
        {/* Left Content */}
        <motion.div
          ref={headlineRef}
          className="space-y-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            ThinkAct<sup className="text-gray-700">®</sup>{' '}
            <span className="text-blue-600">Agentic</span>
            <br />
            Platform for Autonomous Workflows
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Build intelligent agent workflows with{' '}
            <span className="font-semibold text-blue-600">fluid routing</span>{' '}
            and{' '}
            <span className="font-semibold text-blue-600">
              seamless orchestration
            </span>
          </motion.p>

          <motion.p variants={itemVariants} className="text-base text-gray-500">
            Secure, enterprise-ready with role-based access and data privacy
            built-in.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => router.push('/contact-us')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-lg transition-all duration-300 group space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Demo</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Demo Visual */}
        <div className="mt-16 lg:mt-0 relative z-10">
          <div className="w-full aspect-[16/9] bg-white border border-gray-200 rounded-2xl shadow-md flex items-center justify-center text-gray-400 text-sm">
            [ Product Screenshot or Hero Graphic ]
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThinkActAgentic;
