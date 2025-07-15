"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReCAPTCHA from "react-google-recaptcha";


gsap.registerPlugin(ScrollTrigger);

export default function Support() {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const heroRef = useRef(null);
  const supportRef = useRef(null);
  const supportPortalRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    supportType: '',
    priority: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const recaptchaRef = useRef(null);

  useLayoutEffect(() => {
    const ribbonClosed = localStorage.getItem("ribbon") === "true";
    setIsRibbonClosed(ribbonClosed);
  }, []);

  useEffect(() => {
    // Hero animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    heroTl.fromTo(
      heroRef.current?.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Support animation
    const supportTl = gsap.timeline({
      scrollTrigger: {
        trigger: supportRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    supportTl.fromTo(
      supportRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );

    // Support portal animation
    const supportPortalTl = gsap.timeline({
      scrollTrigger: {
        trigger: supportPortalRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    supportPortalTl.fromTo(
      supportPortalRef.current?.children,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.supportType.trim()) {
      errors.supportType = 'Support type is required';
    }
    
    if (!formData.priority.trim()) {
      errors.priority = 'Priority is required';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Execute reCAPTCHA if available
    let recaptchaValue = null;
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && recaptchaRef.current) {
      recaptchaValue = await recaptchaRef.current.executeAsync();
      if (!recaptchaValue) {
        setSubmitStatus({
          type: 'error',
          message: 'reCAPTCHA verification failed. Please try again.'
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'support',
          recaptchaToken: recaptchaValue
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Support request submitted successfully! Our team will contact you soon.'
        });
        // Reset form
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          supportType: '',
          priority: '',
          subject: '',
          message: '',
        });
        // Reset reCAPTCHA if available
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit support request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportPlans = [
    {
      title: "Standard Support",
      subtitle: "Included with all subscriptions",
      features: [
        "Business hours support (8:00 AM - 8:00 PM ET, Monday - Friday)",
        "Email and chat support",
        "24-hour response time"
      ],
      icon: "📞"
    },
    {
      title: "Premium Support",
      subtitle: "Available as add-on",
      features: [
        "24/7 support",
        "Phone, email, and chat support",
        "4-hour response time",
        "Dedicated support representative"
      ],
      icon: "⚡"
    },
    {
      title: "Enterprise Support",
      subtitle: "Included with Enterprise plans",
      features: [
        "24/7 support",
        "Phone, email, and chat support",
        "1-hour response time",
        "Dedicated support team",
        "Quarterly account reviews"
      ],
      icon: "🏢"
    }
  ];

  return (
    <>
      <div className="overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Customer support
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Help</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto font-medium">
              Get the support you need with our comprehensive help options and dedicated customer service team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#support-form"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Support Request
              </a>
              <a 
                href="mailto:support@thinkact.ai"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Email Support
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                <div className="w-12 h-12 border-2 border-transparent border-t-blue-600/60 rounded-full"></div>
              </div>
              <div className="absolute inset-1 animate-[spin_6s_linear_infinite_reverse]">
                <div className="w-10 h-10 border-2 border-transparent border-r-purple-500/40 rounded-full"></div>
              </div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-lg"></div>
              <div className="absolute w-6 h-6 border border-blue-600/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            </div>
          </div>
        </section>

        {/* Support Plans Section */}
        <section ref={supportRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Customer <span className="text-blue-600">Support</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get the help you need with our comprehensive support options
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {supportPlans.map((plan, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full">
                    <div className="text-4xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-blue-600 font-semibold mb-6">{plan.subtitle}</p>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <p className="text-gray-600 text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Form Section */}
        <section id="support-form" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Submit Support Request
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and our support team will get back to you as soon as possible.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                    placeholder="Your Company"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {/* Support Type and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="supportType" className="block text-sm font-medium text-gray-700 mb-2">
                      Support Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="supportType"
                      name="supportType"
                      value={formData.supportType}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                        formErrors.supportType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select support type</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Account Support">Account Support</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.supportType && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.supportType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleFormChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                        formErrors.priority ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                    {formErrors.priority && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.priority}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Brief description of your issue"
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="6"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please provide detailed information about your issue..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>

                {/* Hidden reCAPTCHA */}
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  />
                )}

                {/* Status Message */}
                {submitStatus && (
                  <div 
                    className={`p-4 rounded-xl ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 text-white font-semibold rounded-xl transition focus:outline-none focus:ring-4 focus:ring-blue-600/20 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Support Portal */}
        <section ref={supportPortalRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">Customer Support Portal</h3>
              <p className="text-xl mb-8 opacity-90">
                Access our comprehensive support resources
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">🎫</div>
                  <div className="text-sm">Submit & Track Tickets</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-sm">Knowledge Base</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm">Documentation</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">🎥</div>
                  <div className="text-sm">Video Tutorials</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm">Community Forums</div>
                </div>
              </div>
              
              <a 
                href="mailto:support@thinkact.ai"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Access Support Portal
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}