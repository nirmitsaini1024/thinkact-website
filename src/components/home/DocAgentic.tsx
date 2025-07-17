'use client';
import React, { useState, useRef } from 'react';
import {
  FileText,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  DollarSign,
  Clock,
  ArrowRight,
  Play,
  Star,
} from 'lucide-react';
import Image from 'next/image'; // Make sure you import Image from 'next/image'

const DocAgentic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const productDemoVideo = '/videos/dap.mp4';

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) {
      console.warn('Video element not found. Cannot play/pause.');
      return;
    }

    if (isPlaying) {
      // If currently playing, pause it and reset state
      video.pause();
      setIsPlaying(false);
    } else {
      // If not playing, reset to start and play
      video.currentTime = 0; // Always start from the beginning on play
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          // Log error if video play fails (e.g., due to browser autoplay policies)
          console.error('Video play failed:', e);
          // You might want to provide user feedback here if playing fails
        });
    }
  };

  const smartAIFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'AI-Powered Document Processing',
      description:
        'Automated verification, extraction, and analysis with actionable recommendations',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security & Privacy',
      description: 'Role-based access control with end-to-end encryption',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Level Approval Workflows',
      description:
        'Intelligent routing and collaboration for document approvals',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Dynamic Risk Analysis',
      description: 'Real-time compliance and security risk monitoring',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Digitally Signed Documents',
      description: 'Complete audit trail with annotations and approval history',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Multi-Agent RFI System',
      description: 'Custom questionnaires and comprehensive reporting',
    },
  ];

  return (
    <div className="bg-white">
      <section
        id="dap"
        className="relative py-24 px-4 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  SmartAi Docs
                </div>

                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Document <span className="text-blue-600">Agentic</span>{' '}
                  Platform
                </h1>

                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Revolutionize document processing with intelligent agentic AI
                  automation. Advanced review, search, and proactive compliance
                  risk management.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-semibold text-sm lg:text-base">
                      Reduce costs by 60%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold text-sm lg:text-base">
                      10x faster processing
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={toggleVideo} // This button now correctly triggers the video playback
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    src={productDemoVideo}
                    // Removed poster attribute here, as the GIF is now explicitly handled by the overlay
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0' // Video content visible/invisible
                    }`}
                    controls={isPlaying} // Only show controls when the video is playing
                    playsInline
                    onEnded={() => setIsPlaying(false)} // Reset state when video finishes
                  />

                  {/* Conditional Overlay with GIF background when video is not playing */}
                  {!isPlaying && (
                    <div
                      className="absolute inset-0 cursor-pointer group z-10" // Outer container for GIF + overlay + button
                      onClick={toggleVideo} // Click anywhere on this container to play
                    >
                      {/* GIF image as background */}
                      <Image
                        src="/dap.gif"
                        alt="Product Demo Preview"
                        fill // Use fill to make the image cover its parent
                        className="object-cover" // Ensures the image covers the area without distortion
                      />
                      {/* Semi-transparent black overlay on top of the GIF */}
                      <div className="absolute inset-0 bg-gray-200/30 flex items-center justify-center transition-all duration-300 hover:bg-opacity-30">
                        {/* Play button and text on top of the black overlay */}
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                          <p className="text-base font-medium">Click to play</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-blue-600">99.9%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-green-600">60%</div>
                    <div className="text-sm text-gray-600">Cost Reduction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for document management
            </h2>
            <p className="text-base lg:text-lg text-gray-600">
              Comprehensive features designed for modern enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartAIFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Financial Impact</h3>
            <div className="flex flex-wrap gap-6">
              {[
                'Reduce Labor & Time Costs',
                'Audit & Compliance Efficiency',
                'Enhanced Productivity',
              ].map((item, i) => (
                <div className="flex items-center space-x-3" key={i}>
                  <CheckCircle className="w-5 h-5 text-blue-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocAgentic;
