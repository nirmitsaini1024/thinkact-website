'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';

interface NavigationItem {
  icon?: React.ReactElement;
  name: string;
  path: string;
  children?: NavigationItem[];
  items?: NavigationItem[];
  items2?: NavigationItem[];
}

interface AccordionItemProps {
  item: NavigationItem;
  onClose: () => void;
  level?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  onClose,
  level = 0,
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const hasChildren = !!(item.children || item.items || item.items2);
  const pathname = usePathname();

  const toggleSubMenu = (): void => {
    if (hasChildren) {
      setIsSubMenuOpen((prev) => !prev);
    }
  };

  const isSamePageAnchor = (path?: string): boolean => {
    if (!path || !path.includes('#')) return false;
    if (path.startsWith('#')) return true;
    if (path.startsWith('/#')) {
      return pathname === '/';
    }
    return false;
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
    if (isSamePageAnchor(path)) {
      e.preventDefault();
      const hash = path.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleClick = (): void => {
    if (hasChildren) {
      toggleSubMenu();
    } else {
      onClose();
    }
  };

  const paddingClass =
    level === 0
      ? 'pl-4'
      : level === 1
      ? 'pl-8'
      : level === 2
      ? 'pl-12'
      : 'pl-16';

  const renderChildren = (): React.ReactElement[] => {
    const children: React.ReactElement[] = [];

    if (item.children) {
      children.push(
        ...item.children.map((child) => (
          <AccordionItem
            key={child.name}
            item={child}
            onClose={onClose}
            level={level + 1}
          />
        ))
      );
    }

    if (item.items) {
      children.push(
        ...item.items.map((subItem) => (
          <AccordionItem
            key={subItem.name}
            item={subItem}
            onClose={onClose}
            level={level + 1}
          />
        ))
      );
    }

    if (item.items2) {
      children.push(
        ...item.items2.map((subItem) => (
          <AccordionItem
            key={subItem.name}
            item={subItem}
            onClose={onClose}
            level={level + 1}
          />
        ))
      );
    }

    return children;
  };

  return (
    <div className={`${level === 0 ? 'border-b border-gray-200' : ''}`}>
      <div
        className={`
          flex items-center justify-between
          px-4 py-3
          ${
            level === 0
              ? 'text-lg font-semibold text-gray-800'
              : 'text-base text-gray-700'
          }
          ${hasChildren ? 'cursor-pointer hover:bg-gray-100' : ''}
        `}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {item.icon && (
            <span className="mr-2 text-zinc-500">
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                className: 'w-4 h-4',
              })}
            </span>
          )}
          {hasChildren ? (
            <span>{item.name}</span>
          ) : (
            <Link
              href={item.path || '#'}
              onClick={(e) => handleSmoothScroll(e, item.path || '#')}
              className="hover:underline"
            >
              {item.name}
            </Link>
          )}
        </div>

        {hasChildren && (
          <div className="w-6 h-6 flex items-center justify-center">
            <IoIosArrowDown
              size={16}
              className={`text-gray-600 transition-transform duration-200 ${
                isSubMenuOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        )}
      </div>

      {isSubMenuOpen && hasChildren && (
        <div className={`${paddingClass} bg-gray-50`}>{renderChildren()}</div>
      )}
    </div>
  );
};

export default AccordionItem;
