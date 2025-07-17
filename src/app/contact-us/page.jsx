"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReCAPTCHA from "react-google-recaptcha";


gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');
  const heroRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  // Demo form state
  const [demoFormData, setDemoFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    companySize: '',
    industry: '',
    primaryInterest: '',
    howDidYouHear: '',
    comments: '',
    preferredContactMethod: '',
    preferredDemoDate: '',
  });

  // General contact form state
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
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

    // Contact info animation
    const contactInfoTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactInfoRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    contactInfoTl.fromTo(
      contactInfoRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // Form animation
    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    formTl.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const validateDemoForm = () => {
    const errors = {};
    
    if (!demoFormData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!demoFormData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!demoFormData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    
    if (!demoFormData.jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }
    
    if (!demoFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!demoFormData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(demoFormData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!demoFormData.industry.trim()) {
      errors.industry = 'Industry is required';
    }
    
    if (!demoFormData.primaryInterest.trim()) {
      errors.primaryInterest = 'Primary interest is required';
    }
    
    if (!demoFormData.preferredContactMethod.trim()) {
      errors.preferredContactMethod = 'Preferred contact method is required';
    }
    
    return errors;
  };

  const validateContactForm = () => {
    const errors = {};
    
    if (!contactFormData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!contactFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!contactFormData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    if (contactFormData.phoneNumber && !/^\+?[0-9\s\-()]{8,20}$/.test(contactFormData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const handleDemoFormChange = (e) => {
    const { name, value } = e.target;
    setDemoFormData(prevData => ({
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

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prevData => ({
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

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateDemoForm();
    
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
          ...demoFormData,
          formType: 'demo',
          recaptchaToken: recaptchaValue
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Demo request submitted successfully! We\'ll contact you soon.'
        });
        // Reset form
        setDemoFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          jobTitle: '',
          email: '',
          phoneNumber: '',
          companySize: '',
          industry: '',
          primaryInterest: '',
          howDidYouHear: '',
          comments: '',
          preferredContactMethod: '',
          preferredDemoDate: '',
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
        message: error.message || 'Failed to submit demo request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateContactForm();
    
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
          ...contactFormData,
          formType: 'contact',
          recaptchaToken: recaptchaValue
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!'
        });
        // Reset form
        setContactFormData({
          fullName: '',
          companyName: '',
          phoneNumber: '',
          email: '',
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
        message: error.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { 
      title: "General Inquiries", 
      email: "info@thinkact.ai", 
      icon: "📧",
      description: "Get in touch for general questions and information"
    },
    { 
      title: "Sales", 
      email: "sales@thinkact.ai", 
      icon: "💼",
      description: "Speak with our sales team about solutions"
    },
    { 
      title: "Careers", 
      email: "careers@thinkact.ai", 
      icon: "🎯",
      description: "Join our team and grow with us"
    }
  ];

  const salesInquiries = [
    {
      title: "Mortgage Solutions Team",
      email: "mortgage@thinkact.ai",
      description: "Connect with our mortgage solutions specialists to discuss how ThinkAct AI can streamline your loan processing workflows.",
      icon: "🏠"
    },
    {
      title: "Security Solutions Team", 
      email: "security@thinkact.ai",
      description: "Speak with our security solutions experts about enhancing your credential verification and threat detection capabilities.",
      icon: "✈️"
    }
  ];


  return (
    <>
      <div className="overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-40 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">ThinkAct AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto font-medium">
              Ready to transform your document processing? Let's start the conversation about your intelligent automation needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setActiveTab('demo')}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule Demo
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                General Inquiry
              </button>
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
              <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-lg"></div>
              <div className="absolute w-6 h-6 border border-blue-600/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section ref={contactInfoRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                How to <span className="text-blue-600">Reach Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple ways to connect with our team
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <div key={index} className="group h-full">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 h-full flex flex-col">
                    <div className="text-4xl mb-4">{method.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{method.description}</p>
                    <a 
                      href={`mailto:${method.email}`}
                      className="text-blue-600 hover:text-blue-600/80 font-semibold transition-colors duration-300 mt-auto"
                    >
                      {method.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours of Operation */}
            {/* <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-6">Hours of Operation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-lg font-semibold mb-2">Monday - Friday</div>
                  <div className="opacity-90">8:00 AM - 8:00 PM ET</div>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-2">Saturday</div>
                  <div className="opacity-90">9:00 AM - 5:00 PM ET</div>
                  <div className="text-sm opacity-75">(Support Only)</div>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-2">Sunday</div>
                  <div className="opacity-90">Closed</div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Forms Section */}
        <section ref={formRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'demo' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Demo Request
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'contact' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  General Contact
                </button>
              </div>
            </div>

            {/* Demo Request Form */}
            {activeTab === 'demo' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Schedule a Demo
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  See ThinkAct AI in action and discover how we can transform your document processing workflows.
                </p>
                
                <form className="space-y-6" onSubmit={handleDemoSubmit}>
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={demoFormData.firstName}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      {formErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={demoFormData.lastName}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {formErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Company and Job Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={demoFormData.companyName}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your Company"
                      />
                      {formErrors.companyName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.companyName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={demoFormData.jobTitle}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.jobTitle ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="CTO, VP of Operations, etc."
                      />
                      {formErrors.jobTitle && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.jobTitle}</p>
                      )}
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={demoFormData.email}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@company.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={demoFormData.phoneNumber}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formErrors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Company Size and Industry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={demoFormData.companySize}
                        onChange={handleDemoFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-200 employees">51-200 employees</option>
                        <option value="201-500 employees">201-500 employees</option>
                        <option value="501-1000 employees">501-1000 employees</option>
                        <option value="1000+ employees">1000+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={demoFormData.industry}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.industry ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select industry</option>
                        <option value="Mortgage Lending">Mortgage Lending</option>
                        <option value="Airport Security">Airport Security</option>
                        <option value="Other">Other (please specify in comments)</option>
                      </select>
                      {formErrors.industry && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.industry}</p>
                      )}
                    </div>
                  </div>

                  {/* Primary Interest and How Did You Hear */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="primaryInterest" className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="primaryInterest"
                        name="primaryInterest"
                        value={demoFormData.primaryInterest}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.primaryInterest ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select primary interest</option>
                        <option value="Document Classification">Document Classification</option>
                        <option value="Data Extraction">Data Extraction</option>
                        <option value="Compliance Automation">Compliance Automation</option>
                        <option value="Fraud Detection">Fraud Detection</option>
                        <option value="Integration Capabilities">Integration Capabilities</option>
                        <option value="Other">Other (please specify in comments)</option>
                      </select>
                      {formErrors.primaryInterest && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.primaryInterest}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-2">
                        How did you hear about us?
                      </label>
                      <input
                        type="text"
                        id="howDidYouHear"
                        name="howDidYouHear"
                        value={demoFormData.howDidYouHear}
                        onChange={handleDemoFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                        placeholder="Google, LinkedIn, referral, etc."
                      />
                    </div>
                  </div>

                  {/* Contact Method and Demo Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferredContactMethod"
                        name="preferredContactMethod"
                        value={demoFormData.preferredContactMethod}
                        onChange={handleDemoFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.preferredContactMethod ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select contact method</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                      </select>
                      {formErrors.preferredContactMethod && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.preferredContactMethod}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="preferredDemoDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Demo Date and Time
                      </label>
                      <input
                        type="text"
                        id="preferredDemoDate"
                        name="preferredDemoDate"
                        value={demoFormData.preferredDemoDate}
                        onChange={handleDemoFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                        placeholder="Next week, Monday 2PM ET, etc."
                      />
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments or Questions
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={demoFormData.comments}
                      onChange={handleDemoFormChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                      placeholder="Tell us more about your specific needs or challenges..."
                    ></textarea>
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
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600/90 hover:to-blue-700/90 transform hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                  </button>
                </form>
              </div>
            )}

            {/* General Contact Form */}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  General Contact
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Have questions or need more information? We're here to help.
                </p>
                
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={contactFormData.fullName}
                      onChange={handleContactFormChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${
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
                      value={contactFormData.companyName}
                      onChange={handleContactFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={contactFormData.phoneNumber}
                        onChange={handleContactFormChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (123) 456-7890"
                      />
                      {formErrors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactFormChange}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                  
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
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600/90 hover:to-blue-700/90 transform hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Sales Inquiries Section */}
        {/* <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Sales <span className="text-blue-600">Inquiries</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-specific solutions expertise for your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {salesInquiries.map((inquiry, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-4">{inquiry.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{inquiry.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{inquiry.description}</p>
                    
                    <a 
                      href={`mailto:${inquiry.email}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Contact Team
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Support Information */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Need Technical Support?</h3>
              <p className="text-xl mb-8 opacity-90">
                Visit our dedicated support page for comprehensive help resources
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/support" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Visit Support Center
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <a 
                  href="mailto:support@thinkact.ai"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Email Support
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Contact Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Partnership Opportunities</h3>
                <p className="text-gray-600 mb-4">Technology, Implementation, Reseller, and Industry Solution Partners</p>
                <a href="mailto:partners@thinkact.ai" className="text-blue-600 font-semibold hover:text-blue-600/80">
                  partners@thinkact.ai
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Investor Relations</h3>
                <p className="text-gray-600 mb-4">Investment opportunities and financial information</p>
                <a href="mailto:investors@thinkact.ai" className="text-blue-600 font-semibold hover:text-blue-600/80">
                  investors@thinkact.ai
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📰</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Media Inquiries</h3>
                <p className="text-gray-600 mb-4">Press releases, media kits, and interview requests</p>
                <a href="mailto:media@thinkact.ai" className="text-blue-600 font-semibold hover:text-blue-600/80">
                  media@thinkact.ai
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Office Location */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-blue-600">Location</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Headquarters located in New Jersey, United States
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-md mx-auto">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">ThinkAct AI Headquarters</h3>
              <p className="text-gray-600 mb-4">New Jersey, United States</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-600/80 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-600/80 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-600/80 transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}