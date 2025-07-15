'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is ThinkAct AI?',
    answer:
      'ThinkAct AI is an agentic platform that automates document understanding, verification, and compliance for regulated industries like mortgage lending and airport security.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We follow enterprise-grade security practices including SOC 2 Type II compliance, role-based access, and full encryption in transit and at rest.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-gray-50  border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-600  mt-2 max-w-xl mx-auto">
            Everything you need to know about the platform — all in one place.
          </p>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-gray-200 ">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full text-left group"
                >
                  <span
                    className={`text-base md:text-lg font-medium transition-colors ${
                      isOpen ? 'text-blue-600 ' : 'text-gray-900 '
                    }`}
                  >
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600  transition-transform" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-transform" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3"
                    >
                      <p className="text-sm md:text-base text-gray-600  leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
