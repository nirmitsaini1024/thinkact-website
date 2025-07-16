'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgMenuLeft } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';
import { FaChevronDown, FaCalendarDay, FaChevronRight } from 'react-icons/fa';
import { IoFlowerOutline, IoClose } from 'react-icons/io5';
import { MdLibraryBooks } from 'react-icons/md';
import { LuBookOpenText, LuContact, LuMessageSquareText } from 'react-icons/lu';
import AccordionItem from './AccordionItem';
import { Database } from 'lucide-react';
import { RiCustomerService2Fill } from 'react-icons/ri';

interface NavigationItem {
  icon?: React.ReactElement;
  name: string;
  path: string;
  children?: NavigationItem[];
  items?: NavigationItem[];
  items2?: NavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface NavigationData {
  [key: string]: NavigationSection[];
}

interface NavItem {
  name: string;
  path: string;
  hasDropdown: boolean;
  data?: NavigationSection[];
}

const navigationData: NavigationData = {
  Platform: [
    {
      title: 'Industries',
      items: [
        {
          icon: <LuBookOpenText />,
          name: 'D.A.P.',
          path: '/#dap',
        },
        {
          icon: <Database />,
          name: 'KnowLedger',
          path: '/#ledgeriq',
        },
        {
          icon: <IoFlowerOutline />,
          name: 'Orchestration',
          path: '/orchestration',
        },
      ],
    },
  ],
  Company: [
    {
      title: 'Get Started',
      items: [
        { icon: <MdLibraryBooks />, name: 'Blog', path: '/blog' },
        { icon: <LuBookOpenText />, name: 'About Us', path: '/about-us' },
        { icon: <LuMessageSquareText />, name: 'Careers', path: '/careers' },
        { icon: <LuContact />, name: 'Contact Us', path: '/contact-us' },
        { icon: <RiCustomerService2Fill />, name: 'Support', path: '/support' },
      ],
    },
  ],
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', hasDropdown: false },
    {
      name: 'Platform',
      path: '',
      hasDropdown: true,
      data: navigationData.Platform,
    },
    {
      name: 'Company',
      path: '',
      hasDropdown: true,
      data: navigationData.Company,
    },
  ];

  const handleMouseEnter = (item: NavItem): void => {
    if (item.hasDropdown) setActiveDropdown(item.name);
  };

  const handleMouseLeave = (): void => {
    setTimeout(() => {
      setActiveDropdown(null);
      setHoveredSubItem(null);
    }, 200);
  };

  const handleSubItemHover = (itemName: string): void => {
    setHoveredSubItem(itemName);
  };

  const handleMenuToggle = (): void => setIsOpen(!isOpen);
  const handleMenuClose = (): void => setIsOpen(false);

  const renderNestedDropdown = (children: NavigationItem[]) => {
    return (
      <div className="absolute left-full top-0 ml-1 bg-white border border-zinc-200 shadow-xl rounded-xl w-48 z-50">
        <div className="p-2">
          {children.map((child) => (
            <Link
              key={child.name}
              href={child.path}
              className="flex items-center px-3 py-2 hover:bg-zinc-100 rounded text-sm text-zinc-700"
              onClick={handleMenuClose}
            >
              {child.icon && (
                <span className="mr-2 text-zinc-500">
                  {React.cloneElement(child.icon as React.ReactElement<{ className?: string }>, {
                    className: 'w-4 h-4',
                  })}
                </span>
              )}
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderDropdown = (itemName: string) => {
    const dropdownData = navigationData[itemName];
    if (!dropdownData) return null;

    return (
      <div className="absolute mt-2 bg-white border border-zinc-200 shadow-xl rounded-xl w-60 z-50">
        <div className="p-2">
          {dropdownData[0].items.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() =>
                item.children && handleSubItemHover(item.name)
              }
              onMouseLeave={() => setHoveredSubItem(null)}
            >
              <Link
                href={item.path}
                className="flex items-center justify-between px-3 py-2 hover:bg-zinc-100 rounded text-sm text-zinc-700"
                onClick={handleMenuClose}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-zinc-500">
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                      className: 'w-4 h-4',
                    })}
                  </span>{' '}
                  {item.name}
                </div>
                {item.children && (
                  <FaChevronRight className="h-3 w-3 text-zinc-400" />
                )}
              </Link>
              {item.children &&
                hoveredSubItem === item.name &&
                renderNestedDropdown(item.children)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full bg-gradient-to-b from-white via-white/90 to-transparent
 border-b border-zinc-200 z-50 backdrop-blur-sm"
        onMouseLeave={handleMouseLeave}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between  h-16">
            <Link href="/" className="flex items-center gap-0">
              <div className="">
                <Image
                  src="/1122.svg"
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

            <div className="hidden lg:flex space-x-6 text-zinc-700 font-light">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => handleMouseEnter(item)}
                  className="relative"
                >
                  <Link href={item.path || '#'} className="flex items-center">
                    {item.name}
                    {item.hasDropdown && (
                      <FaChevronDown
                        className={`ml-1 h-3 w-3 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>
                  {activeDropdown === item.name && item.hasDropdown && (
                    <div className="absolute top-full left-0">
                      {renderDropdown(item.name)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/signin">
                <button className="text-sm font-light text-zinc-700 hover:text-black px-4 py-2 rounded-full border border-zinc-300 hover:bg-zinc-100">
                  Sign In
                </button>
              </Link>
              <Link href="/book-a-demo">
                <button className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">
                  <FaCalendarDay size={16} className="mr-2" />
                  Book a Demo
                </button>
              </Link>
            </div>

            <div className="lg:hidden">
              <button onClick={handleMenuToggle} className="text-zinc-800 p-2">
                {isOpen ? <RxCross2 size={24} /> : <CgMenuLeft size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white text-zinc-900 flex flex-col overflow-y-auto h-full pt-16">
          <div className="flex justify-between items-center p-4 shadow-md border-b">
            <Link href="/" onClick={handleMenuClose}>
              <Image src="/1122.svg" alt="Logo" height={40} width={40} />
            </Link>
            <button onClick={handleMenuClose}>
              <IoClose size={32} className="text-zinc-900" />
            </button>
          </div>
          <div className="p-4">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <div className="font-semibold py-2">{item.name}</div>
                  {item.data?.[0]?.items.map((subItem) => (
                    <AccordionItem
                      key={subItem.name}
                      item={subItem}
                      onClose={handleMenuClose}
                    />
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={handleMenuClose}
                  className="block py-3 border-b border-zinc-200"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
