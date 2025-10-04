import type { Metadata } from "next";
import DockWrapper from "@/components/DockWrapper";

export const metadata: Metadata = {
  title: "Interactive Whiteboard",
  description:
    "Collaborative digital whiteboard for sketching ideas, drawing diagrams, and real-time visual collaboration.",
};

export default function WhiteboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="DockWrapper">
        <DockWrapper />
      </div>
    </>
  );
}
