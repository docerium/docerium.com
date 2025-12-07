"use client";

import Dock from "./Dock";
import {
  ProjectIcon,
  GraphIcon,
  FileIcon,
  BeakerIcon,
} from "@primer/octicons-react";

const items = [
  {
    icon: <ProjectIcon size={18} />,
    label: "Whiteboard",
    onClick: () => (window.location.href = "/whiteboard"),
  },
  {
    icon: <GraphIcon size={18} />,
    label: "Graphs",
    onClick: () => (window.location.href = "/graphs"),
  },
  {
    icon: <FileIcon size={18} />,
    label: "Notebook",
    onClick: () => (window.location.href = "/notebook"),
  },
  {
    icon: <BeakerIcon size={18} />,
    label: "Equation Solver",
    onClick: () => (window.location.href = "/equation-solver"),
  },
];

export default function DockElement() {
  return (
    <>
      {/* Mobile dock - smaller and simpler */}
      <div className="block sm:hidden">
        <Dock items={items} panelHeight={56} baseItemSize={40} />
      </div>
      {/* Desktop dock - original size */}
      <div className="hidden sm:block">
        <Dock items={items} panelHeight={68} baseItemSize={50} />
      </div>
    </>
  );
}
