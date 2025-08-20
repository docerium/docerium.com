"use client";

import React, { useState, useRef } from "react";

interface MathKeyboardProps {
  onInsert: (text: string) => void;
  className?: string;
}

interface MathButton {
  label: string;
  tex: string;
  category: string;
}

const mathButtons: MathButton[] = [
  { label: "±", tex: "\\pm", category: "operators" },
  { label: "×", tex: "\\times", category: "operators" },
  { label: "÷", tex: "\\div", category: "operators" },
  { label: "≠", tex: "\\neq", category: "operators" },
  { label: "≤", tex: "\\leq", category: "operators" },
  { label: "≥", tex: "\\geq", category: "operators" },
  { label: "≈", tex: "\\approx", category: "operators" },
  { label: "∞", tex: "\\infty", category: "operators" },

  { label: "x²", tex: "^{2}", category: "powers" },
  { label: "x³", tex: "^{3}", category: "powers" },
  { label: "xⁿ", tex: "^{n}", category: "powers" },
  { label: "x₁", tex: "_{1}", category: "powers" },
  { label: "a/b", tex: "\\frac{a}{b}", category: "powers" },
  { label: "√", tex: "\\sqrt{}", category: "powers" },
  { label: "ⁿ√", tex: "\\sqrt[n]{}", category: "powers" },

  { label: "α", tex: "\\alpha", category: "greek" },
  { label: "β", tex: "\\beta", category: "greek" },
  { label: "γ", tex: "\\gamma", category: "greek" },
  { label: "δ", tex: "\\delta", category: "greek" },
  { label: "ε", tex: "\\epsilon", category: "greek" },
  { label: "θ", tex: "\\theta", category: "greek" },
  { label: "λ", tex: "\\lambda", category: "greek" },
  { label: "μ", tex: "\\mu", category: "greek" },
  { label: "π", tex: "\\pi", category: "greek" },
  { label: "σ", tex: "\\sigma", category: "greek" },
  { label: "τ", tex: "\\tau", category: "greek" },
  { label: "φ", tex: "\\phi", category: "greek" },
  { label: "Ω", tex: "\\Omega", category: "greek" },

  { label: "sin", tex: "\\sin{}", category: "functions" },
  { label: "sin²", tex: "\\sin^2{}", category: "functions" },
  { label: "cos", tex: "\\cos{}", category: "functions" },
  { label: "cos²", tex: "\\cos^2{}", category: "functions" },
  { label: "tan", tex: "\\tan{}", category: "functions" },
  { label: "tan²", tex: "\\tan^2{}", category: "functions" },
  { label: "log", tex: "\\log{}", category: "functions" },
  { label: "ln", tex: "\\ln{}", category: "functions" },
  { label: "exp", tex: "\\exp{}", category: "functions" },
  { label: "lim", tex: "\\lim_{x \\to }", category: "functions" },

  { label: "∫", tex: "\\int{}", category: "calculus" },
  { label: "∮", tex: "\\oint{}", category: "calculus" },
  { label: "∂", tex: "\\partial{}", category: "calculus" },
  { label: "∇", tex: "\\nabla{}", category: "calculus" },
  { label: "d/dx", tex: "\\frac{d}{dx}", category: "calculus" },

  { label: "∈", tex: "\\in{}", category: "sets" },
  { label: "∉", tex: "\\notin{}", category: "sets" },
  { label: "⊂", tex: "\\subset{}", category: "sets" },
  { label: "⊆", tex: "\\subseteq{}", category: "sets" },
  { label: "∪", tex: "\\cup{}", category: "sets" },
  { label: "∩", tex: "\\cap{}", category: "sets" },
  { label: "∅", tex: "\\emptyset{}", category: "sets" },
  { label: "∀", tex: "\\forall{}", category: "sets" },
  { label: "∃", tex: "\\exists{}", category: "sets" },

  { label: "→", tex: "\\to{}", category: "arrows" },
  { label: "←", tex: "\\leftarrow{}", category: "arrows" },
  { label: "↔", tex: "\\leftrightarrow{}", category: "arrows" },
  { label: "⇒", tex: "\\Rightarrow{}", category: "arrows" },
  { label: "⇔", tex: "\\Leftrightarrow{}", category: "arrows" },

  {
    label: "Matrix",
    tex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
    category: "matrix",
  },
  {
    label: "Vector",
    tex: "\\begin{pmatrix} x \\\\ y \\end{pmatrix}",
    category: "matrix",
  },
  {
    label: "Det",
    tex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}",
    category: "matrix",
  },
];

