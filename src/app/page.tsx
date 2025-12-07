"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[200px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] text-6xl opacity-20 animate-bounce">
            ∫
          </div>
          <div
            className="absolute top-[30%] right-[15%] text-5xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            π
          </div>
          <div
            className="absolute bottom-[30%] left-[20%] text-4xl opacity-20 animate-bounce"
            style={{ animationDelay: "2s" }}
          >
            Σ
          </div>
          <div
            className="absolute bottom-[25%] right-[10%] text-5xl opacity-20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            √
          </div>
          <div
            className="absolute top-[15%] left-[40%] text-3xl opacity-15 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          >
            ∞
          </div>
          <div
            className="absolute bottom-[40%] right-[30%] text-4xl opacity-15 animate-pulse"
            style={{ animationDelay: "2.5s" }}
          >
            Δ
          </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
              ✨ Free & Open Source
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
              Teaching Made
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Easier
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Whiteboards, graphs, and notebooks — all in one elegant platform
            designed for educators who care about presentation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/whiteboard"
              className="group relative px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10">Start Creating</span>
            </Link>
            <a
              href="https://github.com/docerium/docerium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 text-white/80 hover:text-white font-medium rounded-2xl border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <MarkGithubIcon size={20} />
              <span>View Source</span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Privacy-first</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Four tools, infinite possibilities
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Everything you need to create engaging educational content
            </p>
          </div>

          {/* Tool cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Whiteboard */}
            <Link
              href="/whiteboard"
              className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500/20 text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  ✏️
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Whiteboard
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  An infinite canvas for freehand drawing, diagrams, and visual
                  explanations. Powered by Excalidraw.
                </p>
                <span className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                  Open Whiteboard
                  <span className="text-lg">→</span>
                </span>
              </div>
            </Link>

            {/* Graphs */}
            <Link
              href="/graphs"
              className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500/20 text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Graphs
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Plot mathematical functions with real-time rendering. Perfect
                  for teaching calculus, algebra, and more.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                  Open Graphs
                  <span className="text-lg">→</span>
                </span>
              </div>
            </Link>

            {/* Notebook */}
            <Link
              href="/notebook"
              className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500/20 text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  📝
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Notebook
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Rich text editing with full LaTeX support. Write beautiful
                  notes, equations, and documentation.
                </p>
                <span className="inline-flex items-center gap-2 text-orange-400 font-medium group-hover:gap-3 transition-all">
                  Open Notebook
                  <span className="text-lg">→</span>
                </span>
              </div>
            </Link>

            {/* Equation Solver */}
            <Link
              href="/equation-solver"
              className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/10 hover:border-teal-500/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-teal-500/20 text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  🧮
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Equation Solver
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Solve equations and factorize expressions with LaTeX input.
                  Perfect for algebra and calculus problems.
                </p>
                <span className="inline-flex items-center gap-2 text-teal-400 font-medium group-hover:gap-3 transition-all">
                  Open Solver
                  <span className="text-lg">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why educators love Docerium
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Instant Access
              </h3>
              <p className="text-gray-400 leading-relaxed">
                No downloads, no installations, no accounts. Just open your
                browser and start teaching.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Data, Your Device
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Everything stays in your browser. No servers, no tracking, no
                data collection. Ever.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Beautifully Designed
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Clean, modern interfaces that make your content shine. Teaching
                should look as good as it feels.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Works Everywhere
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Desktop, tablet, or phone — Docerium adapts seamlessly to any
                screen size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / Use cases */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">
            Perfect for
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Math Teachers",
              "University Professors",
              "Online Tutors",
              "Science Educators",
              "Homeschooling",
              "Study Groups",
              "Research",
              "Presentations",
            ].map((item) => (
              <span
                key={item}
                className="px-5 py-2.5 text-sm text-gray-300 bg-white/5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
            Start teaching
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Easier Today
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Choose a tool from the dock below to get started.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Docerium
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500 text-sm">MIT License</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a
                href="https://github.com/docerium/docerium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://github.com/docerium/docerium.com/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contribute
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Made with care for educators everywhere
            </p>
          </div>
        </div>
      </footer>

      {/* Spacer for dock */}
      <div className="h-24" />
    </div>
  );
}
