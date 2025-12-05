"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Shield,
  MessageSquare,
  FileCheck,
  Lock,
  TrendingUp,
  Brain,
  CheckCircle2,
  Users,
  Star,
  BookOpen,
  Eye,
  Calculator,
  FolderOpen,
  Upload,
  Play,
  Zap,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa"

export default function TAMIPage() {
  const [processorCarouselIndex, setProcessorCarouselIndex] = useState<number>(0) // Carousel index for Processor section
  const [posCarouselIndex, setPosCarouselIndex] = useState<number>(0) // Carousel index for POS section
  const [isPosCarouselHovered, setIsPosCarouselHovered] = useState<boolean>(false) // Track hover state for POS carousel
  const [isProcessorCarouselHovered, setIsProcessorCarouselHovered] = useState<boolean>(false) // Track hover state for Processor carousel
  const [isPosCarouselTouched, setIsPosCarouselTouched] = useState<boolean>(false) // Track touch interaction for POS carousel (mobile)
  const [isProcessorCarouselTouched, setIsProcessorCarouselTouched] = useState<boolean>(false) // Track touch interaction for Processor carousel (mobile)
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false)
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const scrollPositionRef = useRef<number>(0)
  const setWidthRef = useRef<number>(0)
  const posCarouselTouchStart = useRef<number | null>(null)
  const posCarouselTouchEnd = useRef<number | null>(null)
  const posCarouselMouseStart = useRef<number | null>(null)
  const posCarouselMouseEnd = useRef<number | null>(null)
  const processorCarouselTouchStart = useRef<number | null>(null)
  const processorCarouselTouchEnd = useRef<number | null>(null)
  const processorCarouselMouseStart = useRef<number | null>(null)
  const processorCarouselMouseEnd = useRef<number | null>(null)
  const posCarouselResumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null) // Timeout to resume auto-scroll after touch
  const processorCarouselResumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null) // Timeout to resume auto-scroll after touch

  // Auto-scroll animation with seamless loop
  useEffect(() => {
    const calculateSetWidth = () => {
      if (marqueeRef.current) {
        const firstSet = marqueeRef.current.querySelector('[data-set="1"]') as HTMLElement
        if (firstSet) {
          const width = firstSet.offsetWidth || firstSet.scrollWidth
          if (width > 0) {
            setWidthRef.current = width
          }
        }
      }
    }

    // Calculate width - try multiple times to ensure DOM is ready
    const tryCalculate = () => {
      calculateSetWidth()
      if (setWidthRef.current === 0) {
        // Try again after a short delay if width is still 0
        setTimeout(calculateSetWidth, 50)
      }
    }
    
    // Initial calculation
    const timeoutId1 = setTimeout(tryCalculate, 100)
    const timeoutId2 = setTimeout(tryCalculate, 300)
    window.addEventListener('resize', calculateSetWidth)

    const animate = () => {
      if (marqueeRef.current && !isMarqueePaused) {
        scrollPositionRef.current += 0.5
        
        // Reset to 0 when we've scrolled one full set width for seamless loop
        if (setWidthRef.current > 0 && scrollPositionRef.current >= setWidthRef.current) {
          scrollPositionRef.current = 0
        }
        
        marqueeRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      window.removeEventListener('resize', calculateSetWidth)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMarqueePaused])

  // Autoplay for POS Carousel - advances every 5 seconds (pauses on hover or touch)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pause auto-scroll if hovered (desktop) or touched (mobile)
      if (!isPosCarouselHovered && !isPosCarouselTouched) {
        setPosCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPosCarouselHovered, isPosCarouselTouched])

  // Autoplay for Processor Carousel - advances every 5 seconds (pauses on hover or touch)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pause auto-scroll if hovered (desktop) or touched (mobile)
      if (!isProcessorCarouselHovered && !isProcessorCarouselTouched) {
        setProcessorCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isProcessorCarouselHovered, isProcessorCarouselTouched])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (posCarouselResumeTimeout.current) {
        clearTimeout(posCarouselResumeTimeout.current)
      }
      if (processorCarouselResumeTimeout.current) {
        clearTimeout(processorCarouselResumeTimeout.current)
      }
    }
  }, [])

  // Manual scroll handlers
  const handleScrollLeft = () => {
    setIsMarqueePaused(true)
    setActiveButton('left')
    if (marqueeRef.current) {
      scrollPositionRef.current -= 200
      // Handle loop for left scroll - wrap around
      if (scrollPositionRef.current < 0) {
        scrollPositionRef.current = setWidthRef.current > 0 
          ? setWidthRef.current + scrollPositionRef.current 
          : 0
      }
      marqueeRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`
    }
    setTimeout(() => {
      setActiveButton(null)
      setIsMarqueePaused(false)
    }, 500)
  }

  const handleScrollRight = () => {
    setIsMarqueePaused(true)
    setActiveButton('right')
    if (marqueeRef.current) {
      scrollPositionRef.current += 200
      // Handle loop for right scroll
      if (setWidthRef.current > 0 && scrollPositionRef.current >= setWidthRef.current) {
        scrollPositionRef.current = scrollPositionRef.current % setWidthRef.current
      }
      marqueeRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`
    }
    setTimeout(() => {
      setActiveButton(null)
      setIsMarqueePaused(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white mb-0 pb-0">
      <section className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden min-h-screen flex items-center">
        <div 
          className="absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:65px_65px]"
          style={{
            backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)'
          }}
        ></div>
        <div className="container mx-auto px-4 md:px-6 relative flex flex-col justify-center w-full py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center w-full">
            <div className="max-w-2xl relative ml-4 md:ml-8">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1 text-sm sm:text-base w-fit absolute top-0 mt-4 sm:mt-0">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Mortgage Intelligence Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight pt-16 sm:pt-8">
                <span className="block">
                  <span className="text-black">TAMI</span>
                  <span className="text-blue-600"> B2P </span>
                  <span className="text-black">Hub</span>
                </span>
                <span className="block mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  The <span id="btp-width" className="inline-block">Borrower-to-Processor</span> Platform
                </span>
              </h1>

              <div className="mt-2">
                <div className="inline-block">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold opacity-0 pointer-events-none select-none inline-block" aria-hidden="true" style={{ fontFamily: 'inherit', letterSpacing: 'inherit' }}>The </span>
                  <span className="inline-block relative" style={{ width: 'fit-content' }}>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold opacity-0 pointer-events-none select-none inline-block whitespace-nowrap" aria-hidden="true" style={{ fontFamily: 'inherit', letterSpacing: 'inherit' }}>Borrower-to-Processor</span>
                    <p id="btp-sub" className="absolute top-0 left-0 text-base sm:text-lg md:text-xl text-black leading-relaxed font-semibold whitespace-nowrap" style={{ lineHeight: '1.5rem' }}>
                      A Unified POS + LP Experience.
                    </p>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-center -ml-60 ">
                <Link href="/book-a-demo">
                <Button size="lg" className="h-12 px-7 text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                  Book a demo
                </Button>
                </Link>
              </div>

            </div>

            <div className="relative w-full max-w-xl mx-0 lg:ml-8">
              {/* Combined Image and Stats Card */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative overflow-hidden shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 p-5 sm:p-6">
                  {/* Image Section */}
                  <div className="relative group rounded-xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 mb-5">
                    <Image
                      src="/images/Tami4.jpg"
                      alt="TAMI Platform Ecosystem - Borrower to Processor Hub"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                  
                  {/* Stats Section - Individual Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3.5 sm:p-4 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[80px]">
                        <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Upto 3x</div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">Faster Processing</div>
                      </div>
                    </div>
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3.5 sm:p-4 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[80px]">
                        <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
                          Upto 99.9%
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">Accuracy Rate</div>
                      </div>
                    </div>
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3.5 sm:p-4 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[80px]">
                        <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">Upto 60%</div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="b2p-platform" className="hidden relative bg-slate-100 overflow-hidden py-2 md:py-3 min-h-[93vh] md:h-[93vh]">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:65px_65px]"></div>
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-2 md:gap-3 relative">
          <div className="text-center max-w-3xl mx-auto mb-2 md:mb-3">
            <h2 className="text-lg sm:text-xl md:text-xl font-bold tracking-tight">B2P Hub Platform Features</h2>
            <p className="text-xs text-slate-600 mt-0.5">Comprehensive AI-powered tools for seamless mortgage processing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-4 w-full items-stretch">
            {/* 1. Intelligent Document Review */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <FileText className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Intelligent Document Review</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Manual review leads to errors and late discovery of missing docs.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Auto-verification, extraction & classification</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Risk/highlight insights</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Zero manual entry</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Borrower Transparency */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Eye className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Borrower Transparency</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Borrowers want clarity, not guesswork.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Dynamic eligibility as docs upload</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Real-time status updates</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Instant alerts for required actions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Communication Hub */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <MessageSquare className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Communication Hub</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Scattered communication slows decisions.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">In-file secure messaging</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">AI email agent for follow-ups and doc requests</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Central notes dashboard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Business Income Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Calculator className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Business Income Analysis</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Manual calculations slow everything down.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Automated income analysis for all entity types</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Year-by-year cash-flow breakdown</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Bank statement analytics & Fannie Mae compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* TAMI Wheel Image - Center of Row 2 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex items-center justify-center h-full">
              <Image
                src="/images/Tami3.png"
                alt="TAMI Platform Wheel"
                width={300}
                height={300}
                className="w-full h-auto max-h-[150px] object-contain"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {/* 5. Risk & Compliance */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Shield className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Risk & Compliance</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Late risk detection is costly.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Real-time credit & compliance alerts</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Continuous eligibility checks</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">24/7 monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Security & Privacy */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Lock className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Security & Privacy</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Mortgage data is highly sensitive.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Role-based access</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">End-to-end encryption</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Complete audit trails</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Loan Packaging */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <FolderOpen className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Loan Packaging</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Manual packaging causes errors and multiple revision cycles.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Auto-generated disclosures & loan documents</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Real-time compliance checks</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Pre-underwriting validation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Policy Intelligence */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-3 flex flex-col h-full justify-between">
              <div className="text-center">
                <div className="mb-0.5">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <BookOpen className="w-3 h-3" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Policy Intelligence</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-sm leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-sm">Searching policy manuals wastes time.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-sm">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Instant Fannie Mae policy answers</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Context-aware guidance</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-tight text-sm">Real-time interpretation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAMI POS Section 1 - Heading, Image, and Subheading */}
      <section id="tami-pos" className="relative w-full bg-white py-3 md:py-4 overflow-hidden flex items-center min-h-[93vh] md:h-[93vh]">
        <div className="absolute inset-0 bg-grid-slate-100/60 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.8),transparent)]" />
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full">
            <div className="max-w-2xl relative ml-4 md:ml-8">
              <Badge className="bg-green-100 text-green-700 w-fit px-3 py-1 text-sm mb-4 sm:mb-5">TAMI POS</Badge>
              <div className="space-y-5">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  TAMI-<span className="text-blue-600">POS</span>
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 font-semibold leading-tight">
                  The <span className="text-blue-600">AI POS Agent</span> That Completes Applications For You
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed">
                  Upload your documents — <span className="text-blue-600">TAMI</span> does the rest with <span className="text-blue-600">intelligent automation 
</span>and a built-in guided assistant.
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
              <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                  <Image
                    src="/images/screenshot-202025-11-23-20at-207.png"
                    alt="Borrower and lender completing mortgage application"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAMI-POS in Action Section */}
      <section className="relative bg-slate-100 overflow-hidden py-2 md:py-3 flex items-center min-h-[93vh] md:h-[93vh] mt-4 md:mt-6">
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="text-center mb-2 md:mb-3 w-full mt-1 md:mt-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-1 md:mb-1.5">TAMI-<span className="text-blue-600">POS in Action</span></h2>
          </div>

          {/* POS Active Tab Heading */}
          <div className="w-full mb-4 md:mb-5">
            <div className="text-center">
              <div 
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-xl shadow-lg"
                onMouseEnter={() => setIsPosCarouselHovered(true)}
                onMouseLeave={() => setIsPosCarouselHovered(false)}
              >
                {posCarouselIndex === 0 && (
                  <>
                    <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <h3 className="text-xs md:text-sm font-semibold">Smart Assistant</h3>
                  </>
                )}
                {posCarouselIndex === 1 && (
                  <>
                    <FileCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <h3 className="text-xs md:text-sm font-semibold">Auto-Classification</h3>
                  </>
                )}
                {posCarouselIndex === 2 && (
                  <>
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <h3 className="text-xs md:text-sm font-semibold">Real-Time Loan Visibility</h3>
                  </>
                )}
              </div>
            </div>
            </div>

          {/* POS Carousel */}
          <div className="w-full mb-2 md:mb-3 relative">
            <Card className="border-2 shadow-2xl overflow-hidden rounded-2xl relative">
              <CardContent className="p-0">
                {/* Carousel Container */}
                <div 
                  className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                  onTouchStart={(e) => {
                    posCarouselTouchStart.current = e.touches[0].clientX
                    // Pause auto-scroll on touch
                    setIsPosCarouselTouched(true)
                    // Clear any existing resume timeout
                    if (posCarouselResumeTimeout.current) {
                      clearTimeout(posCarouselResumeTimeout.current)
                      posCarouselResumeTimeout.current = null
                    }
                  }}
                  onTouchMove={(e) => {
                    posCarouselTouchEnd.current = e.touches[0].clientX
                  }}
                  onTouchEnd={() => {
                    if (!posCarouselTouchStart.current || !posCarouselTouchEnd.current) {
                      // Even if no swipe detected, still handle resume timeout
                      posCarouselTouchStart.current = null
                      posCarouselTouchEnd.current = null
                      // Resume auto-scroll after 4 seconds of inactivity
                      if (posCarouselResumeTimeout.current) {
                        clearTimeout(posCarouselResumeTimeout.current)
                      }
                      posCarouselResumeTimeout.current = setTimeout(() => {
                        setIsPosCarouselTouched(false)
                        posCarouselResumeTimeout.current = null
                      }, 4000)
                      return
                    }
                    const distance = posCarouselTouchStart.current - posCarouselTouchEnd.current
                    const minSwipeDistance = 50

                    if (distance > minSwipeDistance) {
                      // Swipe left - next slide
                      setPosCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
                    } else if (distance < -minSwipeDistance) {
                      // Swipe right - previous slide
                      setPosCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))
                    }

                    posCarouselTouchStart.current = null
                    posCarouselTouchEnd.current = null
                    
                    // Resume auto-scroll after 4 seconds of inactivity
                    if (posCarouselResumeTimeout.current) {
                      clearTimeout(posCarouselResumeTimeout.current)
                    }
                    posCarouselResumeTimeout.current = setTimeout(() => {
                      setIsPosCarouselTouched(false)
                      posCarouselResumeTimeout.current = null
                    }, 4000)
                  }}
                  onMouseDown={(e) => {
                    posCarouselMouseStart.current = e.clientX
                    e.preventDefault()
                  }}
                  onMouseMove={(e) => {
                    if (posCarouselMouseStart.current !== null) {
                      posCarouselMouseEnd.current = e.clientX
                    }
                  }}
                  onMouseUp={() => {
                    if (!posCarouselMouseStart.current || !posCarouselMouseEnd.current) {
                      posCarouselMouseStart.current = null
                      posCarouselMouseEnd.current = null
                      return
                    }
                    const distance = posCarouselMouseStart.current - posCarouselMouseEnd.current
                    const minSwipeDistance = 50

                    if (distance > minSwipeDistance) {
                      // Swipe left - next slide
                      setPosCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
                    } else if (distance < -minSwipeDistance) {
                      // Swipe right - previous slide
                      setPosCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))
                    }

                    posCarouselMouseStart.current = null
                    posCarouselMouseEnd.current = null
                  }}
                  onMouseEnter={() => {
                    setIsPosCarouselHovered(true)
                  }}
                  onMouseLeave={() => {
                    // Reset on mouse leave to prevent stuck states
                    posCarouselMouseStart.current = null
                    posCarouselMouseEnd.current = null
                    setIsPosCarouselHovered(false)
                  }}
                >
                  {/* Carousel Slides */}
                  <div 
                    className="flex transition-transform duration-[400ms] ease-out"
                    style={{ transform: `translateX(-${posCarouselIndex * 100}%)` }}
                  >
                    {/* Slide 1: Smart Upload */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-2 md:gap-3 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                          <div className="space-y-0.5 md:space-y-1">
                        <div>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 text-sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Secure Document Upload
                          </Badge>
                              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5">Upload Any Document Format</h3>
                              <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-0.5 md:mb-1">
                            Borrowers can securely upload PDFs, images, Word docs, and more. TAMI handles all formats with
                            enterprise-grade security.
                          </p>
                        </div>
                            <div className="space-y-0.5">
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Multi-Format Support</p>
                            <p className="text-sm text-muted-foreground">
                              PDF, JPG, PNG, DOCX, HEIC - all processed instantly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Drag & Drop Interface</p>
                            <p className="text-sm text-muted-foreground">Intuitive upload experience on any device</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Bank-Level Security</p>
                            <p className="text-sm text-muted-foreground">End-to-end encryption for all documents</p>
                          </div>
                        </div>
                      </div>
                            <div className="flex gap-1.5 md:gap-2 pt-0.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm">
                            Secure
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm">
                            Any Format
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <Image
                            src="/images/screenshot-202025-11-23-20at-207.png"
                            alt="Document Upload Interface"
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>

                    {/* Slide 2: Auto-Classification */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-2 md:gap-3 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                          <div className="space-y-0.5 md:space-y-1">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 text-sm">
                            <FileCheck className="w-3 h-3 mr-1" />
                            Intelligent Auto-Classification
                          </Badge>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5">AI Identifies Every Document Type</h3>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-0.5 md:mb-1">
                            TAMI automatically identifies W-2s, 1040s, 1065s, paystubs, bank statements, and more with
                            99.9% accuracy using OCR and IDP.
                          </p>
                        </div>
                            <div className="space-y-0.5">
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Smart Recognition</p>
                            <p className="text-sm text-muted-foreground">
                              W-2, 1040, 1065, paystubs, bank statements auto-tagged
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">OCR Data Extraction</p>
                            <p className="text-sm text-muted-foreground">
                              Key data pulled automatically from every document
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Zero Manual Sorting</p>
                            <p className="text-sm text-muted-foreground">Documents organized instantly upon upload</p>
                          </div>
                        </div>
                        </div>
                            <div className="flex gap-1.5 md:gap-2 pt-0.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm">
                            99.9% accurate
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm">
                            Instant
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 aspect-video">
                          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <Play className="w-12 h-12 text-white opacity-90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="relative z-10 text-slate-700 font-semibold text-center">
                              [Auto-Classification Video Demo]
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>

                    {/* Slide 3: Real-Time Tracking */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-2 md:gap-3 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                          <div className="space-y-0.5 md:space-y-1">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 text-sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Real-Time Status Tracking
                          </Badge>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5">Complete Visibility & Seamless Communication — For Everyone</h3>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-0.5 md:mb-1">
                          Borrowers, loan officers, and processors get a single, real-time view of the loan file with smart checklists, progress tracking, expiration alerts, and unified messaging—all in one dashboard.
                          </p>
                        </div>
                            <div className="space-y-0.5">
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Live Progress Bar</p>
                            <p className="text-sm text-muted-foreground">
                              Borrowers see exactly where they are in the process.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Missing Document Tracker</p>
                            <p className="text-sm text-muted-foreground">Profile-based smart checklist that updates automatically as documents are submitted.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Expiration/Past Due Alerts</p>
                            <p className="text-sm text-muted-foreground">
                            Automatic notifications before documents expire, so nothing holds up the file.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5 md:gap-2">
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Unified Messaging & Automated Follow-Ups</p>
                            <p className="text-sm text-muted-foreground">
                            Every conversation and update are stored in a single unified communication hub and intelligent follow-ups.
                            </p>
                          </div>
                        </div>
                        </div>
                            <div className="flex gap-1.5 md:gap-2 pt-0.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm">
                            100% visibility
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm">
                            Proactive
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 aspect-video">
                          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <Play className="w-12 h-12 text-white opacity-90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="relative z-10 text-slate-700 font-semibold text-center">
                              [Real-Time Tracking Video Demo]
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows - Positioned outside Card to avoid covering content */}
            <button
              onClick={() => setPosCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))}
              className="absolute left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-sm shadow-lg border border-slate-200/5 hover:bg-white/60 hover:opacity-100 hover:shadow-xl transition-all flex items-center justify-center text-slate-700 hover:text-blue-600"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setPosCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))}
              className="absolute right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-sm shadow-lg border border-slate-200/5 hover:bg-white/60 hover:opacity-100 hover:shadow-xl transition-all flex items-center justify-center text-slate-700 hover:text-blue-600"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* TAMI Loan Processor */}
      <section id="tami-loan-processor" className="relative bg-white overflow-hidden py-3 md:py-4 flex items-center min-h-[93vh] md:h-[93vh]">
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center w-full">
            <div className="max-w-2xl relative ml-4 md:ml-8">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 w-fit text-sm sm:text-base mb-2 md:mb-3">
                <Brain className="w-4 h-4 mr-2" />
                AI Loan Processing Platform
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 whitespace-nowrap">
                TAMI <span className="text-blue-600">Loan Processor</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mt-3 md:mt-4">
              Intelligent document processing that transforms every file into fast, accurate decisions — delivering AI-driven loan processing with full GSE compliance, unmatched cost efficiency, and turn times in days, not weeks.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 mt-4">
                <Button size="lg" className="h-11 px-6 text-sm bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 ml-50 ">
                  Start Your AI Journey
                </Button>
              </div>
            </div>

            <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
              {/* Combined Image and Stats Card */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative overflow-hidden shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 p-3 sm:p-4">
                  {/* Image Section */}
                  <div className="relative group rounded-xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 mb-3">
                    <Image
                      src="/images/e.png"
                      alt="TAMI AI Loan Processor Platform Interface"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                  
                  {/* Stats Section - Individual Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-2.5 sm:p-3 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[70px]">
                        <div className="text-lg md:text-xl font-bold text-slate-900 mb-0.5">Upto 3x</div>
                        <div className="text-xs text-slate-600 font-medium">Faster Processing</div>
                      </div>
                    </div>
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-2.5 sm:p-3 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[70px]">
                        <div className="text-lg md:text-xl font-bold text-blue-600 mb-0.5 whitespace-nowrap">
                          Upto 99.9%
                        </div>
                        <div className="text-xs text-slate-600 font-medium">Accuracy Rate</div>
                      </div>
                    </div>
                    <div className="relative flex">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-2.5 sm:p-3 text-center hover:shadow-lg transition-shadow w-full flex flex-col justify-center items-center min-h-[70px]">
                        <div className="text-lg md:text-xl font-bold text-green-600 mb-0.5">Upto 60%</div>
                        <div className="text-xs text-slate-600 font-medium">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See TAMI In Action */}
      <section className="relative bg-slate-100 overflow-hidden py-1 md:py-2 min-h-[93vh] md:h-[93vh] flex items-center mt-4 md:mt-6">
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="text-center mb-1 md:mb-2 w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-0.5">See TAMI-<span className="text-blue-600">Processor In Action</span></h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Experience real-time intelligent automation across every mortgage workflow
            </p>
          </div>

          {/* Processor Active Tab Heading */}
          <div className="w-full mb-1 md:mb-2">
            <div className="text-center">
              <div 
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 text-white rounded-xl shadow-lg"
                onMouseEnter={() => setIsProcessorCarouselHovered(true)}
                onMouseLeave={() => setIsProcessorCarouselHovered(false)}
              >
                {processorCarouselIndex === 0 && (
                  <>
                    <FileCheck className="w-4 h-4 md:w-5 md:h-5" />
                    <h3 className="text-sm md:text-base font-semibold">Document Processing</h3>
                  </>
                )}
                {processorCarouselIndex === 1 && (
                  <>
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                    <h3 className="text-sm md:text-base font-semibold">Smart Analysis</h3>
                  </>
                )}
                {processorCarouselIndex === 2 && (
                  <>
                    <Shield className="w-4 h-4 md:w-5 md:h-5" />
                    <h3 className="text-sm md:text-base font-semibold">Live Dashboard</h3>
                  </>
                )}
              </div>
            </div>
            </div>

          {/* Processor Carousel */}
          <div className="w-full mb-1 md:mb-2 relative">
            <Card className="border-2 shadow-2xl overflow-hidden rounded-2xl relative">
              <CardContent className="p-0">
                {/* Carousel Container */}
                <div 
                  className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                  onTouchStart={(e) => {
                    processorCarouselTouchStart.current = e.touches[0].clientX
                    // Pause auto-scroll on touch
                    setIsProcessorCarouselTouched(true)
                    // Clear any existing resume timeout
                    if (processorCarouselResumeTimeout.current) {
                      clearTimeout(processorCarouselResumeTimeout.current)
                      processorCarouselResumeTimeout.current = null
                    }
                  }}
                  onTouchMove={(e) => {
                    processorCarouselTouchEnd.current = e.touches[0].clientX
                  }}
                  onTouchEnd={() => {
                    if (!processorCarouselTouchStart.current || !processorCarouselTouchEnd.current) {
                      // Even if no swipe detected, still handle resume timeout
                      processorCarouselTouchStart.current = null
                      processorCarouselTouchEnd.current = null
                      // Resume auto-scroll after 4 seconds of inactivity
                      if (processorCarouselResumeTimeout.current) {
                        clearTimeout(processorCarouselResumeTimeout.current)
                      }
                      processorCarouselResumeTimeout.current = setTimeout(() => {
                        setIsProcessorCarouselTouched(false)
                        processorCarouselResumeTimeout.current = null
                      }, 4000)
                      return
                    }
                    const distance = processorCarouselTouchStart.current - processorCarouselTouchEnd.current
                    const minSwipeDistance = 50

                    if (distance > minSwipeDistance) {
                      // Swipe left - next slide
                      setProcessorCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
                    } else if (distance < -minSwipeDistance) {
                      // Swipe right - previous slide
                      setProcessorCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))
                    }

                    processorCarouselTouchStart.current = null
                    processorCarouselTouchEnd.current = null
                    
                    // Resume auto-scroll after 4 seconds of inactivity
                    if (processorCarouselResumeTimeout.current) {
                      clearTimeout(processorCarouselResumeTimeout.current)
                    }
                    processorCarouselResumeTimeout.current = setTimeout(() => {
                      setIsProcessorCarouselTouched(false)
                      processorCarouselResumeTimeout.current = null
                    }, 4000)
                  }}
                  onMouseDown={(e) => {
                    processorCarouselMouseStart.current = e.clientX
                    e.preventDefault()
                  }}
                  onMouseMove={(e) => {
                    if (processorCarouselMouseStart.current !== null) {
                      processorCarouselMouseEnd.current = e.clientX
                    }
                  }}
                  onMouseUp={() => {
                    if (!processorCarouselMouseStart.current || !processorCarouselMouseEnd.current) {
                      processorCarouselMouseStart.current = null
                      processorCarouselMouseEnd.current = null
                      return
                    }
                    const distance = processorCarouselMouseStart.current - processorCarouselMouseEnd.current
                    const minSwipeDistance = 50

                    if (distance > minSwipeDistance) {
                      // Swipe left - next slide
                      setProcessorCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))
                    } else if (distance < -minSwipeDistance) {
                      // Swipe right - previous slide
                      setProcessorCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))
                    }

                    processorCarouselMouseStart.current = null
                    processorCarouselMouseEnd.current = null
                  }}
                  onMouseEnter={() => {
                    setIsProcessorCarouselHovered(true)
                  }}
                  onMouseLeave={() => {
                    // Reset on mouse leave to prevent stuck states
                    processorCarouselMouseStart.current = null
                    processorCarouselMouseEnd.current = null
                    setIsProcessorCarouselHovered(false)
                  }}
                >
                  {/* Carousel Slides */}
                  <div 
                    className="flex transition-transform duration-[400ms] ease-out"
                    style={{ transform: `translateX(-${processorCarouselIndex * 100}%)` }}
                  >
                    {/* Slide 1: Document Processing */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 md:gap-6 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                      <div className="space-y-1.5 md:space-y-2">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 md:mb-1 text-xs">
                            <FileCheck className="w-3 h-3 mr-1.5" />
                            Intelligent Document Processing
                          </Badge>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5 md:mb-1">Automate Document Review</h3>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-1 md:mb-1.5">
                            Upload any loan document and watch TAMI instantly extract, verify, and analyze critical
                            information with 99.9% accuracy.
                          </p>
                        </div>
                        <div className="space-y-1 md:space-y-1.5">
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Auto-Classification</p>
                              <p className="text-xs text-muted-foreground">
                                Automatically identifies document types and extracts key data
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Risk Highlighting</p>
                              <p className="text-xs text-muted-foreground">
                                Flags potential compliance issues and missing information
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Zero Manual Entry</p>
                              <p className="text-xs text-muted-foreground">
                                Eliminates data entry errors and saves hours per loan
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 pt-1 md:pt-1.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            75% faster
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            Error-free
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <Image
                            src="/document-processing-dashboard-with-ai-analysis.jpg"
                            alt="Document Processing Interface"
                            width={1200}
                            height={600}
                            className="w-full h-auto max-h-[320px] md:max-h-[380px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>

                    {/* Slide 2: Smart Analysis */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 md:gap-6 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                      <div className="space-y-1.5 md:space-y-2">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 md:mb-1 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1.5" />
                            AI-Powered Income Analysis
                          </Badge>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5 md:mb-1">Business Income Intelligence</h3>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-1 md:mb-1.5">
                            Automated cash flow analysis for all entity types with real-time Fannie Mae compliance
                            calculations.
                          </p>
                        </div>
                        <div className="space-y-1 md:space-y-1.5">
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Multi-Entity Support</p>
                              <p className="text-xs text-muted-foreground">
                                C-Corp, S-Corp, LLC, Sole Prop, Partnership—all automated
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Cash Flow Breakdown</p>
                              <p className="text-xs text-muted-foreground">
                                Year-by-year analysis with anomaly detection
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Fannie Mae Compliant</p>
                              <p className="text-xs text-muted-foreground">
                                Real-time guideline compliance with instant calculations
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 pt-1 md:pt-1.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            10x faster
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            99.9% accurate
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <Image
                            src="/financial-analysis-dashboard.png"
                            alt="Income Analysis Interface"
                            width={1200}
                            height={600}
                            className="w-full h-auto max-h-[320px] md:max-h-[380px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>

                    {/* Slide 3: Live Dashboard */}
                    <div className="w-full flex-shrink-0">
                      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 md:gap-6 items-start w-full p-2 md:p-3">
                        <div className="max-w-2xl relative w-full order-2 lg:order-1 ml-4 md:ml-8">
                      <div className="space-y-1.5 md:space-y-2">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-0.5 md:mb-1 text-xs">
                            <Shield className="w-3 h-3 mr-1.5" />
                            Real-Time Risk Monitoring
                          </Badge>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-0.5 md:mb-1">Live Compliance Dashboard</h3>
                          <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-1 md:mb-1.5">
                            Monitor all loans in real-time with instant alerts for compliance issues, credit risks, and
                            required actions.
                          </p>
                        </div>
                        <div className="space-y-1 md:space-y-1.5">
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">24/7 Monitoring</p>
                              <p className="text-xs text-muted-foreground">
                                Continuous risk assessment across your entire pipeline
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Instant Alerts</p>
                              <p className="text-xs text-muted-foreground">
                                Proactive notifications for compliance and credit concerns
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground text-xs md:text-sm">Dynamic Eligibility</p>
                              <p className="text-xs text-muted-foreground">
                                Real-time qualification status as documents are uploaded
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 pt-1 md:pt-1.5">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            Proactive
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            100% compliant
                          </Badge>
                        </div>
                      </div>
                    </div>
                        <div className="relative w-full max-w-[680px] mx-0 lg:ml-8 order-1 lg:order-2">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-1.5 sm:p-2">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <Image
                            src="/compliance-dashboard-with-risk-monitoring-and-aler.jpg"
                            alt="Live Dashboard Interface"
                            width={1200}
                            height={600}
                            className="w-full h-auto max-h-[320px] md:max-h-[380px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows - Positioned outside Card to avoid covering content */}
            <button
              onClick={() => setProcessorCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))}
              className="absolute left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-sm shadow-lg border border-slate-200/5 hover:bg-white/60 hover:opacity-100 hover:shadow-xl transition-all flex items-center justify-center text-slate-700 hover:text-blue-600"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => setProcessorCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))}
              className="absolute right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-sm shadow-lg border border-slate-200/5 hover:bg-white/60 hover:opacity-100 hover:shadow-xl transition-all flex items-center justify-center text-slate-700 hover:text-blue-600"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Integrations and Built For Sections - Combined on one screen */}
      <section className="relative min-h-[93vh] md:h-[93vh] flex flex-col overflow-hidden">
        {/* Integrations Section */}
        <div className="flex-[0_0_30%] bg-white flex items-center min-h-0 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 md:py-6">
            <div className="mb-3 md:mb-4">
              <div className="mb-2 md:mb-3 flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Integrations
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleScrollLeft}
                    className={`h-10 w-10 rounded-full border-slate-300 hover:bg-slate-100 transition-colors ${
                      activeButton === 'left' ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700' : ''
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleScrollRight}
                    className={`h-10 w-10 rounded-full border-slate-300 hover:bg-slate-100 transition-colors ${
                      activeButton === 'right' ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700' : ''
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="relative overflow-hidden py-2 md:py-3">
                {/* Left blur gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                {/* Right blur gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex overflow-hidden relative z-0">
                  <div 
                    ref={marqueeRef}
                    className="flex items-center"
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    {/* Duplicate sets for seamless infinite loop - flat structure with proper spacing */}
                    {[...Array(2)].map((_, setIndex) => (
                      <div 
                        key={`set-${setIndex}`} 
                        data-set={setIndex === 0 ? "1" : undefined} 
                        className="flex"
                      >
                        {[...Array(8)].map((_, i) => (
                          <div 
                            key={`${setIndex}-${i}`} 
                            className="flex items-center justify-center h-16 md:h-20"
                            style={{ 
                              width: '250px',
                              minWidth: '250px',
                              paddingLeft: '2rem', 
                              paddingRight: '2rem',
                              boxSizing: 'border-box',
                              flexShrink: 0
                            }}
                          >
                            <Image
                              src="/images/meridian-link.svg"
                              alt="MeridianLink"
                              width={200}
                              height={56}
                              className="h-10 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                              style={{ display: 'block', width: 'auto', height: 'auto' }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Built For Forward Thinking Lending institutions Section */}
        <div className="flex-[0_0_70%] bg-slate-100 flex items-center min-h-0 overflow-hidden pb-8 md:pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 md:py-6">
            <div className="text-center mb-4 md:mb-6 max-w-5xl mx-auto px-4 sm:px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3 leading-tight break-words md:whitespace-nowrap">
                Built For <span className="text-blue-700">Forward Thinking </span><span className="text-black">Lending institutions</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Empowering Mortgage Brokers, Credit Unions, Local Banks, and Underwriters to transform loan processing
                with AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
              <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Mortgage Brokers</h3>
                  <p className="text-xs md:text-sm text-slate-600">Close deals faster with automated processing and instant updates.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Credit Unions</h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    Enhance member experience with real-time tracking and personalized service.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Local Banks</h3>
                  <p className="text-xs md:text-sm text-slate-600">Compete with enterprise-grade AI while keeping your personal touch.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Underwriters</h3>
                  <p className="text-xs md:text-sm text-slate-600">Make faster decisions with AI-powered risk assessment and compliance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col overflow-hidden mt-0 md:mt-0">
        {/* Trusted by Industry Experts - Top Half */}
        <div className="flex-auto flex bg-white text-slate-900 overflow-hidden py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6 w-full py-2">
            <div className="text-center mb-2 max-w-3xl mx-auto">
              <Badge className="bg-blue-50 text-blue-700 border-blue-100 mb-1 px-2 py-0.5 text-xs">Customer Success</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-0.5">Trusted by Industry Experts</h2>
              <p className="text-xs md:text-sm text-slate-600">
                Social proof from lending innovators who scaled faster with TAMI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-2 md:gap-3 max-w-6xl mx-auto">
              <Card className="bg-white border border-slate-100 shadow-xl rounded-xl">
                <CardContent className="p-2 md:p-3">
                  <div className="flex gap-0.5 mb-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-200 to-cyan-300 mx-auto mb-1"></div>
                  <div className="h-0.5 w-12 md:w-16 bg-blue-100 mx-auto rounded-full" />
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-100 shadow-xl rounded-xl">
                <CardContent className="p-2 md:p-3">
                  <div className="flex gap-0.5 mb-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-green-200 to-emerald-300 mx-auto mb-1"></div>
                  <div className="h-0.5 w-12 md:w-16 bg-green-100 mx-auto rounded-full" />
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-100 shadow-xl rounded-xl">
                <CardContent className="p-2 md:p-3">
                  <div className="flex gap-0.5 mb-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mx-auto mb-1"></div>
                  <div className="h-0.5 w-12 md:w-16 bg-purple-100 mx-auto rounded-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Move from Manual Work to Intelligent Automation - Bottom Half */}
        <div className="flex-[0_0_30%] flex items-center bg-gradient-to-br from-blue-600 to-cyan-600 text-white overflow-hidden py-2 md:py-4">
          <div className="container mx-auto px-4 md:px-6 text-center w-full py-2">
            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
                Move from Manual Work to Intelligent Automation
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-blue-50">
                Give your borrowers a delightful experience — and your team superpowers.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm bg-white text-blue-600 hover:bg-slate-50 shadow-2xl"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white pt-16 pb-0 mb-0">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-6 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-0 mb-4">
                <div className="">
                  <Image
                    src="/thinkact-logo.svg"
                    alt="ThinkAct Logo"
                    height={50}
                    width={50}
                    className="h-14 w-auto"
                  />
                </div>
                <span className="font-semibold text-2xl text-white">
                  Think<span className="text-blue-400">Act</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
              TAMI eliminates mortgage paperwork with Intelligent Document Processing, automates underwriting, and accelerates closing from weeks to days while ensuring GSE compliance.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4 border-l-2 border-blue-400 pl-2">
                Platform
              </h4>
              <ul className="space-y-3 text-slate-400 md:ml-2">
                <li>
                  <Link href="/#tami-pos" className="hover:text-white transition-colors">
                    TAMI-POS
                  </Link>
                </li>
                <li>
                  <Link href="/#tami-loan-processor" className="hover:text-white transition-colors">
                    TAMI-Loan Processor
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4 border-l-2 border-blue-400 pl-2">
                Company
              </h4>
              <ul className="space-y-3 text-slate-400 md:ml-2">
                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4 border-l-2 border-blue-400 pl-2">
                Contact Us
              </h4>
              <ul className="space-y-3 md:ml-2">
                <li className="flex items-center space-x-3">
                  <FaMapMarkerAlt
                    size={18}
                    className="shrink-0 text-slate-400"
                  />
                  <p className="text-slate-400 hover:text-white transition">
                    New Jersey, USA
                  </p>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope size={18} className="shrink-0 text-slate-400" />
                  <a
                    href="mailto:hello@thinkact.ai"
                    className="text-slate-400 hover:text-white transition"
                  >
                    hello@thinkact.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-slate-800 text-slate-300 mt-8 mb-0 pb-0">
          <div className="flex flex-col md:flex-row justify-between items-center container mx-auto px-6 py-4">
            <div className="text-sm">
              © {new Date().getFullYear()} ThinkAct. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm mt-2 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white hover:underline">
                Terms of Services
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
