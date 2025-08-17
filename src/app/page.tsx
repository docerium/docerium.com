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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative pb-24">
      {/* Background stars - hidden on mobile, visible on larger screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
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

      <div className="text-center mb-8 sm:mb-12 z-10 relative px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Docerium
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto">
          An all-in-one web application for teaching and learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center z-10 relative w-full max-w-6xl px-4">
        <PixelCard variant="blue" className="mx-auto">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
            <Link href="/whiteboard" className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
                <ProjectIcon size={24} className="sm:mr-3 mb-2 sm:mb-0" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Interactive Whiteboard
                </h2>
              </div>
              <p className="text-sm sm:text-base">
                Sketch ideas, draw diagrams, and collaborate in real-time.
              </p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard variant="blue" className="mx-auto">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
            <Link href="/graphs" className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
                <GraphIcon size={24} className="sm:mr-3 mb-2 sm:mb-0" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Graphing Calculator
                </h2>
              </div>
              <p className="text-sm sm:text-base">
                Plot functions, zoom, and analyze mathematical expressions.
              </p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard
          variant="blue"
          className="mx-auto md:col-span-2 lg:col-span-1"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
            <Link href="/notebook" className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
                <FileIcon size={24} className="sm:mr-3 mb-2 sm:mb-0" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Live Notebook
                </h2>
              </div>
              <p className="text-sm sm:text-base">
                A split-screen markdown editor that renders LaTeX as you type.
              </p>
            </Link>
          </div>
        </PixelCard>
      </div>

      {/* Bottom section with additional info and stars */}
      <div className="mt-12 sm:mt-16 mb-20 sm:mb-24 text-center z-10 relative px-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-yellow-300 hidden sm:inline">✦</span>
          <p className="text-gray-500 text-xs sm:text-sm">
            Built for educators, students, and creative minds
          </p>
          <span className="text-blue-300 hidden sm:inline">✧</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-600">
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
