"use client";

import { usePathname } from "next/navigation";
import Dock from "./Dock";
import { PiGraph, PiNote, PiPaintBrush } from "react-icons/pi";

export default function DockWrapper() {
  const pathname = usePathname();

  const dockItems = [
    {
      label: "Whiteboard",
      icon: <PiPaintBrush />,
      href: "/whiteboard",
    },
    {
      label: "Notebook",
      icon: <PiNote />,
      href: "/notebook",
    },
    {
      label: "Graphs",
      icon: <PiGraph />,
      href: "/graphs",
    },
  ];

  return <Dock items={dockItems} pathname={pathname} />;
}