const categories = [
  { id: "operators", name: "Operators", icon: "±" },
  { id: "powers", name: "Powers", icon: "x²" },
  { id: "greek", name: "Greek", icon: "π" },
  { id: "functions", name: "Functions", icon: "sin" },
  { id: "calculus", name: "Calculus", icon: "∫" },
  { id: "sets", name: "Sets", icon: "∈" },
  { id: "arrows", name: "Arrows", icon: "→" },
  { id: "matrix", name: "Matrix", icon: "[ ]" },
];

export default function MathKeyboard({
  onInsert,
  className = "",
}: MathKeyboardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("operators");
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleInsert = (tex: string) => {
    const simpleSymbols = [
      "\\pm",
      "\\times",
      "\\div",
      "\\neq",
      "\\leq",
      "\\geq",
      "\\approx",
      "\\infty",
      "\\alpha",
      "\\beta",
      "\\gamma",
      "\\delta",
      "\\epsilon",
      "\\theta",
      "\\lambda",
      "\\mu",
      "\\pi",
      "\\sigma",
      "\\tau",
      "\\phi",
      "\\Omega",
      "\\in",
      "\\notin",
      "\\subset",
      "\\subseteq",
      "\\cup",
      "\\cap",
      "\\emptyset",
      "\\forall",
      "\\exists",
      "\\to",
      "\\leftarrow",
      "\\leftrightarrow",
      "\\Rightarrow",
      "\\Leftrightarrow",
      "\\partial",
      "\\nabla",
    ];

    const isSimpleSymbol = simpleSymbols.includes(tex);

    if (tex.includes("{}") && !isSimpleSymbol) {
      onInsert(`CURSOR_INSIDE:${tex}`);
    } else if (tex.includes("\\begin{")) {
      onInsert(`$$\n${tex}\n$$`);
    } else {
      onInsert(`CURSOR_END:${tex}`);
    }
  };

  const filteredButtons = mathButtons.filter(
    (button) => button.category === activeCategory
  );

  return (
    <div className={`math-keyboard ${className}`} ref={keyboardRef}>
      {/* Toggle Button */}
      <button
        className="math-keyboard-toggle"
        onClick={() => {
          console.log("Toggle button clicked, current state:", isExpanded); // Debug log
          setIsExpanded(!isExpanded);
        }}
        title="Mathematical Keyboard"
      >
        <span className="math-keyboard-icon">∑</span>
        <span className="chevron">{isExpanded ? "▼" : "▲"}</span>
      </button>

      {/* Keyboard Panel */}
      {isExpanded && (
        <div className="math-keyboard-panel">
          {/* Category Tabs */}
          <div className="math-keyboard-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
                title={category.name}
              >
                {category.icon}
              </button>
            ))}
          </div>

          {/* Buttons Grid */}
          <div className="math-keyboard-grid">
            {filteredButtons.map((button, index) => (
              <button
                key={`${button.category}-${index}`}
                className="math-button"
                onClick={() => {
                  console.log(
                    "Button clicked:",
                    button.label,
                    "tex:",
                    button.tex
                  ); // Debug log
                  handleInsert(button.tex);
                  setIsExpanded(false);
                }}
                title={`Insert ${button.tex}`}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="math-keyboard-actions">
            <button
              className="action-button"
              onClick={() => onInsert("\\(\\)")}
              title="Inline Math"
            >
              Inline Math
            </button>
            <button
              className="action-button"
              onClick={() => onInsert("$$\n\n$$")}
              title="Display Math"
            >
              Display Math
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
