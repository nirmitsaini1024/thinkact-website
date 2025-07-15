"use client";

import Footer from "@/components/Footer";
import RiskMind from "@/components/Home/RiskMind";
import Navbar from "@/components/Navbar";
import React, { useLayoutEffect, useState } from "react";

const Page = () => {
  const [isRibbonClosed, setIsRibbonClonsed] = useState(false);

  useLayoutEffect(() => {
    const ribbonClosed = localStorage.getItem("ribbon");
    setIsRibbonClonsed(ribbonClosed);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRibbonClosed ? "pt-16" : "pt-24"} overflow-hidden`}
      >
        <RiskMind />
      </div>
      {/* <section className="w-full px-4 py-5 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-l-2 border-gray-900 pl-2 text-primary">
              (White Paper....)
            </h2>
            <p className="text-lg text-gray-600">
              Para 1
            </p>
            <p className="text-lg text-gray-600">
              Para 2
            </p>
            <p className="text-lg text-gray-600">
              Para 3
            </p>
          </div>
        </section>  */}
      <Footer />
    </>
  );
};

export default Page;
