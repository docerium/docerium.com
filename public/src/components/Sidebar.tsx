"use client";

import React, { useState } from "react";
import "@/styles/sidebar.scss";
import {
  ProjectIcon,
  GraphIcon,
  NoteIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";

const icons = [
  { href: "/whiteboard", icon: <ProjectIcon size={42} />, name: "Whiteboard" },
  { href: "/graphs", icon: <GraphIcon size={42} />, name: "Graphs" },
  { href: "/notebook", icon: <NoteIcon size={42} />, name: "Notebook" },
];

const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIconSize = (index: number) => {
    if (hoveredIndex === null) return 42;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 64; // Magnified size
    if (distance === 1) return 52; // Slightly smaller
    return 42; // Default size
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icons" onMouseLeave={() => setHoveredIndex(null)}>
        {icons.map((item, index) => (
          <a
            href={item.href}
            key={item.href}
            className="sidebar-icon"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {React.cloneElement(item.icon, { size: getIconSize(index) })}
            <span className="tooltip">{item.name}</span>
          </a>
        ))}
      </div>
      <a
        href="https://github.com/andrinoff/tme"
        className="github-link"
        onMouseEnter={() => setHoveredIndex(icons.length)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <MarkGithubIcon size={getIconSize(icons.length)} />
        <span className="tooltip">GitHub</span>
      </a>
    </div>
  );
};

export default Sidebar;
