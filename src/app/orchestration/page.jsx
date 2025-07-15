'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Network,
  Brain,
  Target,
  Users,
  Workflow,
  MessageCircle,
  Cpu,
  GitBranch,
  Shield,
  Play,
} from 'lucide-react';

const OrchestrationPage = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Declarative Service Intents',
      description:
        'Define what you want to achieve. Agents understand goals and break them into executable tasks.',
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Dynamic Context Switching',
      description:
        'Agents pass context and maintain continuity across multi-step workflows.',
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Visual Workflow Design',
      description:
        'Design and debug workflows with real-time orchestration insights.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
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

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 mx-auto max-w-7xl text-center pt-32">
        <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 mb-8">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-medium">
            AI Agent Orchestration
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
          Seamless Agent <span className="text-blue-600">Orchestration</span>
        </h1>

        <p className="text-lg text-zinc-600 max-w-4xl mx-auto mb-12">
          ThinkAct enables dynamic workflows where agents collaborate and hand
          off tasks to achieve high-level goals. Our orchestration engine makes
          your AI ecosystem operate like an autonomous team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md">
            <span className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Orchestrating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="group border border-blue-200 text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-blue-50">
            <span className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Learn More</span>
            </span>
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Orchestration Features
            </h2>
            <p className="text-lg text-zinc-600 max-w-4xl mx-auto">
              ThinkAct coordinates agents using structured workflows, shared
              context, and secure intent-driven modules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="w-full py-24 px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Workflow Steps
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
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
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-semibold mr-6 mt-1">
                {step.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800">
                  {step.title}
                </h3>
                <p className="text-zinc-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Orchestrate?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Build your intelligent workflows using ThinkAct’s agentic
            coordination platform.
          </p>
          <button className="group bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg">
            <span className="flex items-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrchestrationPage;
