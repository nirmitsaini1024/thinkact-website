"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
import { SiFigma } from "react-icons/si";
import { FaCode, FaDatabase, FaUsers, FaRocket, FaHeart, FaGlobe } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const jobsRef = useRef(null);
  const benefitsRef = useRef(null);

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

    // Jobs animation
    const jobsTl = gsap.timeline({
      scrollTrigger: {
        trigger: jobsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    jobsTl.fromTo(
      jobsRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    // Benefits animation
    const benefitsTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    benefitsTl.fromTo(
      benefitsRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const jobPositions = [
    {
      title: "UI Developer",
      department: "Frontend",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Seasoned professional with hands-on working experience building responsive cross browsers and devices UI applications.",
      requirements: [
        "Front-end development skills like HTML, CSS, JavaScript",
        "Knowledge of NodeJS, ReactJS",
        "Good working knowledge of MongoDB database",
        "Understanding of responsive design interfaces and cross-browser components",
        "Performance optimization"
      ],
      icon: <FaCode className="text-2xl" />,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Backend Developer",
      department: "Backend",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Expert lead developer with solid understanding of data structures and algorithms, excellent problem-solving abilities, and the capability to collaborate effectively with other team members.",
      requirements: [
        "Expertise in Python and NextJS, Async programming, large data processing, Rest API development",
        "In-depth knowledge of MongoDB and relation databases",
        "Familiarity with public cloud platforms, caching, OAuth, multi-tenant architecture",
        "Keep data privacy and app security at high priority while developing quality software"
      ],
      icon: <FaDatabase className="text-2xl" />,
      gradient: "from-green-500 to-blue-600"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Combination of design skills, research abilities, strong communication, technical proficiency in design software, understanding of user-centered design principles, and the ability to collaborate effectively with teams.",
      requirements: [
        "Creating low-fidelity visual layouts to map out the basic structure and functionality of a product",
        "Applying aesthetic principles to create visually appealing interfaces with typography, color schemes, and layout",
        "Expertise in tools like Figma, Adobe XD, Sketch, and InVision",
        "Knowledge of basic web development languages like HTML and CSS"
      ],
      icon: <SiFigma className="text-2xl" />,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const companyValues = [
    {
      title: "Innovation First",
      description: "We push the boundaries of AI technology to create breakthrough solutions",
      icon: <FaRocket className="text-3xl text-blue-600" />
    },
    {
      title: "Human-Centered",
      description: "Technology should enhance human potential, not replace it",
      icon: <FaHeart className="text-3xl text-red-500" />
    },
    {
      title: "Global Impact",
      description: "Our work spans continents, creating positive change worldwide",
      icon: <FaGlobe className="text-3xl text-green-500" />
    },
    {
      title: "Collaborative Spirit",
      description: "The best ideas emerge when brilliant minds work together",
      icon: <FaUsers className="text-3xl text-blue-500" />
    }
  ];

  const benefits = [
    "Competitive salary with equity options",
    "Flexible work arrangements (remote/hybrid)",
    "Professional development budget",
    "Health & wellness programs",
    "Latest tech equipment & tools",
    "Unlimited learning opportunities"
  ];

  return (
    <>
      <div className=" overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
                Join Our Mission
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Shape the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Future</span>
              <br />
              of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join a team of visionaries building the next generation of AI technology. Create intelligent solutions that transform how businesses operate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:hello@thinkact.ai" 
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <HiOutlineMail className="mr-2" />
                Apply Now
              </a>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-700 hover:text-white transition-all duration-300 hover:scale-105">
                View Open Positions
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

        {/* Company Values */}
        <section ref={valuesRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Our <span className="text-blue-600">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at ThinkAct AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="group h-full">
                  <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center h-full flex flex-col">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm flex-grow">{value.description}</p>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Open <span className="text-blue-600">Positions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our team of exceptional professionals building the future of AI
              </p>
            </div>
            
            <div ref={jobsRef} className="space-y-8">
              {jobPositions.map((job, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100">
                    <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="flex items-center mb-4 lg:mb-0">
                          <div className="mr-4 text-blue-600">{job.icon}</div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span className="px-2 py-1 bg-blue-600/10 text-blue-600 rounded-full">{job.department}</span>
                              <span className="flex items-center">
                                <HiOutlineLocationMarker className="mr-1" />
                                {job.location}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">{job.type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href={`mailto:hello@thinkact.ai?subject=Application for ${job.title} Position`}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
                        >
                          <HiOutlineMail className="mr-2" />
                          Apply
                        </a>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {job.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-black text-gray-900 mb-6">
                  Why Choose <span className="text-blue-600">ThinkAct AI</span>?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  We believe in creating an environment where exceptional talent can thrive and make a meaningful impact on the world.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-600/5 to-blue-700/5 rounded-xl">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Send your resume and a brief cover letter telling us why you're excited about joining ThinkAct AI.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <HiOutlineMail className="mr-3 text-xl" />
                    <span>hello@thinkact.ai</span>
                  </div>
                  <a 
                    href="mailto:hello@thinkact.ai"
                    className="inline-block w-full px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 text-center"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-black mb-6">Join the AI Revolution</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Be part of a team that's not just building software, but shaping the future of human-AI collaboration
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@thinkact.ai"
                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <HiOutlineMail className="mr-2" />
                Apply Today
              </a>
              <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
