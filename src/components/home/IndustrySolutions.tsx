'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Plane,
  FileText,
  Shield,
  ArrowRight,
  DollarSign,
  Users,
  AlertTriangle,
  FileCheck,
  Lock,
  Landmark,
  Briefcase,
  ClipboardCheck,
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
}

interface Industry {
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  description: string;
  stats: Record<string, string>;
  features: Feature[];
}

const industries: Record<string, Industry> = {
  mortgage: {
    title: 'Mortgage',
    icon: Building2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    description:
      'Streamline the entire loan document lifecycle with AI-powered processing.',
    stats: {
      processing: '40% faster processing',
      accuracy: '99.5% accuracy rate',
      compliance: '100% regulatory compliance',
    },
    features: [
      {
        icon: FileText,
        title: 'Loan Application Processing',
        description:
          'Extract and verify information from loan applications automatically.',
        details:
          'Extract borrower info, income data, and loan terms with 99.5% accuracy.',
      },
      {
        icon: DollarSign,
        title: 'Income Verification',
        description:
          'Analyze pay stubs, tax returns, and bank statements seamlessly.',
        details:
          'Cross-check multiple income sources and detect inconsistencies.',
      },
      {
        icon: Shield,
        title: 'Compliance Verification',
        description:
          'Ensure adherence to regulations like TRID, HMDA, and ECOA.',
        details: 'Real-time updates and automated compliance checks included.',
      },
    ],
  },
  aviation: {
    title: 'Aviation',
    icon: Plane,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    description:
      'Enhance credential verification and threat detection using advanced AI.',
    stats: {
      processing: '60% faster verification',
      accuracy: '99.9% accuracy rate',
      threats: '85% threat detection improvement',
    },
    features: [
      {
        icon: Users,
        title: 'Credential Verification',
        description: 'Instant validation for employee and contractor IDs.',
        details: 'Verify credentials across databases and clearance levels.',
      },
      {
        icon: AlertTriangle,
        title: 'Threat Detection',
        description: 'Detect risks via intelligent document scanning.',
        details: 'AI-based pattern detection and risk flagging in real time.',
      },
      {
        icon: FileCheck,
        title: 'Compliance Documentation',
        description: 'Meet TSA and ICAO regulations seamlessly.',
        details: 'Auto-generate reports to meet global security standards.',
      },
    ],
  },
  government: {
    title: 'Government',
    icon: Landmark,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    description:
      'Modernize public sector workflows with secure AI-based automation.',
    stats: {
      digitization: '80% paperless transition',
      response: '50% faster case resolution',
      transparency: 'Enhanced auditability',
    },
    features: [
      {
        icon: ClipboardCheck,
        title: 'Citizen Document Handling',
        description: 'Process citizen records, IDs, and service forms.',
        details: 'Real-time validation, classification, and secure storage.',
      },
      {
        icon: Shield,
        title: 'Data Privacy Compliance',
        description: 'Maintain data sovereignty and compliance.',
        details: 'Supports GDPR, DPDP, and internal security frameworks.',
      },
      {
        icon: FileText,
        title: 'Policy Document Automation',
        description: 'Generate, review, and manage policies at scale.',
        details: 'Track versions and changes with digital signature trails.',
      },
    ],
  },
  corporate: {
    title: 'Corporate',
    icon: Briefcase,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    description:
      'Automate internal operations and enterprise document workflows.',
    stats: {
      productivity: '35% boost in team efficiency',
      accuracy: '98% data validation accuracy',
      turnaround: '2x faster approvals',
    },
    features: [
      {
        icon: FileCheck,
        title: 'Contract Lifecycle Automation',
        description: 'Draft, analyze, and route contracts automatically.',
        details: 'Clause extraction and approval workflows made simple.',
      },
      {
        icon: Users,
        title: 'Employee Onboarding Docs',
        description: 'Handle offer letters, ID proofs, and KYC efficiently.',
        details: 'Auto-classification and HRMS integration included.',
      },
      {
        icon: Lock,
        title: 'Access Control Compliance',
        description: 'Ensure document access matches enterprise policy.',
        details: 'RBAC support with logs and audit-ready permission snapshots.',
      },
    ],
  },
};

const IndustrySolutions: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] =
    useState<keyof typeof industries>('mortgage');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const current = industries[selectedIndustry];

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-white to-neutral-50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for your <span className="text-blue-600">industry</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl">
            Tailored AI solutions designed to address the real challenges in
            your domain.
          </p>
        </motion.div>

        {/* Industry Selector */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex gap-2 flex-wrap mb-12"
        >
          {Object.entries(industries).map(([key, industry]) => {
            const Icon = industry.icon;
            const active = selectedIndustry === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedIndustry(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {industry.title}
              </button>
            );
          })}
        </motion.div>

        {/* Industry Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=" grid-cols-1 lg:grid-cols-3 gap-8 hidden"
          >
            {/* Overview */}
            <div className={`rounded-xl border p-6 ${current.bg} space-y-6`}>
              <div className="flex items-center gap-3">
                <current.icon className={`w-6 h-6 ${current.color}`} />
                <h3 className="text-xl font-semibold text-gray-900">
                  {current.title}
                </h3>
              </div>
              <p className="text-sm text-gray-700">{current.description}</p>

              <ul className="space-y-3 text-sm">
                {Object.entries(current.stats).map(([label, value]) => (
                  <li key={label} className="flex justify-between">
                    <span className="capitalize text-gray-500">{label}</span>
                    <span className={`font-medium ${current.color}`}>
                      {value as string}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Get Started <ArrowRight className="inline w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Features */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {current.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="border rounded-md p-4 bg-white hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <f.icon className={`w-5 h-5 ${current.color}`} />
                    <h4 className="font-medium text-gray-900">{f.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{f.description}</p>

                  <AnimatePresence>
                    {hoveredFeature === i && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0.95 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="origin-top text-sm mt-2 bg-gray-50 p-3 rounded-md text-gray-700"
                      >
                        {f.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndustrySolutions;
