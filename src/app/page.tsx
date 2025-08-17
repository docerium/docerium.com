import { ProjectIcon, StarIcon, ZapIcon } from "@primer/octicons-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Docerium - the all-in-one educational platform for interactive teaching and learning.",
};

export default function Home() {
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative snap-start">
          {/* Animated background elements */}
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
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light mb-6 sm:mb-8 text-white tracking-wide">
              Docerium
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              The ultimate educational toolkit that transforms how you teach,
              learn, and collaborate
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 sm:mb-16">
              <span className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm sm:text-lg">
                Interactive Learning
              </span>
              <span className="px-3 py-2 sm:px-6 sm:py-3 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm sm:text-lg">
                Real-time Collaboration
              </span>
              <span className="px-3 py-2 sm:px-6 sm:py-3 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm sm:text-lg">
                Mathematical Excellence
              </span>
            </div>
          </div>
        </section>

        {/* Why Choose Docerium Section */}
        <section className="h-screen flex items-center justify-center snap-start bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light mb-10 sm:mb-20 text-white">
              Why Educators Choose Docerium
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <ZapIcon
                    size={32}
                    className="sm:w-12 sm:h-12 text-yellow-400"
                  />
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-white">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
                  No installation required. Access all tools instantly through
                  your web browser with blazing-fast performance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-8 bg-blue-400/20 rounded-full flex items-center justify-center">
                  <StarIcon
                    size={32}
                    className="sm:w-12 sm:h-12 text-blue-400"
                  />
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-white">
                  Always Free
                </h3>
                <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
                  Built for the education community. All features are completely
                  free and always will be.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                  <ProjectIcon
                    size={32}
                    className="sm:w-12 sm:h-12 text-purple-400"
                  />
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-white">
                  Open Source
                </h3>
                <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
                  Transparent, secure, and community-driven. Contribute to the
                  future of educational technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="h-screen flex items-center justify-center snap-start bg-gradient-to-br from-gray-900 to-gray-800 py-8 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light text-center mb-6 sm:mb-12 lg:mb-20 text-white">
              Perfect For Every Learning Environment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-h-[60vh] overflow-hidden">
              <div className="p-3 sm:p-6 lg:p-8 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-400/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-base sm:text-xl lg:text-2xl">🏫</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-blue-400">
                  Classrooms
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Interactive lessons, real-time problem solving, and
                  collaborative learning experiences.
                </p>
              </div>

              <div className="p-3 sm:p-6 lg:p-8 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-400/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-base sm:text-xl lg:text-2xl">💻</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-purple-400">
                  Remote Learning
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Maintain engagement and interactivity in virtual classrooms
                  and online courses.
                </p>
              </div>

              <div className="p-3 sm:p-6 lg:p-8 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-400/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-base sm:text-xl lg:text-2xl">🔬</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-green-400">
                  Research
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Document findings, create mathematical proofs, and visualize
                  complex data.
                </p>
              </div>

              <div className="hidden p-3 md:block sm:p-6 lg:p-8 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-yellow-400/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-base sm:text-xl lg:text-2xl">📚</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-yellow-400">
                  Personal Study
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Take notes, solve problems, and explore mathematical concepts
                  at your own pace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="h-screen flex items-center justify-center snap-start bg-gradient-to-br from-gray-800 to-black pb-20 sm:pb-24">
          <div className="max-w-5xl mx-auto text-center px-4 h-full flex flex-col justify-center">
            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-light mb-4 sm:mb-8 text-white">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
              Join educators worldwide who are already using Docerium to create
              more engaging and interactive learning experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></span>
                <span className="text-gray-300 text-sm sm:text-lg">
                  No registration required
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></span>
                <span className="text-gray-300 text-sm sm:text-lg">
                  Works on all devices
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></span>
                <span className="text-gray-300 text-sm sm:text-lg">
                  Always up-to-date
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
              © 2025 Docerium. Open source and free forever.
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Call to Action above dock */}
      <div className="fixed bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center justify-center h-14 sm:h-17 px-4 bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl transition-all duration-300">
          <span className="text-white text-xs sm:text-sm font-medium">
            👇 Click any button on the dock below to start
          </span>
        </div>
      </div>
    </>
  );
}
