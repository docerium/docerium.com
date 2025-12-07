"use client";

import React, { useState, useCallback, useMemo } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import * as math from "mathjs";

type OperationMode = "solve" | "differentiate" | "integrate";

interface SolutionResult {
  type: "equation" | "expression";
  mode: OperationMode;
  original: string;
  solutions?: string[];
  factorized?: string;
  derivative?: string;
  integral?: string;
  error?: string;
}

// Convert LaTeX to mathjs-compatible expression
function latexToMathjs(latex: string): string {
  let expr = latex;

  // Remove display math delimiters
  expr = expr.replace(/\$\$/g, "").replace(/\$/g, "");
  expr = expr.replace(/\\left/g, "").replace(/\\right/g, "");

  // Handle fractions: \frac{a}{b} -> (a)/(b)
  while (expr.includes("\\frac")) {
    expr = expr.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))");
    // Handle nested fractions
    expr = expr.replace(
      /\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g,
      "(($1)/($2))",
    );
  }

  // Handle square roots: \sqrt{x} -> sqrt(x)
  expr = expr.replace(/\\sqrt\{([^{}]*)\}/g, "sqrt($1)");

  // Handle nth roots: \sqrt[n]{x} -> nthRoot(x, n)
  expr = expr.replace(/\\sqrt\[([^\]]+)\]\{([^{}]*)\}/g, "nthRoot($2, $1)");

  // Handle powers: x^{n} -> x^(n)
  expr = expr.replace(/\^{([^{}]*)}/g, "^($1)");

  // Handle subscripts (remove them for calculation)
  expr = expr.replace(/_{([^{}]*)}/g, "");

  // Handle common LaTeX commands
  expr = expr.replace(/\\cdot/g, "*");
  expr = expr.replace(/\\times/g, "*");
  expr = expr.replace(/\\div/g, "/");
  expr = expr.replace(/\\pm/g, "+");

  // Handle trigonometric functions
  expr = expr.replace(/\\sin/g, "sin");
  expr = expr.replace(/\\cos/g, "cos");
  expr = expr.replace(/\\tan/g, "tan");
  expr = expr.replace(/\\cot/g, "cot");
  expr = expr.replace(/\\sec/g, "sec");
  expr = expr.replace(/\\csc/g, "csc");
  expr = expr.replace(/\\arcsin/g, "asin");
  expr = expr.replace(/\\arccos/g, "acos");
  expr = expr.replace(/\\arctan/g, "atan");

  // Handle logarithms
  expr = expr.replace(/\\ln/g, "log");
  expr = expr.replace(/\\log/g, "log10");
  expr = expr.replace(/\\exp/g, "exp");

  // Handle constants
  expr = expr.replace(/\\pi/g, "pi");
  expr = expr.replace(/\\e(?![a-zA-Z])/g, "e");
  expr = expr.replace(/\\infty/g, "Infinity");

  // Handle Greek letters (as variables)
  expr = expr.replace(/\\alpha/g, "alpha");
  expr = expr.replace(/\\beta/g, "beta");
  expr = expr.replace(/\\gamma/g, "gamma");
  expr = expr.replace(/\\theta/g, "theta");

  // Clean up spaces and remaining backslashes
  expr = expr.replace(/\\/g, "");
  expr = expr.replace(/\s+/g, "");

  // Handle implicit multiplication: 2x -> 2*x, xy -> x*y
  expr = expr.replace(/(\d)([a-zA-Z])/g, "$1*$2");
  expr = expr.replace(/([a-zA-Z])(\d)/g, "$1*$2");
  expr = expr.replace(/\)(\d)/g, ")*$1");
  expr = expr.replace(/(\d)\(/g, "$1*(");
  expr = expr.replace(/\)\(/g, ")*(");
  expr = expr.replace(/([a-zA-Z])\(/g, "$1*(");
  expr = expr.replace(/\)([a-zA-Z])/g, ")*$1");

  return expr;
}

