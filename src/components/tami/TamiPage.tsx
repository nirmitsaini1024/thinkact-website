"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
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
  DollarSign,
  Zap,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export default function TAMIPage() {
  const [selectedDemo, setSelectedDemo] = useState<string>("document")
  const [selectedPOSDemo, setSelectedPOSDemo] = useState<string>("upload") // New state for POS demo
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false)
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const scrollPositionRef = useRef<number>(0)
  const setWidthRef = useRef<number>(0)

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
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden min-h-screen flex items-center">
        <div 
          className="absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:65px_65px]"
          style={{
            backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)'
          }}
        ></div>
        <div className="container mx-auto px-4 md:px-6 relative flex flex-col justify-center w-full py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start w-full">
            <div className="max-w-2xl relative">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-3 py-1 text-sm sm:text-base w-fit absolute top-0">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Mortgage Intelligence Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight pt-10 sm:pt-8">
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
                    <p id="btp-sub" className="absolute top-0 left-0 text-base sm:text-lg md:text-xl text-black leading-relaxed font-semibold whitespace-nowrap" style={{ width: '100%', transform: 'scaleX(1.3)', transformOrigin: 'left top', lineHeight: '1.5rem' }}>
                      A Unified POS + LP Experience.
                    </p>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <Button size="lg" className="h-12 px-7 text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                  Book a demo
                </Button>
              </div>

            </div>

            <div className="relative w-full max-w-xl mx-0 lg:ml-8">
              {/* Combined Image and Stats Card */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative overflow-hidden shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 p-5 sm:p-6">
                  {/* Image Section */}
                  <div className="relative group rounded-xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 mb-5">
                    <img
                      src="/images/Tami4.jpg"
                      alt="TAMI Platform Ecosystem - Borrower to Processor Hub"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                {/* Floating Bubble Animation */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="b2p-platform" className="relative bg-slate-200 py-2 md:py-2 overflow-hidden  flex flex-col justify-center">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:65px_65px]"></div>
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-2 md:gap-2 relative">
          <div className="text-center max-w-3xl mx-auto mb-2 md:mb-3">
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold tracking-tight">B2P Hub Platform Features</h2>
            <p className="text-sm text-slate-600 mt-1">Comprehensive AI-powered tools for seamless mortgage processing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full items-stretch">
            {/* 1. Intelligent Document Review */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <FileText className="w-4 h-4" />
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

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">75% time saved, error-free workflows</p>
              </div>
            </div>

            {/* 2. Borrower Transparency */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Borrower Transparency</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Borrowers want clarity, not guesswork.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Dynamic eligibility as docs upload</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Real-time status updates</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Instant alerts for required actions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">Faster processing, higher satisfaction</p>
              </div>
            </div>

            {/* 3. Communication Hub */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Communication Hub</h3>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Scattered communication slows decisions.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">In-file secure messaging</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">AI email agent for follow-ups and doc requests</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Central notes dashboard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">One unified inbox powered by AI</p>
              </div>
            </div>

            {/* 4. Business Income Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[210px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Business Income Analysis</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Manual calculations slow everything down and introduce errors.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Automated income analysis for all entity types</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Year-by-year cash-flow breakdown</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Bank statement analytics with anomaly detection</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Real-time Fannie Mae–compliant results</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">10x faster, 99.9% accuracy</p>
              </div>
            </div>

            {/* TAMI Wheel Image - Center of Row 2 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex items-center justify-center h-full max-h-[210px] overflow-hidden">
              <img
                src="/images/Tami3.png"
                alt="TAMI Platform Wheel"
                className="w-full h-auto max-h-full object-contain"
              />
            </div>

            {/* 5. Risk & Compliance */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[210px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Risk & Compliance</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Late risk detection is costly.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Real-time credit & compliance alerts</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Continuous eligibility checks</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">24/7 monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">Proactive, 100% compliant lending</p>
              </div>
            </div>

            {/* 6. Security & Privacy */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Security & Privacy</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Mortgage data is highly sensitive.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Role-based access</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">End-to-end encryption</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Complete audit trails</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">Bank-level protection across your entire workflow</p>
              </div>
            </div>

            {/* 7. Loan Packaging */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <FolderOpen className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Loan Packaging</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Manual packaging causes errors and multiple revision cycles.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Auto-generated disclosures & loan documents</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Real-time compliance checks</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Pre-underwriting validation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">Error-free, instant loan packages</p>
              </div>
            </div>

            {/* 8. Policy Intelligence */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 md:p-2.5 flex flex-col h-full justify-between max-h-[180px] overflow-hidden">
              <div className="text-center">
                <div className="mb-1">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-200 text-blue-700 flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 leading-tight">Policy Intelligence</h3>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 text-xs leading-tight">
                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">Why It Matters:</p>
                    <p className="text-gray-600 leading-tight text-xs">Searching policy manuals wastes time.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-blue-700 mb-0.5 text-xs">TAMI Delivers:</p>
                    <ul className="space-y-0.5 text-gray-600">
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Instant Fannie Mae policy answers</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Context-aware guidance</span>
                      </li>
                      <li className="flex items-center justify-center gap-1">
                        <span className="text-blue-600 flex-shrink-0">
                          <Zap className="w-2 h-2" />
                        </span>
                        <span className="leading-tight text-xs">Real-time interpretation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-0.5 mt-1 text-center">
                <p className="font-semibold text-gray-900 mb-0 text-xs">Impact:</p>
                <p className="text-xs font-semibold text-green-600">Instant clarity, always updated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAMI POS Section 1 - Heading, Image, and Subheading */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-slate-50 to-white py-14 md:py-20 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-grid-slate-100/60 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.8),transparent)]" />
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full">
            <div className="max-w-2xl relative">
              <Badge className="bg-green-100 text-green-700 w-fit px-3 py-1 text-sm mb-4 sm:mb-5">TAMI POS</Badge>
              <div className="space-y-5">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  TAMI-<span className="text-blue-600">POS</span>
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 font-semibold leading-tight">
                  The <span className="text-blue-600">AI POS Agent</span> That Completes Applications For You
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed">
                  Upload your documents — <span className="text-blue-600">TAMI</span> does the rest with <span className="text-blue-600">intelligent automation</span>.
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
              <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                  <img
                    src="/images/screenshot-202025-11-23-20at-207.png"
                    alt="Borrower and lender completing mortgage application"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* TAMI-POS in Action Section */}
      <section className="py-12 md:py-16 bg-slate-200">
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="text-center mb-8 w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">TAMI-<span className="text-blue-600">POS in Action</span></h2>
          </div>

          {/* POS Demo Tabs */}
          <div className="w-full mb-6">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 mb-6 p-2 bg-slate-100 rounded-2xl mx-auto overflow-x-auto">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedPOSDemo("upload")}
                className={`text-base h-12 px-6 rounded-xl transition-colors min-w-[170px] shrink-0 ${
                  selectedPOSDemo === "upload"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Upload className="w-5 h-5 mr-2" />
                Smart Upload
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedPOSDemo("classification")}
                className={`text-base h-12 px-6 rounded-xl transition-colors min-w-[170px] shrink-0 ${
                  selectedPOSDemo === "classification"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <FileCheck className="w-5 h-5 mr-2" />
                Auto-Classification
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedPOSDemo("tracking")}
                className={`text-base h-12 px-6 rounded-xl transition-colors min-w-[170px] shrink-0 ${
                  selectedPOSDemo === "tracking"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Eye className="w-5 h-5 mr-2" />
                Real-Time Tracking
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedPOSDemo("communication")}
                className={`text-base h-12 px-6 rounded-xl transition-colors min-w-[170px] shrink-0 ${
                  selectedPOSDemo === "communication"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Communication Hub
              </Button>
            </div>

            {/* POS Demo Content */}
            <Card className="border-2 shadow-2xl overflow-visible rounded-2xl">
              <CardContent className="p-0">
                {selectedPOSDemo === "upload" && (
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full p-6">
                    <div className="max-w-2xl relative">
                      <div className="space-y-5">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4 sm:mb-5">
                            <Upload className="w-3 h-3 mr-1.5" />
                            Secure Document Upload
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Upload Any Document Format</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-4">
                            Borrowers can securely upload PDFs, images, Word docs, and more. TAMI handles all formats with
                            enterprise-grade security.
                          </p>
                        </div>
                        <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Multi-Format Support</p>
                            <p className="text-sm text-muted-foreground">
                              PDF, JPG, PNG, DOCX, HEIC - all processed instantly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Drag & Drop Interface</p>
                            <p className="text-sm text-muted-foreground">Intuitive upload experience on any device</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Bank-Level Security</p>
                            <p className="text-sm text-muted-foreground">End-to-end encryption for all documents</p>
                          </div>
                        </div>
                      </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Secure
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Any Format
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <img
                            src="/images/screenshot-202025-11-23-20at-207.png"
                            alt="Document Upload Interface"
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}

                {selectedPOSDemo === "classification" && (
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full p-6">
                    <div className="max-w-2xl relative">
                      <div className="space-y-5">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4 sm:mb-5">
                            <FileCheck className="w-3 h-3 mr-1.5" />
                            Intelligent Auto-Classification
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">AI Identifies Every Document Type</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-4">
                            TAMI automatically identifies W-2s, 1040s, 1065s, paystubs, bank statements, and more with
                            99.9% accuracy using OCR and IDP.
                          </p>
                        </div>
                        <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Smart Recognition</p>
                            <p className="text-sm text-muted-foreground">
                              W-2, 1040, 1065, paystubs, bank statements auto-tagged
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">OCR Data Extraction</p>
                            <p className="text-sm text-muted-foreground">
                              Key data pulled automatically from every document
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Zero Manual Sorting</p>
                            <p className="text-sm text-muted-foreground">Documents organized instantly upon upload</p>
                          </div>
                        </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            99.9% accurate
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Instant
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 aspect-video">
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <Play className="w-12 h-12 text-white opacity-90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="relative z-10 text-slate-700 font-semibold text-center">
                              [Auto-Classification Video Demo]
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}

                {selectedPOSDemo === "tracking" && (
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full p-6">
                    <div className="max-w-2xl relative">
                      <div className="space-y-5">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4 sm:mb-5">
                            <Eye className="w-3 h-3 mr-1.5" />
                            Real-Time Status Tracking
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Complete Visibility For Everyone</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-4">
                            Borrowers and loan officers get real-time status updates, smart checklists, and expiration
                            tracking all in one dashboard.
                          </p>
                        </div>
                        <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Live Progress Bar</p>
                            <p className="text-sm text-muted-foreground">
                              Borrowers see exactly where they are in the process
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Missing Document Tracker</p>
                            <p className="text-sm text-muted-foreground">Smart checklist based on borrower profile</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Expiration Alerts</p>
                            <p className="text-sm text-muted-foreground">
                              Automatic notifications before documents expire
                            </p>
                          </div>
                        </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            100% visibility
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Proactive
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 aspect-video">
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <Play className="w-12 h-12 text-white opacity-90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="relative z-10 text-slate-700 font-semibold text-center">
                              [Real-Time Tracking Video Demo]
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}

                {selectedPOSDemo === "communication" && (
                  <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full p-6">
                    <div className="max-w-2xl relative">
                      <div className="space-y-5">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4 sm:mb-5">
                            <MessageSquare className="w-3 h-3 mr-1.5" />
                            Unified Communication Hub
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">In-App Chat, Email & SMS</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-4">
                            Borrowers and loan officers communicate seamlessly through in-app messaging, email, or SMS
                            with automated reminders for missing documents.
                          </p>
                        </div>
                        <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Multi-Channel Messaging</p>
                            <p className="text-sm text-muted-foreground">In-app, email, and SMS all synchronized</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Automated Reminders</p>
                            <p className="text-sm text-muted-foreground">
                              Smart follow-ups for VOE, appraisal, missing docs
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground">Central Inbox</p>
                            <p className="text-sm text-muted-foreground">All communication history in one place</p>
                          </div>
                        </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            40-50% fewer calls
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Unified
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 aspect-video">
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                              <Play className="w-12 h-12 text-white opacity-90 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <span className="relative z-10 text-slate-700 font-semibold text-center">
                              [Communication Hub Video Demo]
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TAMI Loan Processor */}
      <section className="relative bg-slate-100 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start w-full">
            <div className="max-w-2xl relative">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 w-fit text-sm sm:text-base mb-4 sm:mb-5">
                <Brain className="w-4 h-4 mr-2" />
                AI Loan Processing Platform
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 whitespace-nowrap">
                TAMI <span className="text-blue-600">Loan Processor</span>
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed mt-6">
                Intelligent Document Processing that accelerates mortgage closing from{" "}
                <span className="font-semibold text-slate-900">weeks to days</span> with G.S.E.
                compliance.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 mt-6">
                <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                  Start Your AI Journey
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2 border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50">
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
              {/* Combined Image and Stats Card */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative overflow-hidden shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 p-5 sm:p-6">
                  {/* Image Section */}
                  <div className="relative group rounded-xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50 mb-5">
                    <img
                      src="/images/e.png"
                      alt="TAMI AI Loan Processor Platform Interface"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                {/* Floating Bubble Animation */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See TAMI In Action */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 w-full relative">
          <div className="text-center mb-3 w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-0.5">See TAMI-<span className="text-blue-600">Processor In Action</span></h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Experience real-time intelligent automation across every mortgage workflow
            </p>
          </div>

          {/* Interactive Demo Tabs */}
          <div className="w-full mb-6">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 mb-6 p-2 bg-slate-100 rounded-2xl mx-auto overflow-x-auto">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedDemo("document")}
                className={`text-sm h-10 px-5 rounded-xl transition-colors min-w-[160px] shrink-0 ${
                  selectedDemo === "document"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <FileCheck className="w-4 h-4 mr-2" />
                Document Processing
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedDemo("analysis")}
                className={`text-sm h-10 px-5 rounded-xl transition-colors min-w-[160px] shrink-0 ${
                  selectedDemo === "analysis"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Smart Analysis
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setSelectedDemo("dashboard")}
                className={`text-sm h-10 px-5 rounded-xl transition-colors min-w-[160px] shrink-0 ${
                  selectedDemo === "dashboard"
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Live Dashboard
              </Button>
            </div>

            {/* Demo Content */}
            <Card className="border-2 shadow-2xl overflow-visible rounded-2xl w-full">
              <CardContent className="p-0">
                {selectedDemo === "document" && (
                  <div className="grid lg:grid-cols-2 gap-10 xl:gap-12 items-start w-full p-4">
                    <div className="max-w-2xl relative">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
                            <FileCheck className="w-3 h-3 mr-1.5" />
                            Intelligent Document Processing
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Automate Document Review</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-2">
                            Upload any loan document and watch TAMI instantly extract, verify, and analyze critical
                            information with 99.9% accuracy.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Auto-Classification</p>
                              <p className="text-sm text-muted-foreground">
                                Automatically identifies document types and extracts key data
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Risk Highlighting</p>
                              <p className="text-sm text-muted-foreground">
                                Flags potential compliance issues and missing information
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Zero Manual Entry</p>
                              <p className="text-sm text-muted-foreground">
                                Eliminates data entry errors and saves hours per loan
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            75% faster
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Error-free
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <img
                            src="/document-processing-dashboard-with-ai-analysis.jpg"
                            alt="Document Processing Interface"
                            className="w-full h-auto max-h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}

                {selectedDemo === "analysis" && (
                  <div className="grid lg:grid-cols-2 gap-10 xl:gap-12 items-start w-full p-4">
                    <div className="max-w-2xl relative">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
                            <TrendingUp className="w-3 h-3 mr-1.5" />
                            AI-Powered Income Analysis
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Business Income Intelligence</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-2">
                            Automated cash flow analysis for all entity types with real-time Fannie Mae compliance
                            calculations.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Multi-Entity Support</p>
                              <p className="text-sm text-muted-foreground">
                                C-Corp, S-Corp, LLC, Sole Prop, Partnership—all automated
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Cash Flow Breakdown</p>
                              <p className="text-sm text-muted-foreground">
                                Year-by-year analysis with anomaly detection
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Fannie Mae Compliant</p>
                              <p className="text-sm text-muted-foreground">
                                Real-time guideline compliance with instant calculations
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            10x faster
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            99.9% accurate
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <img
                            src="/financial-analysis-dashboard.png"
                            alt="Income Analysis Interface"
                            className="w-full h-auto max-h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}

                {selectedDemo === "dashboard" && (
                  <div className="grid lg:grid-cols-2 gap-10 xl:gap-12 items-start w-full p-4">
                    <div className="max-w-2xl relative">
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
                            <Shield className="w-3 h-3 mr-1.5" />
                            Real-Time Risk Monitoring
                          </Badge>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Live Compliance Dashboard</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-2">
                            Monitor all loans in real-time with instant alerts for compliance issues, credit risks, and
                            required actions.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">24/7 Monitoring</p>
                              <p className="text-sm text-muted-foreground">
                                Continuous risk assessment across your entire pipeline
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Instant Alerts</p>
                              <p className="text-sm text-muted-foreground">
                                Proactive notifications for compliance and credit concerns
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Dynamic Eligibility</p>
                              <p className="text-sm text-muted-foreground">
                                Real-time qualification status as documents are uploaded
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-3">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Proactive
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            100% compliant
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full max-w-[680px] mx-0 lg:ml-8">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-400/20 rounded-[36px] blur-3xl"></div>
                      <div className="relative overflow-hidden shadow-2xl border border-slate-200/60 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20 p-3 sm:p-4">
                        <div className="relative group rounded-2xl overflow-hidden shadow-xl w-full bg-white border-2 border-slate-200/50">
                          <img
                            src="/compliance-dashboard-with-risk-monitoring-and-aler.jpg"
                            alt="Live Dashboard Interface"
                            className="w-full h-auto max-h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-5 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" />
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-400 rounded-full opacity-10 animate-pulse delay-1000" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
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
          
          <div className="relative overflow-hidden">
            {/* Left blur gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            {/* Right blur gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-hidden">
              <div 
                ref={marqueeRef}
                className="flex"
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
                        className="flex items-center justify-center"
                        style={{ 
                          width: '250px',
                          minWidth: '250px',
                          paddingLeft: '2rem', 
                          paddingRight: '2rem',
                          boxSizing: 'border-box',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src="/images/meridian-link.svg"
                          alt="MeridianLink"
                          className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
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
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-5xl mx-auto px-4 sm:px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight break-words md:whitespace-nowrap">
              Built For <span className="text-blue-700">Forward Thinking </span><span className="text-black">Lending institutions</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Empowering Mortgage Brokers, Credit Unions, Local Banks, and Underwriters to transform loan processing
              with AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-base font-bold mb-2">Mortgage Brokers</h3>
                <p className="text-sm text-slate-600">Close deals faster with automated processing and instant updates.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-bold mb-2">Credit Unions</h3>
                <p className="text-sm text-slate-600">
                  Enhance member experience with real-time tracking and personalized service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-base font-bold mb-2">Local Banks</h3>
                <p className="text-sm text-slate-600">Compete with enterprise-grade AI while keeping your personal touch.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 hover:shadow-xl transition-all group">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-base font-bold mb-2">Underwriters</h3>
                <p className="text-sm text-slate-600">Make faster decisions with AI-powered risk assessment and compliance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50 text-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 mb-6 px-4 py-1.5">Customer Success</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Trusted by Industry Experts</h2>
            <p className="text-lg text-slate-600">
              Social proof from lending innovators who scaled faster with TAMI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border border-slate-100 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-cyan-300 mx-auto mb-4"></div>
                <div className="h-1 w-16 bg-blue-100 mx-auto rounded-full" />
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-100 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-emerald-300 mx-auto mb-4"></div>
                <div className="h-1 w-16 bg-green-100 mx-auto rounded-full" />
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-100 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mx-auto mb-4"></div>
                <div className="h-1 w-16 bg-purple-100 mx-auto rounded-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Move from Manual Work to Intelligent Automation
            </h2>
            <p className="text-xl md:text-2xl text-blue-50">
              Give your borrowers a delightful experience — and your team superpowers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-base bg-white text-blue-600 hover:bg-slate-50 shadow-2xl"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-2 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
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
                Transforming mortgage processing with intelligent AI automation.
              </p>
              <p className="text-sm text-slate-500">© 2025 ThinkAct. All rights reserved.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Security
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
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
