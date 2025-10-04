"use client";

import React from "react";
import Link from "next/link";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: string;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  pathname: string;
  className?: string;
};

function DockItem({
  icon,
  label,
  href,
  className = "",
  isActive,
}: DockItemData & { isActive: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center h-12 w-12 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? "bg-gray-700" : "hover:bg-gray-800"
      } ${className}`}
    >
      {icon}
      {isHovered && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded">
          {label}
        </div>
      )}
    </Link>
  );
}

export default function Dock({ items, pathname, className = "" }: DockProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 rounded-lg bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 ${className}`}
    >
      {items.map((item, index) => (
        <DockItem key={index} {...item} isActive={pathname === item.href} />
      ))}
    </div>
  );
}