// Convert mathjs expression back to LaTeX
function mathjsToLatex(expr: string): string {
  let latex = expr;

  // Handle sqrt
  latex = latex.replace(/sqrt\(([^()]*)\)/g, "\\sqrt{$1}");

  // Handle multiplication: remove * between number and variable (3*x -> 3x)
  latex = latex.replace(/(\d)\s*\*\s*([a-zA-Z])/g, "$1$2");
  // Handle multiplication: remove * between variable and variable (x*y -> xy)
  latex = latex.replace(/([a-zA-Z])\s*\*\s*([a-zA-Z])/g, "$1$2");
  // Handle multiplication: remove * between ) and variable
  latex = latex.replace(/\)\s*\*\s*([a-zA-Z])/g, ")$1");
  // Handle multiplication: remove * between number and (
  latex = latex.replace(/(\d)\s*\*\s*\(/g, "$1(");
  // For remaining multiplications (like between two numbers), use \cdot
  latex = latex.replace(/\*/g, " \\cdot ");

  latex = latex.replace(/pi/g, "\\pi");

  return latex;
}

// Find variable in expression
function findVariable(expr: string): string {
  // Exclude common function names and find actual variables
  const cleaned = expr
    .replace(/sqrt|sin|cos|tan|log|exp|abs|pi/gi, "")
    .replace(/[0-9]/g, "");
  const match = cleaned.match(/[a-zA-Z]/);
  return match ? match[0] : "x";
}

// Extract polynomial coefficients from an expression
function extractCoefficients(
  expr: string,
  variable: string,
): { a: number; b: number; c: number } {
  try {
    const node = math.parse(expr);
    const simplified = math.simplify(node);

    // Evaluate at different points to extract coefficients
    // For ax^2 + bx + c:
    // f(0) = c
    // f(1) = a + b + c
    // f(-1) = a - b + c

    const scope: Record<string, number> = {};

    scope[variable] = 0;
    const f0 = simplified.evaluate(scope) as number;

    scope[variable] = 1;
    const f1 = simplified.evaluate(scope) as number;

    scope[variable] = -1;
    const fNeg1 = simplified.evaluate(scope) as number;

    // From these values:
    // c = f(0)
    // a + b + c = f(1)
    // a - b + c = f(-1)
    // Therefore:
    // a = (f(1) + f(-1) - 2c) / 2
    // b = f(1) - c - a

    const c = f0;
    const a = (f1 + fNeg1 - 2 * c) / 2;
    const b = f1 - c - a;

    return { a, b, c };
  } catch {
    return { a: 0, b: 0, c: 0 };
  }
}

// Solve equation using coefficient extraction
function solvePolynomial(
  left: string,
  right: string,
  variable: string,
): string[] {
  try {
    // Move everything to the left side: left - right = 0
    const combined = `(${left}) - (${right})`;
    const { a, b, c } = extractCoefficients(combined, variable);

    // Check if it's actually quadratic
    if (Math.abs(a) < 1e-10) {
      // Linear equation: bx + c = 0
      if (Math.abs(b) < 1e-10) {
        // No variable term
        if (Math.abs(c) < 1e-10) {
          return ["All values of " + variable];
        }
        return ["No solution"];
      }
      const solution = -c / b;
      return [formatNumber(solution)];
    }

    // Quadratic equation: ax^2 + bx + c = 0
    const discriminant = b * b - 4 * a * c;

    if (discriminant < -1e-10) {
      // Complex solutions
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      return [
        `${formatNumber(realPart)} + ${formatNumber(imagPart)}i`,
        `${formatNumber(realPart)} - ${formatNumber(imagPart)}i`,
      ];
    } else if (Math.abs(discriminant) < 1e-10) {
      // One real solution (repeated root)
      const x = -b / (2 * a);
      return [formatNumber(x)];
    } else {
      // Two real solutions
      const sqrtDisc = Math.sqrt(discriminant);
      const x1 = (-b + sqrtDisc) / (2 * a);
      const x2 = (-b - sqrtDisc) / (2 * a);
      return [formatNumber(x1), formatNumber(x2)];
    }
  } catch {
    return [];
  }
}

// Format number for display
function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Check if it's a nice square root
  const squared = num * num;
  if (
    Number.isInteger(Math.round(squared)) &&
    Math.abs(squared - Math.round(squared)) < 1e-10
  ) {
    const root = Math.round(squared);
    if (num > 0) {
      return `\\sqrt{${root}}`;
    } else {
      return `-\\sqrt{${root}}`;
    }
  }
  // Otherwise format with reasonable precision
  const formatted = num.toFixed(6).replace(/\.?0+$/, "");
  return formatted;
}

