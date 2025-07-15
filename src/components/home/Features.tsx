'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Brain, Shield, Globe } from 'lucide-react';

const ModernFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const features = [
    {
      icon: Brain,
      title: 'Intelligent Processing',
      description: '200+ document types with adaptive ML',
      stats: '99.7% accuracy',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II with role-based access',
      stats: 'Bank-grade encryption',
      color: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      icon: Globe,
      title: 'Seamless Integration',
      description: 'APIs, connectors & custom workflows',
      stats: '50+ integrations',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform your workflows
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            From intelligent document processing to secure integrations, gain
            clarity, control, and confidence at every step.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Main Feature Card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Intelligent Document Processing
                </h3>
                <p className="text-sm text-gray-600">
                  AI that understands context, not just content
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                {[
                  'Recognizes 200+ document types',
                  'Understands context & relationships',
                  'Adaptive ML improves over time',
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  99%+
                </div>
                <p className="text-sm text-gray-500">Processing accuracy</p>
                <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full w-[99.7%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat Card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-2xl p-6 text-gray-900"
          >
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex justify-between">
                <span>Processing Speed</span>
                <span className="text-blue-600">12x faster</span>
              </li>
              <li className="flex justify-between">
                <span>Error Reduction</span>
                <span className="text-blue-600">95% less errors</span>
              </li>
              <li className="flex justify-between">
                <span>Operational Coverage</span>
                <span className="text-blue-600">200+ doc types</span>
              </li>
            </ul>
          </motion.div>

          {/* Feature Cards */}
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="md:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`w-12 h-12 ${f.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                {f.title}
              </h4>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {f.stats}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernFeaturesSection;
