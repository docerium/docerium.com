import type { Metadata } from "next";
import EquationSolver from "../../components/EquationSolver";

export const metadata: Metadata = {
  title: "Equation Solver",
  description:
    "Solve equations and factorize expressions with LaTeX input. Perfect for math students and educators.",
  keywords: [
    "equation solver",
    "factorization",
    "LaTeX",
    "math solver",
    "algebra",
    "quadratic equations",
    "linear equations",
  ],
};

export default function EquationSolverPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[200px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating math symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] text-6xl opacity-20 animate-bounce">
          =
        </div>
        <div
          className="absolute top-[30%] right-[15%] text-5xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          x²
        </div>
        <div
          className="absolute bottom-[30%] left-[20%] text-4xl opacity-20 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          ±
        </div>
        <div
          className="absolute bottom-[25%] right-[10%] text-5xl opacity-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          √
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 pt-16 pb-32">
        <EquationSolver />
      </main>

      {/* Spacer for dock */}
      <div className="h-24" />
    </div>
  );
}
