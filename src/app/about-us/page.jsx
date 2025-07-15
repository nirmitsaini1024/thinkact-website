"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const problemsRef = useRef(null);
  const approachRef = useRef(null);
  const valuesRef = useRef(null);
  const whyChooseRef = useRef(null);
  const teamRef = useRef(null);

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

    // Story animation
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    storyTl.fromTo(
      storyRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // Mission animation
    const missionTl = gsap.timeline({
      scrollTrigger: {
        trigger: missionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    missionTl.fromTo(
      missionRef.current?.children,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
    );

    // Problems animation
    const problemsTl = gsap.timeline({
      scrollTrigger: {
        trigger: problemsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    problemsTl.fromTo(
      problemsRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );

    // Approach animation
    const approachTl = gsap.timeline({
      scrollTrigger: {
        trigger: approachRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    approachTl.fromTo(
      approachRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    // Values animation
    const valuesTl = gsap.timeline({
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    valuesTl.fromTo(
      valuesRef.current?.children,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
    );

    // Why Choose animation
    const whyChooseTl = gsap.timeline({
      scrollTrigger: {
        trigger: whyChooseRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    whyChooseTl.fromTo(
      whyChooseRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );

    // Team animation
    const teamTl = gsap.timeline({
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    teamTl.fromTo(
      teamRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const problemsData = [
    {
      title: "Mortgage Lending",
      problems: [
        "Lenders spend 60% of their time on manual document review",
        "Error rates average 30% leading to costly delays",
        "Document verification costs $1,500-$2,000 per loan",
        "Average processing time of 45-60 days frustrates customers"
      ],
      icon: "🏠",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Airport Security Program",
      problems: [
        "Security screening systems face 40% false positive rates",
        "15% of potential threats are missed due to human error",
        "Staff turnover reaches 35% annually due to stress",
        "Inefficient credential verification creates bottlenecks"
      ],
      icon: "✈️",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const approachData = [
    {
      title: "Think",
      description: "Our AI agents understand document context, relationships, and implications—not just text extraction. They comprehend industry-specific terminology and regulatory requirements, making connections that would otherwise require human expertise.",
      icon: "🧠",
      gradient: "from-blue-600 to-blue-600"
    },
    {
      title: "Plan",
      description: "Based on this understanding, our system creates dynamic processing workflows, adapting in real-time to document variations, quality issues, and changing requirements. It prioritizes critical information and identifies potential compliance risks before they become problems.",
      icon: "📋",
      gradient: "from-green-500 to-blue-600"
    },
    {
      title: "Execute",
      description: "ThinkAct AI autonomously carries out complex document tasks with minimal human intervention—from classification and data extraction to verification and compliance checking. The system continuously learns from each interaction, becoming more efficient and accurate over time.",
      icon: "⚡",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const valuesData = [
    {
      title: "Innovation Without Compromise",
      description: "We push the boundaries of what's possible in AI while maintaining unwavering standards for security, accuracy, and compliance.",
      icon: "🚀"
    },
    {
      title: "Customer-Centric Solutions",
      description: "We design our technology around real-world challenges, measuring our success by the tangible outcomes we deliver for our clients.",
      icon: "🎯"
    },
    {
      title: "Responsible AI",
      description: "We develop our technology with strong ethical principles, ensuring transparency, fairness, and accountability in all our AI systems.",
      icon: "⚖️"
    },
    {
      title: "Security by Design",
      description: "We build security into every aspect of our platform, protecting our clients' most sensitive information at every step.",
      icon: "🔒"
    },
    {
      title: "Continuous Improvement",
      description: "We're never satisfied with the status quo, constantly refining our technology to deliver better results for our clients.",
      icon: "🔄"
    }
  ];

  const whyChooseData = [
    {
      title: "Industry-Specific Expertise",
      description: "Purpose-built solutions for mortgage lending and airport security",
      icon: "🏭"
    },
    // {
    //   title: "Proven Results",
    //   description: "80% reduction in processing time and 95% decrease in errors",
    //   icon: "📊"
    // },
    {
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II certified with role-based access controls",
      icon: "🛡️"
    },
    {
      title: "Seamless Integration",
      description: "Connect with your existing systems through our secure API",
      icon: "🔗"
    },
    {
      title: "Scalable Platform",
      description: "Grows with your business from startup to enterprise",
      icon: "📈"
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
              <span className="inline-block px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">ThinkAct AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto font-medium">
              Revolutionizing document processing through agentic AI, transforming how highly regulated industries handle their most critical workflows
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
              <Link href="/agents">
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105">
                  Explore Agents
                </button>
              </Link>
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

        {/* Company Story Section */}
        <section ref={storyRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                ThinkAct AI was founded in 2024 with a singular vision to revolutionize document processing through agentic AI. We were born at the intersection of artificial intelligence and industry-specific challenges when our founders recognized that traditional document processing systems were failing to meet complex needs of highly regulated industries.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                A team of AI researchers, document security experts, and industry veterans came together to create a solution that could think, plan, and execute autonomously—moving beyond static rules and template-based approaches.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section ref={missionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                      🎯
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To empower organizations to unlock the full potential of their document workflows through intelligent automation that understands context, adapts to changing conditions, and continuously improves over time. We're committed to reducing processing time, eliminating errors, and enhancing security while delivering measurable ROI.
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                      🔮
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    We envision a future where document processing is no longer a bottleneck but a strategic advantage. A world where mortgage applications are processed in days not months, where airport security credentials are verified instantly with uncompromising accuracy, and where compliance is built into every step of the document lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems We're Solving Section */}
        {/* <section ref={problemsRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Problems We're <span className="text-blue-600">Solving</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Addressing critical challenges in highly regulated industries with intelligent automation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problemsData.map((problem, index) => (
                <div key={index} className="group h-full">
                  <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-4">{problem.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{problem.title}</h3>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        {problem.problems.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Our Approach Section */}
        <section ref={approachRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Our <span className="text-blue-600">Approach</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The Power of Agentic AI - Think, Plan, Execute
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {approachData.map((approach, index) => (
                <div key={index} className="group h-full">
                  <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-r ${approach.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-4">{approach.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{approach.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed flex-grow">{approach.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section ref={valuesRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Our <span className="text-blue-600">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesData.map((value, index) => (
                <div key={index} className="group h-full">
                  <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 h-full flex flex-col">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 flex-grow">{value.description}</p>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section ref={whyChooseRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Why Choose <span className="text-blue-600">ThinkAct AI</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven results and enterprise-grade solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseData.map((reason, index) => (
                <div key={index} className="group h-full">
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 h-full flex flex-col">
                    <div className="text-4xl mb-4">{reason.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                    <p className="text-gray-600 flex-grow">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section ref={teamRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Meet Our <span className="text-blue-600">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The visionaries behind ThinkAct AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
              <div className="group h-full md:col-span-2">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center flex-grow">
                    <Image
                      src="/assets/profile-manjeet.png"
                      alt="Manjeet Singh"
                      width={200}
                      height={200}
                      className="rounded-2xl mb-6 shadow-lg"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Manjeet Singh</h3>
                    <p className="text-blue-600 font-semibold mb-4">Founder</p>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      Manjeet is visionary founder of ThinkAct AI leading in delivering transformative technology solutions by leveraging AI models and agents that empower enterprises to innovate, scale, and succeed. With over two decades of experience in the technology sector, he specializes in cloud-native SaaS products, blockchain, and cryptography to enhance trust, transparency, and security in digital ecosystems.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group h-full md:col-span-3">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center flex-grow">
                    <Image
                      src="/assets/profile-gallo.jpg"
                      alt="Christopher Gallo"
                      width={200}
                      height={200}
                      className="rounded-2xl mb-6 shadow-lg"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Christopher Gallo</h3>
                    <p className="text-blue-600 font-semibold mb-4">Chief Sales Officer</p>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      Christopher Gallo is a dynamic sales leader renowned for his ability to drive extraordinary results, having originated and managed billions of dollars in sales throughout his career. With over two decades of experience, he has consistently demonstrated an exceptional talent for building high-performing teams, optimizing complex workflows, and delivering outstanding value to clients and partners alike. Christopher’s strategic vision and commitment to operational excellence have positioned him as a trusted advisor and innovator in the field of sales leadership. His approach is defined by a deep understanding of customer needs, a relentless focus on efficiency, and a passion for leveraging technology to achieve scalable growth. Based in New Jersey, Christopher balances his professional achievements with a strong dedication to family and personal well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-black mb-6">Ready to Transform Your Document Workflows?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join our journey and discover how ThinkAct AI can revolutionize your document processing with intelligent automation that truly understands your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Schedule a Demo
                </button>
              </Link>
              <Link href="/agents">
                <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                  Explore Solutions
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
