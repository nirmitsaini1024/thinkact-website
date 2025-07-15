'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Target,
  RefreshCw,
  Zap,
  User,
  ChevronRight,
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const featureDetails: Feature[] = [
  {
    title: 'Orchestration layer for Agents',
    description:
      'Seamlessly coordinate and manage agent interactions across different systems and processes.',
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    title: 'Service Intents',
    description:
      'Define and execute precise service objectives with intelligent intent recognition.',
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: 'Context switch to Agents',
    description:
      'Dynamically transfer context between different agents for comprehensive problem-solving.',
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    title: 'Automate Tasks',
    description:
      'Leverage AI to streamline and automate complex workflow processes.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: 'Update Customer insight into Deep Profile',
    description:
      'Develop deep knowledge of customer preferences and style improving customer retention and acquisition.',
    icon: <User className="w-5 h-5" />,
  },
];

const Agents: React.FC = () => {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.2 });

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="w-full py-20 md:py-24 px-4 lg:px-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-8 max-w-2xl">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug"
          >
            Agents workflow on <span className="text-blue-600">GenAI OS</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            {featureDetails.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-300 ease-in-out border-l-2 pl-5 pr-3 py-3 rounded-md cursor-pointer ${
                  openAccordion === index
                    ? 'bg-blue-50 border-blue-600'
                    : 'hover:bg-gray-50 hover:border-blue-300 border-transparent'
                }`}
                onClick={() => toggleAccordion(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`transition-colors ${
                        openAccordion === index || hoveredIndex === index
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className={`text-base md:text-lg font-medium ${
                        openAccordion === index
                          ? 'text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: openAccordion === index ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`text-gray-400 ${
                      openAccordion === index ? 'text-blue-600' : ''
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-2 pl-9 text-sm text-gray-600"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl max-w-lg mx-auto w-full"
        >
          <div className="relative border border-gray-200 rounded-xl overflow-hidden h-[320px] bg-white flex items-center justify-center text-gray-400 text-sm">
            {/* Placeholder - replace with actual asset */}[ Agent Flow Graphic
            ]
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Agents;
