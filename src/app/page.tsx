import Link from "next/link";
import { ProjectIcon, GraphIcon, FileIcon } from "@primer/octicons-react";
import PixelCard from "@/components/PixelCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Docerium - the all-in-one educational platform for interactive teaching and learning.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 page relative">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-yellow-300 animate-pulse">
          ✦
        </div>
        <div
          className="absolute top-32 right-20 text-blue-300 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          ✧
        </div>
        <div
          className="absolute top-40 left-1/4 text-purple-300 animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-40 left-16 text-pink-300 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          ✧
        </div>
        <div
          className="absolute bottom-32 right-16 text-cyan-300 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-20 left-1/3 text-yellow-300 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        >
          ✧
        </div>
        <div
          className="absolute bottom-16 right-1/3 text-green-300 animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          ✦
        </div>
      </div>

      <div className="text-center mb-12 z-10 relative">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Docerium
        </h1>
        <p className="text-lg text-gray-400">
          An all-in-one web application for teaching and learning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center z-10 relative">
        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/whiteboard">
              <div className="flex items-center justify-center mb-3">
                <ProjectIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">
                  Interactive Whiteboard
                </h2>
              </div>
              <p>Sketch ideas, draw diagrams, and collaborate in real-time.</p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/graphs">
              <div className="flex items-center justify-center mb-3">
                <GraphIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">Graphing Calculator</h2>
              </div>
              <p>Plot functions, zoom, and analyze mathematical expressions.</p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/notebook">
              <div className="flex items-center justify-center mb-3">
                <FileIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">Live Notebook</h2>
              </div>
              <p>
                A split-screen markdown editor that renders LaTeX as you type.
              </p>
            </Link>
          </div>
        </PixelCard>
      </div>

      {/* Bottom section with additional info and stars */}
      <div className="mt-16 mb-20 text-center z-10 relative">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-yellow-300">✦</span>
          <p className="text-gray-500 text-sm">
            Built for educators, students, and creative minds
          </p>
          <span className="text-blue-300">✧</span>
        </div>
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
          <span className="flex items-center space-x-1">
            <span className="text-green-400">●</span>
            <span>Real-time collaboration</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-purple-400">●</span>
            <span>LaTeX support</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-cyan-400">●</span>
            <span>Interactive tools</span>
          </span>
        </div>
      </div>
    </main>
  );
}
