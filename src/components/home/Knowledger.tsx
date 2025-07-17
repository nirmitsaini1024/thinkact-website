'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Database,
  TrendingUp,
  Network,
  Bell,
  Zap,
  Eye,
  ArrowRight,
  Play,
  CheckCheck,
} from 'lucide-react';

const Knowledger: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewRef = useRef<HTMLVideoElement | null>(null);

  const howItWorksVideo = '/videos/knowledger.mp4';

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const handleLoadedData = () => {
      preview.currentTime = 0;
      preview.play().catch((e) => console.log('Preview autoplay failed:', e));
    };

    const handleTimeUpdate = () => {
      if (preview.currentTime >= 3) {
        preview.currentTime = 0;
      }
    };

    preview.addEventListener('loadeddata', handleLoadedData);
    preview.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      preview.removeEventListener('loadeddata', handleLoadedData);
      preview.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const startMainVideo = () => {
    const video = videoRef.current;
    const preview = previewRef.current;
    if (!video) return;

    video.currentTime = 0;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        preview?.pause();
      })
      .catch((e) => console.log('Video play error:', e));
  };

  const thinkActFeatures = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Unified Oversight',
      description: 'Single interconnected network across all data sources',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Proactive Data Quality Control',
      description:
        'Continuous scanning for outdated or conflicting information',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Automated Alerts & Corrections',
      description:
        'Instant notifications with suggested fixes for data integrity',
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Comprehensive Data Mapping',
      description: 'Uncover hidden patterns and dependencies across systems',
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Eliminate Data Silos',
      description:
        'Ensure every team works from the same up-to-date information',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Accelerate Decision-Making',
      description: 'AI-driven insights for faster market response',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Calculate and Reduce Risk',
      description: 'Proactively detect and resolve inconsistencies',
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Enhanced Efficiency',
      description: 'Streamline and oversee all company projects',
    },
  ];

  return (
    <div className="bg-white">
      <section
        id="ledgeriq"
        className="relative py-24 px-4 bg-gray-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Video */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  {/* Preview Video */}
                  <video
                    ref={previewRef}
                    src={howItWorksVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-0' : 'opacity-100'
                    }`}
                    muted
                    playsInline
                    autoPlay
                  />

                  {/* Main Video */}
                  <video
                    ref={videoRef}
                    src={howItWorksVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                    controls={isPlaying}
                    playsInline
                    onEnded={() => {
                      setIsPlaying(false);
                      previewRef.current?.play().catch(() => {});
                    }}
                  />

                  {/* Overlay */}
                  {!isPlaying && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center cursor-pointer group hover:bg-opacity-20 transition-all duration-300"
                      onClick={startMainVideo}
                    >
                      <div className="text-center text-white drop-shadow-md">
                        <Play className="w-16 h-16 mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-base font-medium">Click to play</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-gray-300 text-sm">
                      Comprehensive data management
                    </span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-500" />
                    <span className="text-gray-300 text-sm">
                      Live data synchronization
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating dots */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gray-500 rounded-full opacity-20 animate-pulse delay-1000" />
            </div>

            {/* Right - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full text-blue-300 text-sm font-medium">
                <Database className="w-4 h-4 mr-2" />
                Knowledge Management Platform
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Know<span className="text-blue-400">Ledger</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                Never miss a beat—let AI keep your knowledge current and
                consistent, everywhere your data lives. Proactive monitoring and
                synchronization across all connected sources.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <Network className="w-5 h-5" />
                  <span className="font-semibold text-sm">
                    Unified data network
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <Bell className="w-5 h-5" />
                  <span className="font-semibold text-sm">
                    Real-time alerts
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-rose-400">
                  <CheckCheck className="w-5 h-5" />
                  <span className="font-semibold text-sm">
                    Proactive data quality control
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={startMainVideo}
                  className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>View Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why organizations choose Think
              <span className="text-blue-600">Act</span> Know
              <span className="text-blue-600">Ledger</span>
            </h2>
            <p className="text-base lg:text-lg text-gray-600">
              Comprehensive data management that scales with business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {thinkActFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Business Impact
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Knowledger;