// Helper to format coefficient with proper simplification
function formatCoefficient(numerator: number, denominator: number): string {
  // Simplify the fraction
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const divisor = gcd(Math.round(numerator), Math.round(denominator));
  const num = Math.round(numerator) / divisor;
  const den = Math.round(denominator) / divisor;

  if (den === 1) {
    if (num === 1) return "";
    if (num === -1) return "-";
    return `${num}`;
  }

  return `\\frac{${num}}{${den}}`;
}

// Compute symbolic integral (basic implementation)
function computeIntegral(expr: string, variable: string): string {
  try {
    const node = math.parse(expr);
    const simplified = math.simplify(node);
    const str = simplified.toString();

    // Try to handle common cases symbolically
    // This is a basic implementation - mathjs doesn't have built-in symbolic integration

    // Check for polynomial terms
    // Handle: constant
    if (!str.includes(variable)) {
      const constVal = parseFloat(str);
      if (!isNaN(constVal) && constVal === 1) {
        return `${variable} + C`;
      }
      return `${str} ${variable} + C`;
    }

    // Handle: x^n -> x^(n+1)/(n+1)
    const powerMatch = str.match(
      new RegExp(`^${variable}\\s*\\^\\s*\\(?(-?\\d+\\.?\\d*)\\)?$`),
    );
    if (powerMatch) {
      const n = parseFloat(powerMatch[1]);
      if (n === -1) {
        return `\\ln|${variable}| + C`;
      }
      const newPower = n + 1;
      const coefStr = formatCoefficient(1, newPower);
      if (coefStr === "") {
        return `${variable}^{${newPower}} + C`;
      } else if (coefStr === "-") {
        return `-${variable}^{${newPower}} + C`;
      }
      return `${coefStr} ${variable}^{${newPower}} + C`;
    }

    // Handle: just x -> x^2/2
    if (str === variable) {
      return `\\frac{1}{2} ${variable}^{2} + C`;
    }

    // Handle: coefficient * x
    const coeffMatch = str.match(
      new RegExp(`^(-?\\d+\\.?\\d*)\\s*\\*?\\s*${variable}$`),
    );
    if (coeffMatch) {
      const coef = parseFloat(coeffMatch[1]);
      const coefStr = formatCoefficient(coef, 2);
      if (coefStr === "") {
        return `${variable}^{2} + C`;
      } else if (coefStr === "-") {
        return `-${variable}^{2} + C`;
      }
      return `${coefStr} ${variable}^{2} + C`;
    }

    // Handle: coefficient * x^n
    const coeffPowerMatch = str.match(
      new RegExp(
        `^(-?\\d+\\.?\\d*)\\s*\\*?\\s*${variable}\\s*\\^\\s*\\(?(-?\\d+\\.?\\d*)\\)?$`,
      ),
    );
    if (coeffPowerMatch) {
      const coef = parseFloat(coeffPowerMatch[1]);
      const n = parseFloat(coeffPowerMatch[2]);
      if (n === -1) {
        if (coef === 1) {
          return `\\ln|${variable}| + C`;
        } else if (coef === -1) {
          return `-\\ln|${variable}| + C`;
        }
        return `${coef} \\ln|${variable}| + C`;
      }
      const newPower = n + 1;
      const coefStr = formatCoefficient(coef, newPower);
      if (coefStr === "") {
        return `${variable}^{${newPower}} + C`;
      } else if (coefStr === "-") {
        return `-${variable}^{${newPower}} + C`;
      }
      return `${coefStr} ${variable}^{${newPower}} + C`;
    }

    // Handle sin(x) -> -cos(x)
    if (str === `sin(${variable})`) {
      return `-\\cos(${variable}) + C`;
    }

    // Handle cos(x) -> sin(x)
    if (str === `cos(${variable})`) {
      return `\\sin(${variable}) + C`;
    }

    // Handle e^x -> e^x
    if (str === `exp(${variable})` || str === `e^${variable}`) {
      return `e^{${variable}} + C`;
    }

    // Handle 1/x -> ln|x|
    if (str === `1 / ${variable}` || str === `${variable}^(-1)`) {
      return `\\ln|${variable}| + C`;
    }

    // For polynomials, try term by term integration
    try {
      // Try to expand and integrate term by term
      const expanded = math.simplify(node, { exactFractions: true });
      const terms = expanded.toString().split(/(?=[+-])/);

      if (terms.length > 1) {
        const integratedTerms = terms.map((term) => {
          const trimmed = term.trim();
          if (!trimmed) return "";
          return computeIntegral(trimmed, variable).replace(/ \+ C$/, "");
        });
        return (
          integratedTerms
            .filter((t) => t)
            .join(" + ")
            .replace(/\+ -/g, "- ") + " + C"
        );
      }
    } catch {
      // Fall through to default
    }

    // Default: return integral notation
    return `\\int ${mathjsToLatex(str)} \\, d${variable}`;
  } catch {
    return `\\int ${mathjsToLatex(expr)} \\, d${variable}`;
  }
}

