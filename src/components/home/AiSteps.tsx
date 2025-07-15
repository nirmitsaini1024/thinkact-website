'use client';

import React from 'react';
import { CheckCircle, Brain, Zap, ArrowRight } from 'lucide-react';

const AiSteps = () => {
  const workflowSteps = [
    {
      icon: Brain,
      title: 'Think',
      description: 'AI analyzes context & identifies risks.',
      details: ['Pattern recognition', 'Risk assessment', 'Quality adaptation'],
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      accentColor: 'bg-purple-600',
    },
    {
      icon: Zap,
      title: 'Plan',
      description: 'Creates dynamic processing pipelines.',
      details: ['Smart routing', 'Priority queues', 'Verification layers'],
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-600',
    },
    {
      icon: CheckCircle,
      title: 'Action',
      description: 'High-precision extraction & validation.',
      details: ['Multi-source verification', 'Audit trails', 'Real-time flags'],
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      accentColor: 'bg-emerald-600',
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
            How Think
            <span className="text-blue-600">Act</span> AI Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            From intelligent thinking to precise execution—see how our AI flows.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-start gap-12">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="relative flex-1">
              {/* Card */}
              <div
                className={`rounded-2xl p-8 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${step.borderColor} bg-white`}
              >
                {/* Badge */}
                <div className="absolute -top-4 left-6">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${step.accentColor}`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center border ${step.borderColor} bg-white`}
                >
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>

                <h4 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-base text-slate-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-3">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${step.accentColor}`}
                      />
                      <span className="text-sm text-slate-700 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="absolute right-[-32px] top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 rounded-full border-2 shadow-sm flex items-center justify-center bg-white border-slate-200">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-8 mt-10">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="relative">
              <div
                className={`rounded-2xl p-6 border shadow-sm bg-white ${step.borderColor}`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full text-white font-bold flex items-center justify-center ${step.accentColor}`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.borderColor} bg-white`}
                  >
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h4>
                </div>

                <p className="text-base text-slate-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${step.accentColor}`}
                      />
                      <span className="text-sm text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 rounded-full border-2 shadow-sm flex items-center justify-center bg-white border-slate-200">
                    <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiSteps;
