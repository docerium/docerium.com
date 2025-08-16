"use client";

import Dock from "./Dock";
import { ProjectIcon, GraphIcon, FileIcon } from "@primer/octicons-react";

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
];

export default function DockElement() {
  return <Dock items={items} panelHeight={68} baseItemSize={50} />;
}
