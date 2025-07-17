"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    const ribbonClosed = localStorage.getItem("ribbon");
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

    // Features animation
    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    featuresTl.fromTo(
      featuresRef.current?.children,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
    );

    // Stats animation
    const statsTl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    statsTl.fromTo(
      statsRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // Cards animation
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    cardsTl.fromTo(
      cardsRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const agentTypes = [
    {
      title: "Customer Service Agents",
      description: "Intelligent virtual assistants that provide 24/7 customer support with human-like empathy and understanding.",
      icon: "🤖",
      gradient: "from-blue-500 to-purple-600",
      features: ["24/7 Availability", "Multi-language Support", "Emotional Intelligence", "Escalation Management"]
    },
    {
      title: "Sales & Marketing Agents",
      description: "AI-powered agents that qualify leads, nurture prospects, and drive conversions with personalized interactions.",
      icon: "💼",
      gradient: "from-green-500 to-blue-600",
      features: ["Lead Qualification", "Personalized Outreach", "Conversion Optimization", "Performance Analytics"]
    },
    {
      title: "Content Creation Agents",
      description: "Creative AI agents that generate high-quality content, from blog posts to social media campaigns.",
      icon: "✍️",
      gradient: "from-purple-500 to-pink-600",
      features: ["Content Strategy", "SEO Optimization", "Multi-format Creation", "Brand Voice Consistency"]
    },
    {
      title: "Data Analysis Agents",
      description: "Advanced AI agents that process complex data sets and provide actionable insights for business decisions.",
      icon: "📊",
      gradient: "from-orange-500 to-red-600",
      features: ["Real-time Analytics", "Predictive Modeling", "Custom Dashboards", "Automated Reports"]
    }
  ];

  const capabilities = [
    { title: "Deep Memory", description: "Contextual awareness across all interactions", icon: "🧠" },
    { title: "Reliable Knowledge", description: "Accurate, up-to-date information", icon: "📚" },
    { title: "Collaborative", description: "Seamless multi-agent coordination", icon: "🤝" },
    { title: "Accountable", description: "Transparent decision-making process", icon: "⚖️" },
    { title: "Contextually Aware", description: "Intelligent decision making", icon: "🎯" },
    { title: "Adaptive Learning", description: "Continuous improvement from interactions", icon: "🔄" }
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
                AI-Powered Agent Platform
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Intelligent</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Agents</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
              Create sophisticated AI agents that think, learn, and adapt. Transform your business with intelligent automation that feels remarkably human.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Start Building Agents
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105">
                Watch Demo
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

        {/* Stats Section */}
        {/* <section ref={statsRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">50M+</div>
                <div className="text-gray-600 font-medium">Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">200+</div>
                <div className="text-gray-600 font-medium">Enterprise Clients</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Agent Types Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Agent <span className="text-blue-600">Categories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover specialized AI agents designed for different business needs and industries
              </p>
            </div>
            
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agentTypes.map((agent, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                    <div className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-4">{agent.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{agent.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">{agent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {agent.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section ref={featuresRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Core <span className="text-blue-600">Capabilities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every agent is built with advanced capabilities that make them truly intelligent and effective
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <div key={index} className="group">
                  <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className="text-4xl mb-4">{capability.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                    <p className="text-gray-600">{capability.description}</p>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-black mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of companies using ThinkAct AI to build intelligent agents that drive real results
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;