// Factorize a polynomial expression
function factorizeExpression(expr: string, variable: string): string {
  try {
    const node = math.parse(expr);
    const simplified = math.simplify(node);

    // Extract coefficients for quadratic: ax^2 + bx + c
    const { a, b, c } = extractCoefficients(expr, variable);

    // Check if it's a quadratic that can be factored
    if (Math.abs(a) > 1e-10) {
      const discriminant = b * b - 4 * a * c;

      if (discriminant >= 0) {
        const sqrtDisc = Math.sqrt(discriminant);
        const r1 = (-b + sqrtDisc) / (2 * a);
        const r2 = (-b - sqrtDisc) / (2 * a);

        // Check if roots are nice integers or simple fractions
        const isNiceNumber = (n: number): boolean => {
          if (Number.isInteger(n)) return true;
          // Check for simple fractions like 1/2, 1/3, etc.
          for (let d = 2; d <= 10; d++) {
            if (Math.abs(n * d - Math.round(n * d)) < 1e-10) return true;
          }
          return false;
        };

        if (isNiceNumber(r1) && isNiceNumber(r2)) {
          // Format the factors
          const formatFactor = (r: number): string => {
            if (r === 0) return variable;
            if (r > 0) return `(${variable} - ${formatNumberClean(r)})`;
            return `(${variable} + ${formatNumberClean(-r)})`;
          };

          let result = "";
          if (Math.abs(a - 1) > 1e-10 && Math.abs(a + 1) > 1e-10) {
            result = `${formatNumberClean(a)} `;
          } else if (Math.abs(a + 1) < 1e-10) {
            result = "-";
          }

          if (Math.abs(r1 - r2) < 1e-10) {
            // Repeated root
            result += `${formatFactor(r1)}^{2}`;
          } else {
            result += `${formatFactor(r1)} ${formatFactor(r2)}`;
          }

          return result;
        }
      }

      // Check for difference of squares: a*x^2 - c where c > 0
      if (Math.abs(b) < 1e-10 && c < 0) {
        const sqrtC = Math.sqrt(-c / a);
        if (
          Number.isInteger(sqrtC) ||
          Math.abs(sqrtC - Math.round(sqrtC)) < 1e-10
        ) {
          const sqrtCClean = Math.round(sqrtC);
          if (Math.abs(a - 1) < 1e-10) {
            return `(${variable} + ${sqrtCClean})(${variable} - ${sqrtCClean})`;
          }
        }
        // For non-integer sqrt, show with sqrt symbol
        if (Math.abs(a - 1) < 1e-10 && Number.isInteger(-c)) {
          return `(${variable} + \\sqrt{${Math.round(-c)}})(${variable} - \\sqrt{${Math.round(-c)}})`;
        }
      }
    }

    // Fallback: return simplified form
    return mathjsToLatex(simplified.toString());
  } catch {
    return mathjsToLatex(expr);
  }
}

// Format number without trailing zeros
function formatNumberClean(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Check for simple fractions
  for (let d = 2; d <= 10; d++) {
    const n = num * d;
    if (Math.abs(n - Math.round(n)) < 1e-10) {
      return `\\frac{${Math.round(n)}}{${d}}`;
    }
  }
  return num.toFixed(4).replace(/\.?0+$/, "");
}

