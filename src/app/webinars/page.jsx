"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Webinars() {
  const headlineRef = useRef(null);
  const subheadlineRefs = useRef([]);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Create a timeline with slight elastic ease for more dynamic motion
    const tl = gsap.timeline({
      defaults: {
        ease: "elastic.out(1, 0.5)",
        duration: 1.2,
      },
    });

    // Animate headline with a subtle rotation
    tl.fromTo(
      headlineRef.current,
      {
        opacity: 0,
        y: 50,
        rotation: -5,
        transformOrigin: "center center",
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
      }
    )
      // Stagger subheadline text with slight delay
      .fromTo(
        subheadlineRefs.current,
        {
          opacity: 0,
          y: 30,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
        },
        "-=0.5"
      )
      // Button with horizontal movement
      .fromTo(
        buttonRef.current,
        {
          opacity: 0,
          x: -50,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
        },
        "-=0.5"
      )
      // Image with scale and slight perspective
      .fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotationY: 15,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
        },
        "-=0.5"
      );
  }, []);

  return (
    <>
    <Navbar />
    <section className="w-full px-4 py-10 md:px-0 md:py-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center overflow-hidden relative space-y-24">
      {/* Background Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100/50"></div>
        <div className="absolute left-[25%] top-0 bottom-0 w-px bg-gray-100/50"></div>
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gray-100/50"></div>
        <div className="absolute left-[75%] top-0 bottom-0 w-px bg-gray-100/50"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-100/50"></div>
      </div>

      <div className="space-y-8">
        <div ref={headlineRef}>
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            <span className="text-primary">Webinar Page</span>{" "}
          </h1>
        </div>
        <div className="space-y-4">
          <p
            ref={(el) => (subheadlineRefs.current[0] = el)}
            className="text-xl text-black max-w-lg opacity-0"
          >
            Build Powerful Agent Workflows with{" "}
            <span className="text-primary">Fluid</span> Routing and{" "}
            <span className="text-primary">Seamless</span> Orchestration
          </p>
          <p
            ref={(el) => (subheadlineRefs.current[1] = el)}
            className="text-lg text-black max-w-lg opacity-0"
          >
            Experience Robust <span className="text-primary">Security</span>,
            Data <span className="text-primary">Privacy</span>, and Role-Based
            Access <span className="text-primary">Control</span>
          </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default Webinars;