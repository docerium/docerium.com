"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import "@/styles/whiteboard.scss";

const Whiteboard = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export default function WhiteboardPage() {
  return (
    <div className="page custom-styles">
      <Whiteboard />
    </div>
  );
}
