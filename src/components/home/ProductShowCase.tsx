'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Database,
  TrendingUp,
  Network,
  Bell,
  BarChart3,
  Zap,
  Eye,
  ArrowRight,
  Play,
  Star,
  Clock,
  DollarSign,
  CheckCheck,
  X,
} from 'lucide-react';

const ProductShowcase = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const previewRef1 = useRef(null);
  const previewRef2 = useRef(null);

  // Video URLs - replace with your actual video files
  const productDemoVideo = '/videos/dap.mp4';
  const howItWorksVideo = '/videos/knowledger.mp4';

  useEffect(() => {
    const cleanups = [];

    const setupPreview = (previewRef, startTime = 0, endTime = 3) => {
      const video = previewRef.current;
      if (!video) return;

      const handleLoadedData = () => {
        video.currentTime = startTime;
        video.play().catch((e) => console.log('Preview autoplay failed:', e));
      };

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.currentTime = startTime;
        }
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('timeupdate', handleTimeUpdate);

      // Push cleanup
      cleanups.push(() => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      });
    };

    setupPreview(previewRef1, 0, 3);
    setupPreview(previewRef2, 0, 3);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);


  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideo('');
  };

  const toggleVideo = (videoRef, setIsPlaying, previewRef) => {
    const video = videoRef.current;
    const preview = previewRef.current;

    if (!video) return;

    if (video.paused) {
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          if (preview) preview.pause();
        })
        .catch((e) => console.log('Video play error:', e));
    } else {
      video.pause();
      setIsPlaying(false);
      if (preview) {
        preview.currentTime = 0;
        preview.play().catch((e) => console.log('Preview resume failed:', e));
      }
    }
  };

  const handleDemoClick = (videoUrl, videoRef, setIsPlaying, previewRef) => {
    toggleVideo(videoRef, setIsPlaying, previewRef);
  };

  // VideoModal Component
  const VideoModal = () => {
    if (!isVideoModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          <button
            onClick={closeVideoModal}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              src={currentVideo}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      </div>
    );
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
      {/* Video Modal */}
      <VideoModal />

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
                    onClick={() =>
                      handleDemoClick(
                        productDemoVideo,
                        videoRef1,
                        setIsPlaying1,
                        previewRef1
                      )
                    }
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
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
                {/* Video Container */}
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  {/* Preview Video (looping background) */}
                  <video
                    ref={previewRef1}
                    src={productDemoVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying1 ? 'opacity-0' : 'opacity-100'
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  {/* Main Video */}
                  <video
                    ref={videoRef1}
                    src={productDemoVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying1 ? 'opacity-100' : 'opacity-0'
                    }`}
                    controls={isPlaying1}
                    playsInline
                    onEnded={() => {
                      setIsPlaying1(false);
                      if (previewRef1.current) {
                        previewRef1.current.currentTime = 0;
                        previewRef1.current
                          .play()
                          .catch((e) =>
                            console.log('Preview restart failed:', e)
                          );
                      }
                    }}
                  />

                  {/* Overlay when not playing */}
                  {!isPlaying1 && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center cursor-pointer group hover:bg-opacity-50 transition-all duration-300"
                      onClick={() =>
                        toggleVideo(videoRef1, setIsPlaying1, previewRef1)
                      }
                    >
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-base font-medium">Click to play</p>
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

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* SmartAIDocs Features */}
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

      <section
        id="ledgeriq"
        className="relative py-24 px-4 bg-gray-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                {/* Video Container */}
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  {/* Preview Video (looping background) */}
                  <video
                    ref={previewRef2}
                    src={howItWorksVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying2 ? 'opacity-0' : 'opacity-100'
                    }`}
                    muted
                    loop
                    playsInline
                  />

                  {/* Main Video */}
                  <video
                    ref={videoRef2}
                    src={howItWorksVideo}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                      isPlaying2 ? 'opacity-100' : 'opacity-0'
                    }`}
                    controls={isPlaying2}
                    playsInline
                    onEnded={() => {
                      setIsPlaying2(false);
                      if (previewRef2.current) {
                        previewRef2.current.currentTime = 0;
                        previewRef2.current
                          .play()
                          .catch((e) =>
                            console.log('Preview restart failed:', e)
                          );
                      }
                    }}
                  />

                  {/* Overlay when not playing */}
                  {!isPlaying2 && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center cursor-pointer group hover:bg-opacity-50 transition-all duration-300"
                      onClick={() =>
                        toggleVideo(videoRef2, setIsPlaying2, previewRef2)
                      }
                    >
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-base font-medium">Click to play</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">
                        Comprehensive data management
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                      <span className="text-gray-300 text-sm">
                        Live data synchronization
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating dots */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gray-500 rounded-full opacity-20 animate-pulse delay-1000" />
            </div>

            {/* Right Content */}
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
                  onClick={() =>
                    handleDemoClick(
                      howItWorksVideo,
                      videoRef2,
                      setIsPlaying2,
                      previewRef2
                    )
                  }
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

export default ProductShowcase;
