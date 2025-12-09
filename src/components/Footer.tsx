'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

const Footer: FC = () => {
  return (
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
              TAMI eliminates mortgage paperwork with Intelligent Document Processing, automates underwriting, and accelerates closing from weeks to days while ensuring GSE compliance.
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
                <Link
                  href="/upload-email-documents"
                  className="text-slate-400 hover:text-white transition"
                >
                  hello@thinkact.ai
                </Link>
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
  );
};

export default Footer;
