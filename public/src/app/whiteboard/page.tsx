"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Whiteboard = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export default function WhiteboardPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Whiteboard />
    </div>
  );
}
