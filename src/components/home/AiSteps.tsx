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
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-600',
    },
    {
      icon: Zap,
      title: 'Plan',
      description: 'Creates dynamic processing pipelines.',
      details: ['Smart routing', 'Priority queues', 'Verification layers'],
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      accentColor: 'bg-purple-600',
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
    <section className="relative flex-1 min-h-0 flex flex-col justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 md:px-8 lg:px-12 py-20 overflow-hidden">
      <div
        className="[background-size:70px_70px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] absolute inset-0 z-0 opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] opacity-60" />

      <div className="relative z-20 flex-1 flex flex-col justify-center gap-6 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2 leading-tight">
            How Think
            <span className="text-blue-600">Act</span> AI Works
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
            From intelligent thinking to precise execution—see how our AI flows.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex justify-center items-stretch gap-6 flex-1">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="relative flex-1 max-w-[230px]">
              {/* Card */}
              <div
                className={`h-full rounded-2xl p-3 border shadow-sm hover:shadow-md transition-all duration-300 ${step.borderColor} bg-white/95 flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="relative flex flex-col items-center gap-2 pt-3 min-w-[2.25rem]">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ${step.accentColor}`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${step.borderColor} bg-white`}>
                      <step.icon className={`w-4 h-4 ${step.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-semibold text-slate-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${step.accentColor}`}
                      />
                      <span className="text-xs text-slate-700 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 px-2">
                  <div className="w-9 h-9 rounded-full border-2 shadow-sm flex items-center justify-center bg-white border-slate-200 p-1">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-4 flex-1 overflow-y-auto pr-1 pt-8">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="relative">
              <div
                className={`rounded-2xl p-4 border shadow-sm bg-white/95 ${step.borderColor}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="relative flex flex-col items-center gap-2 pt-4 min-w-[2.5rem]">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                      <div
                        className={`w-8 h-8 rounded-full text-white font-bold flex items-center justify-center text-sm ${step.accentColor}`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center border ${step.borderColor} bg-white`}
                    >
                      <step.icon className={`w-4 h-4 ${step.iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${step.accentColor}`}
                      />
                      <span className="text-xs text-slate-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center py-4 px-2">
                  <div className="w-8 h-8 rounded-full border-2 shadow-sm flex items-center justify-center bg-white border-slate-200 p-1">
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
