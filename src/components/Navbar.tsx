'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Framework: [
    {
      title: 'Industries',
      items: [
        {
          icon: <LuBookOpenText />,
          name: 'D.A.P.',
          path: '/platform#dap',
        },
        {
          icon: <Database />,
          name: 'KnowLedger',
          path: '/platform#ledgeriq',
        },
        {
          icon: <IoFlowerOutline />,
          name: 'Orchestration',
          path: '/platform#thinkagentic',
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
        {
          icon: <IoFlowerOutline />,
          name: 'Framework',
          path: '/platform',
          children: [
            {
              icon: <LuBookOpenText />,
              name: 'D.A.P.',
              path: '/platform#dap',
            },
            {
              icon: <Database />,
              name: 'KnowLedger',
              path: '/platform#ledgeriq',
            },
            {
              icon: <IoFlowerOutline />,
              name: 'Orchestration',
              path: '/platform#thinkagentic',
            },
          ],
        },
      ],
    },
  ],
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  const subItemTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track hash changes for active state
  React.useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    updateHash();
    const handleHashChange = () => {
      updateHash();
    };
    window.addEventListener('hashchange', handleHashChange);
    // Also check hash on scroll to detect when user scrolls to sections
    const handleScroll = () => {
      updateHash();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', hasDropdown: false },
    { name: 'TAMI', path: '/#tami', hasDropdown: false },
    { name: 'Pricing', path: '/pricing', hasDropdown: false },
    {
      name: 'Company',
      path: '',
      hasDropdown: true,
      data: navigationData.Company,
    },
  ];

  // Helper function to check if a nav item is active
  const isActive = (item: NavItem): boolean => {
    if (!item.path) {
      // For dropdown items without path (like Company), check if any child is active
      if (item.name === 'Company') {
        return pathname?.startsWith('/platform') || 
               pathname === '/blog' || 
               pathname === '/about-us' || 
               pathname === '/careers' || 
               pathname === '/contact-us' || 
               pathname === '/support';
      }
      return false;
    }
    
    // Handle hash links (like /#tami)
    if (item.path.includes('#')) {
      const [, hash] = item.path.split('#');
      // For TAMI, only highlight if we're on home page AND hash matches
      return pathname === '/' && currentHash === `#${hash}`;
    }
    
    // Handle exact path matches for Home
    if (item.path === '/') {
      // Home should only be active if we're on home page AND not on TAMI section (hash should be empty or not #tami)
      return pathname === '/' && currentHash !== '#tami';
    }
    
    // Handle paths that start with the item path
    return pathname?.startsWith(item.path) || false;
  };

  // Helper function to check if a dropdown item is active
  const isDropdownItemActive = (itemPath: string): boolean => {
    if (itemPath.includes('#')) {
      const [basePath, hash] = itemPath.split('#');
      if (basePath === '/platform') {
        // For platform hash links, check if we're on platform page and hash matches
        return pathname === '/platform' && (currentHash === `#${hash}` || (currentHash === '' && hash === ''));
      }
      // For home page hash links
      return pathname === '/' && currentHash === `#${hash}`;
    }
    // For Framework (/platform), it should be active when on /platform page
    if (itemPath === '/platform') {
      return pathname === '/platform';
    }
    return pathname === itemPath || pathname?.startsWith(itemPath);
  };

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
    if (path.includes('#')) {
      e.preventDefault();
      const [basePath, hash] = path.split('#');
      
      // If path is /platform#section, navigate to platform page
      if (basePath === '/platform') {
        if (pathname !== '/platform') {
          router.push(path);
          // Wait for navigation and page load, then scroll
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Update hash in URL
            window.history.pushState(null, '', `#${hash}`);
            setCurrentHash(`#${hash}`);
          }, 500);
        } else {
          // Already on platform page, update hash and scroll
          window.history.pushState(null, '', `#${hash}`);
          setCurrentHash(`#${hash}`);
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        // Handle home page hash links
        if (pathname !== '/') {
          router.push(path);
          // Wait for navigation and page load, then scroll
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Update hash in URL
            window.history.pushState(null, '', `#${hash}`);
            setCurrentHash(`#${hash}`);
          }, 500);
        } else {
          // Already on home page, update hash and scroll
          window.history.pushState(null, '', `#${hash}`);
          setCurrentHash(`#${hash}`);
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      handleMenuClose();
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (pathname === '/') {
      e.preventDefault();
      // Clear hash and scroll to top
      window.history.pushState(null, '', '/');
      setCurrentHash('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderNestedDropdown = (children: NavigationItem[]) => {
    return (
      <div 
        className="absolute left-full top-0 ml-1 bg-white border border-zinc-200 shadow-xl rounded-xl w-48 z-[60] transition-all duration-200 ease-out"
        onMouseEnter={() => {
          // Clear any pending timeout when hovering over nested dropdown
          if (subItemTimeoutRef.current) {
            clearTimeout(subItemTimeoutRef.current);
            subItemTimeoutRef.current = null;
          }
        }}
        onMouseLeave={() => {
          // Small delay before closing to allow moving back to parent
          subItemTimeoutRef.current = setTimeout(() => {
            setHoveredSubItem(null);
          }, 200);
        }}
      >
        <div className="p-2">
          {children.map((child) => {
            const isChildActive = isDropdownItemActive(child.path);
            return (
              <Link
                key={child.name}
                href={child.path}
                className={`flex items-center px-3 py-2 rounded text-sm transition-colors duration-150 ${
                  isChildActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-zinc-100 text-zinc-700'
                }`}
                onClick={(e) => {
                  handleSmoothScroll(e, child.path);
                  handleMenuClose();
                }}
              >
                {child.icon && (
                  <span className={`mr-2 ${isChildActive ? 'text-blue-600' : 'text-zinc-500'}`}>
                    {React.cloneElement(
                      child.icon as React.ReactElement<{ className?: string }>,
                      {
                        className: 'w-4 h-4',
                      }
                    )}
                  </span>
                )}
                {child.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDropdown = (itemName: string) => {
    const dropdownData = navigationData[itemName];
    if (!dropdownData) return null;

    return (
      <div className="absolute mt-2 bg-white border border-zinc-200 shadow-xl rounded-xl w-60 z-50 animate-[fadeInSlideDown_0.2s_ease-out]">
        <div className="p-2">
          {dropdownData[0].items.map((item) => {
            const isItemActive = isDropdownItemActive(item.path);
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (item.children) {
                    // Clear any pending timeout
                    if (subItemTimeoutRef.current) {
                      clearTimeout(subItemTimeoutRef.current);
                      subItemTimeoutRef.current = null;
                    }
                    handleSubItemHover(item.name);
                  }
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    // Small delay to allow moving to nested dropdown
                    subItemTimeoutRef.current = setTimeout(() => {
                      setHoveredSubItem(null);
                    }, 200);
                  }
                }}
              >
                <Link
                  href={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm transition-colors duration-150 ${
                    isItemActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-zinc-100 text-zinc-700'
                  }`}
                  onClick={(e) => {
                    if (!item.children) {
                      handleSmoothScroll(e, item.path);
                      handleMenuClose();
                    } else {
                      // If Framework has children, navigate to platform page
                      e.preventDefault();
                      router.push(item.path);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <span className={`mr-2 ${isItemActive ? 'text-blue-600' : 'text-zinc-500'}`}>
                      {React.cloneElement(
                        item.icon as React.ReactElement<{ className?: string }>,
                        {
                          className: 'w-4 h-4',
                        }
                      )}
                    </span>{' '}
                    {item.name}
                  </div>
                  {item.children && (
                    <FaChevronRight className={`h-3 w-3 ${isItemActive ? 'text-blue-600' : 'text-zinc-400'}`} />
                  )}
                </Link>
                {item.children &&
                  hoveredSubItem === item.name &&
                  renderNestedDropdown(item.children)}
              </div>
            );
          })}
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
            <Link href="/" className="flex items-center gap-0 transition-opacity duration-200 hover:opacity-80">
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
                Think<span className="text-blue-500">Act</span> AI
              </p>
            </Link>

            <div className="hidden lg:flex space-x-6 text-zinc-700 font-light">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => handleMouseEnter(item)}
                    className="relative"
                  >
                    {item.path && item.path.includes('#') ? (
                      <a
                        href={item.path}
                        className={`flex items-center transition-colors duration-200 cursor-pointer relative pb-1 ${
                          active 
                            ? 'text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-blue-600' 
                            : 'hover:text-zinc-900'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSmoothScroll(e, item.path);
                        }}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <FaChevronDown
                            className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </a>
                    ) : (
                      <Link 
                        href={item.path || '#'} 
                        className={`flex items-center transition-colors duration-200 relative pb-1 ${
                          active 
                            ? 'text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-blue-600' 
                            : 'hover:text-zinc-900'
                        }`}
                        onClick={(e) => {
                          if (item.hasDropdown && !item.path) {
                            e.preventDefault();
                          } else if (item.path === '/') {
                            handleHomeClick(e);
                          }
                        }}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <FaChevronDown
                            className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </Link>
                    )}
                    {activeDropdown === item.name && item.hasDropdown && (
                      <div className="absolute top-full left-0">
                        {renderDropdown(item.name)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://www.nvidia.com/en-us/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                aria-label="NVIDIA Inception Program"
              >
                <Image
                  src="/nvidia-inception-program-badge-rgb-for-screen.svg"
                  alt="NVIDIA Inception Program"
                  width={120}
                  height={52}
                  className="h-14 w-auto"
                />
              </a>
              {/* <Link href="/signin">
                <button className="text-sm font-light text-zinc-700 hover:text-black px-4 py-2 rounded-full border border-zinc-300 hover:bg-zinc-100 transition-all duration-200">
                  Sign In
                </button>
              </Link> */}
              <button 
                onClick={() => window.open('https://koalendar.com/e/meet-with-sales-thinkactai', 'BookADemo', 'width=800,height=600,scrollbars=yes,resizable=yes')}
                className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <FaCalendarDay size={16} className="mr-2" />
                Book a Demo
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              <a
                href="https://www.nvidia.com/en-us/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                aria-label="NVIDIA Inception Program"
              >
                <Image
                  src="/nvidia-inception-program-badge-rgb-for-screen.svg"
                  alt="NVIDIA Inception Program"
                  width={88}
                  height={38}
                  className="h-9 w-auto"
                />
              </a>
              <button onClick={handleMenuToggle} className="text-zinc-800 p-2 transition-opacity duration-200 hover:opacity-70">
                {isOpen ? <RxCross2 size={24} /> : <CgMenuLeft size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white text-zinc-900 flex flex-col overflow-y-auto h-full pt-1 animate-[slideDown_0.3s_ease-out]">
          <div className="flex justify-between items-center p-2 shadow-md border-b border-gray-100">
            <Link href="/" onClick={handleMenuClose}>
              <Image
                src="/thinkact-logo.svg"
                alt="Logo"
                height={50}
                width={50}
              />
            </Link>
            <button onClick={handleMenuClose}>
              <IoClose size={32} className="text-zinc-900" />
            </button>
          </div>
          <div className="p-4">
            {navItems.map((item) => {
              const active = isActive(item);
              return item.hasDropdown ? (
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
                item.path && item.path.includes('#') ? (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(e, item.path);
                      handleMenuClose();
                    }}
                    className={`block py-3 border-b border-zinc-200 transition-colors duration-200 cursor-pointer relative ${
                      active 
                        ? 'text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-20 after:h-px after:bg-blue-600' 
                        : 'hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      if (item.path === '/') {
                        handleHomeClick(e);
                      }
                      handleMenuClose();
                    }}
                    className={`block py-3 border-b border-zinc-200 transition-colors duration-200 relative ${
                      active 
                        ? 'text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-20 after:h-px after:bg-blue-600' 
                        : 'hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
