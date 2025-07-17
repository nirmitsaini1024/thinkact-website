'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  ArrowRight,
  Workflow,
  Shield,
  Target,
  GitBranch,
} from 'lucide-react';
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
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const orchestrationFeatures = [
  {
    icon: <Target className="w-6 h-6 text-blue-600" />,
    title: 'Declarative Service Intents',
    description:
      'Define what you want to achieve. Agents understand goals and break them into executable tasks.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-blue-600" />,
    title: 'Dynamic Context Switching',
    description:
      'Agents pass context and maintain continuity across multi-step workflows.',
  },
  {
    icon: <Workflow className="w-6 h-6 text-blue-600" />,
    title: 'Visual Workflow Design',
    description:
      'Design and debug workflows with real-time orchestration insights.',
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: 'Sandboxed Agent Modules',
    description: 'Each agent runs securely within isolated boundaries.',
  },
];

const workflowSteps = [
  {
    step: '1',
    title: 'Intent Recognition',
    description:
      'Gateway Agent detects and interprets user intent from input signals.',
  },
  {
    step: '2',
    title: 'Agent Routing',
    description:
      'Gateway Agent forwards request to the most appropriate specialized agent.',
  },
  {
    step: '3',
    title: 'Memory Injection',
    description:
      'Agent retrieves and merges relevant memory/context to personalize execution.',
  },
  {
    step: '4',
    title: 'Task Execution',
    description:
      'Agent completes task autonomously or by invoking external tools or APIs.',
  },
  {
    step: '5',
    title: 'Multi-Agent Coordination',
    description:
      'Gateway combines results from multiple agents and constructs final output.',
  },
];

const ThinkActAgentic: React.FC = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: true, amount: 0.3 });
  const router = useRouter();

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section
        id="thinkagentic"
        className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={headlineRef}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold leading-tight text-slate-900"
            >
              ThinkAct<sup className="text-slate-500">®</sup>{' '}
              <span className="text-blue-600">Agentic</span>
              <br />
              Platform for Autonomous Workflows
            </motion.h1>

            <motion.h1
              variants={itemVariants}
              className="text-base md:text-lg text-slate-600 max-w-xl"
            >
              <p className="text-xl md:text-2xl text-cemter font-bold text-blue-900 mb-6 leading-tight">
                Seamless Agent{' '}
                <span className="text-blue-600">Orchestration</span>
              </p>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm text-slate-500 max-w-xl"
            >
              ThinkAct enables dynamic workflows where agents collaborate and
              hand off tasks to achieve high-level goals. Our orchestration
              engine makes your AI ecosystem operate like an autonomous team.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => router.push('/contact-us')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all group"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right */}
          <div className="w-full aspect-[16/9] bg-white border border-slate-200 rounded-2xl shadow-md flex items-center justify-center text-slate-400 text-sm">
            [ Product Screenshot or Hero Graphic ]
          </div>
        </div>
      </section>

      {/* Orchestration Features */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-900 mb-4">
              Orchestration Features
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              ThinkAct coordinates agents using structured workflows, shared
              context, and secure intent-driven modules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {orchestrationFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Workflow Steps
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Explore how an intent flows through our agentic orchestration
              system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex items-start"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium mr-4">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-slate-800">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThinkActAgentic;
