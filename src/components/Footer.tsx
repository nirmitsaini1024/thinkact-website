'use client';

import type { FC } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa';
import Image from 'next/image';

const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer>
      <div className="relative bg-[#f2f2f2] text-zinc-700">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 pointer-events-none hidden md:block mx-4 sm:mx-6 lg:mx-8">
            {[0, 25, 50, 75, 100].map((p) => (
              <div
                key={p}
                className="absolute top-0 bottom-0 w-px bg-zinc-200/30"
                style={{ left: `${p}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-12">
            {/* Left section */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <Link href="/" className="flex items-center gap-0 -ml-2">
                  <div className="">
                    <Image
                      src="/thinkact-logo.svg"
                      alt="Logo"
                      height={50}
                      width={50}
                      className="h-14 w-auto"
                    />
                  </div>
                  <p className="font-semibold text-2xl text-zinc-900">
                    Think<span className="text-blue-500">Act</span>
                  </p>
                </Link>

                <p className="text-zinc-600">
                  Revolutionizing document processing with intelligent agentic
                  AI automation, including advanced AI review and search.
                  Proactively flagging compliance and operational risks based on
                  document changes to ensure robust governance and efficiency.
                </p>
              </div>
              <div className="flex space-x-4 mt-6">
                {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-zinc-500 hover:text-primary transition"
                    aria-label="Social Link"
                  >
                    <Icon size={20} />
                  </a>
                ))}
                <a
                  href="https://www.linkedin.com/company/ThinkAct-ai/"
                  className="text-zinc-500 hover:text-primary transition"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>

            {/* Links and contact */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-8 relative">
              <div className="md:ml-[109px] w-full">
                <h4 className="text-lg font-bold text-zinc-900 mb-4 border-l-2 border-primary pl-2">
                  Useful Links
                </h4>
                <ul className="space-y-2 md:ml-2">
                  {['about-us', 'careers', 'blog'].map((path, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/${path}`}
                        className="hover:text-primary transition"
                      >
                        {path
                          .replace('-', ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:ml-[162px] w-full">
                <h4 className="text-lg font-bold text-zinc-900 mb-4 border-l-2 border-primary pl-2">
                  Contact Us
                </h4>
                <ul className="space-y-3 md:ml-2">
                  <li className="flex items-center space-x-3">
                    <FaMapMarkerAlt
                      size={18}
                      className="shrink-0 text-zinc-500"
                    />
                    <p className="hover:text-primary transition">
                      New Jersey, USA
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaEnvelope size={18} className="shrink-0 text-zinc-500" />
                    <a
                      href="mailto:hello@thinkact.ai"
                      className="hover:text-primary transition"
                    >
                      hello@thinkact.ai
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-300 py-4 text-zinc-700">
        <div className="flex flex-col md:flex-row justify-between items-center container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-sm">
            © {currentYear} ThinkAct. All Rights Reserved.
          </div>
          <div className="flex space-x-6 text-sm mt-2 sm:mt-0">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