// Main solving function
function solveEquation(latex: string, mode: OperationMode): SolutionResult {
  try {
    const mathjsExpr = latexToMathjs(latex);
    const isEquation = mathjsExpr.includes("=") && mode === "solve";
    const variable = findVariable(mathjsExpr);

    // Handle differentiation mode
    if (mode === "differentiate") {
      // If it's an equation, convert to expression by moving everything to the left side
      let exprToUse: string;
      if (mathjsExpr.includes("=")) {
        const parts = mathjsExpr.split("=");
        const left = parts[0];
        const right = parts.slice(1).join("=");
        exprToUse = `(${left}) - (${right})`;
      } else {
        exprToUse = mathjsExpr;
      }

      let derivativeResult: string;
      try {
        const node = math.parse(exprToUse);
        const simplified = math.simplify(node);
        const deriv = math.derivative(simplified, variable);
        derivativeResult = mathjsToLatex(math.simplify(deriv).toString());
      } catch {
        derivativeResult = "Cannot compute derivative";
      }

      return {
        type: "expression",
        mode: "differentiate",
        original: latex,
        derivative: derivativeResult,
      };
    }

    // Handle integration mode
    if (mode === "integrate") {
      // If it's an equation, convert to expression by moving everything to the left side
      let exprToUse: string;
      if (mathjsExpr.includes("=")) {
        const parts = mathjsExpr.split("=");
        const left = parts[0];
        const right = parts.slice(1).join("=");
        exprToUse = `(${left}) - (${right})`;
      } else {
        exprToUse = mathjsExpr;
      }

      let integralResult: string;

      try {
        const simplified = math.simplify(math.parse(exprToUse)).toString();
        integralResult = computeIntegral(simplified, variable);
      } catch {
        integralResult = `\\int ${mathjsToLatex(exprToUse)} \\, d${variable}`;
      }

      return {
        type: "expression",
        mode: "integrate",
        original: latex,
        integral: integralResult,
      };
    }

    // Solve mode
    if (isEquation) {
      // It's an equation - solve it
      const parts = mathjsExpr.split("=");
      const left = parts[0];
      const right = parts.slice(1).join("=");

      const solutions = solvePolynomial(left, right, variable);

      return {
        type: "equation",
        mode: "solve",
        original: latex,
        solutions: solutions.length > 0 ? solutions : ["No solution found"],
      };
    } else {
      // It's an expression - factorize it
      const variable = findVariable(mathjsExpr);
      const factorized = factorizeExpression(mathjsExpr, variable);

      return {
        type: "expression",
        mode: "solve",
        original: latex,
        factorized: factorized,
      };
    }
  } catch (error) {
    return {
      type: "expression",
      mode,
      original: latex,
      error: `Error processing expression: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export default function EquationSolver() {
  const [latexInput, setLatexInput] = useState<string>("");
  const [result, setResult] = useState<SolutionResult | null>(null);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [mode, setMode] = useState<OperationMode>("solve");

  const handleSolve = useCallback(() => {
    if (latexInput.trim()) {
      const solution = solveEquation(latexInput, mode);
      setResult(solution);
    }
  }, [latexInput, mode]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSolve();
      }
    },
    [handleSolve],
  );

  const insertSymbol = useCallback((symbol: string) => {
    setLatexInput((prev) => prev + symbol);
  }, []);

  const previewLatex = useMemo(() => {
    if (!latexInput.trim()) return null;
    try {
      return <BlockMath math={latexInput} />;
    } catch {
      return <span className="text-red-400">Invalid LaTeX</span>;
    }
  }, [latexInput]);

  const mathKeyboard = [
    { label: "x", tex: "x" },
    { label: "y", tex: "y" },
    { label: "=", tex: "=" },
    { label: "+", tex: "+" },
    { label: "-", tex: "-" },
    { label: "×", tex: "\\times" },
    { label: "÷", tex: "\\div" },
    { label: "(", tex: "(" },
    { label: ")", tex: ")" },
    { label: "x²", tex: "^{2}" },
    { label: "xⁿ", tex: "^{}" },
    { label: "√", tex: "\\sqrt{}" },
    { label: "a/b", tex: "\\frac{}{}" },
    { label: "π", tex: "\\pi" },
    { label: "±", tex: "\\pm" },
    { label: "sin", tex: "\\sin(" },
    { label: "cos", tex: "\\cos(" },
    { label: "ln", tex: "\\ln(" },
    { label: "eˣ", tex: "e^{}" },
  ];

  const getButtonLabel = () => {
    switch (mode) {
      case "differentiate":
        return "Differentiate";
      case "integrate":
        return "Integrate";
      case "solve":
      default:
        return latexInput.includes("=")
          ? "Solve Equation"
          : "Factorize Expression";
    }
  };

  return (
    <div className="equation-solver w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Equation Solver
        </h1>
        <p className="text-gray-400">
          Solve equations, factorize, differentiate, or integrate expressions
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-800/50 rounded-xl p-1 border border-gray-700/50">
          <button
            onClick={() => setMode("solve")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "solve"
                ? "bg-teal-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Solve
          </button>
          <button
            onClick={() => setMode("differentiate")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "differentiate"
                ? "bg-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            d/dx
          </button>
          <button
            onClick={() => setMode("integrate")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "integrate"
                ? "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ∫ dx
          </button>
        </div>
      </div>

      {/* LaTeX Preview */}
      <div className="mb-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 min-h-[60px] flex items-center justify-center">
        <div className="text-lg text-white text-center overflow-x-auto">
          {latexInput.trim() ? (
            previewLatex
          ) : (
            <span className="text-gray-600">
              Your equation will appear here
            </span>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <div className="relative">
          <textarea
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              mode === "differentiate"
                ? "Enter expression to differentiate (e.g., x^{3} + 2x)"
                : mode === "integrate"
                  ? "Enter expression to integrate (e.g., x^{2} + 3x)"
                  : "Enter equation or expression (e.g., x^{2} + 5x + 6 = 0)"
            }
            className="w-full p-4 pr-24 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none font-mono"
            rows={3}
          />
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white bg-gray-700/50 rounded-lg transition-colors"
            title="Toggle Math Keyboard"
          >
            ∑
          </button>
        </div>

        {/* Math Keyboard */}
        {showKeyboard && (
          <div className="mt-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {mathKeyboard.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => insertSymbol(btn.tex)}
                  className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-white transition-colors text-sm font-medium"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Solve Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleSolve}
          disabled={!latexInput.trim()}
          className={`px-8 py-3 font-semibold rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
            mode === "differentiate"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              : mode === "integrate"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]"
          } text-white`}
        >
          {getButtonLabel()}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {result.error ? (
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <p className="text-red-400">{result.error}</p>
            </div>
          ) : result.type === "equation" ? (
            <>
              {/* Solutions */}
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                <h3 className="text-lg font-semibold text-green-400 mb-4">
                  Solutions
                </h3>
                <div className="space-y-3">
                  {result.solutions?.map((solution, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-white text-xl"
                    >
                      <span className="text-gray-500">
                        {findVariable(result.original)} =
                      </span>
                      <span className="font-mono">
                        <InlineMath math={solution} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Factorized - only for solve mode */}
              {result.factorized && result.mode === "solve" && (
                <div className="p-6 bg-teal-500/10 border border-teal-500/30 rounded-2xl">
                  <h3 className="text-lg font-semibold text-teal-400 mb-3">
                    Factorization
                  </h3>
                  <div className="text-white text-xl text-center">
                    <BlockMath math={result.factorized} />
                  </div>
                </div>
              )}

              {/* Derivative */}
              {result.derivative && (
                <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">
                    {result.mode === "differentiate"
                      ? "Derivative"
                      : "Derivative"}
                  </h3>
                  <div className="text-white text-xl text-center">
                    <BlockMath
                      math={`\\frac{d}{d${findVariable(result.original)}} = ${result.derivative}`}
                    />
                  </div>
                </div>
              )}

              {/* Integral */}
              {result.integral && (
                <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Integral
                  </h3>
                  <div className="text-white text-xl text-center">
                    <BlockMath math={result.integral} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Examples */}
      <div className="mt-12 p-6 bg-gray-800/20 rounded-2xl border border-gray-700/30">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Quadratic Equation", tex: "x^{2} + 5x + 6 = 0" },
            { label: "Linear Equation", tex: "2x + 3 = 7" },
            { label: "Factorize", tex: "x^{2} - 4" },
            { label: "Polynomial", tex: "x^{3} - 3x^{2} + 2x" },
            { label: "Trigonometric", tex: "\\sin(x) + \\cos(x)" },
            { label: "Exponential", tex: "e^{x} + x^{2}" },
          ].map((example, idx) => (
            <button
              key={idx}
              onClick={() => setLatexInput(example.tex)}
              className="flex items-center justify-between p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text
-left transition-colors group"
            >
              <div>
                <p className="text-sm text-gray-500">{example.label}</p>
                <p className="text-white font-mono text-sm">{example.tex}</p>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
