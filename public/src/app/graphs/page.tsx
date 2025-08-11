"use client";

import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { functionsAtom, plotColorsAtom } from "@/store";
import Script from "next/script";
import "@/styles/graphs.scss";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Desmos: any;
  }
}

export default function DesmosGraphPage(): React.JSX.Element {
  const [functions, setFunctions] = useAtom(functionsAtom);
  const [PLOT_COLORS] = useAtom(plotColorsAtom);
  const calculatorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);

  const addFunction = (): void =>
    setFunctions((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map((f) => f.id)) + 1 : 1,
        expression: "",
        error: null,
      },
    ]);

  const removeFunction = (id: number): void =>
    setFunctions((prev) =>
      prev
        .filter((f) => f.id !== id)
        .map((f, index) => ({ ...f, id: index + 1 }))
    );

  const updateFunctionExpression = (id: number, newExpression: string): void =>
    setFunctions((prev) =>
      prev.map((f) => (f.id === id ? { ...f, expression: newExpression } : f))
    );

  useEffect(() => {
    if (window.Desmos && calculatorRef.current && !graphRef.current) {
      graphRef.current = window.Desmos.GraphingCalculator(
        calculatorRef.current,
        {
          keypad: true,
          expressions: false,
          settingsMenu: false,
          invertedColors: true, // Enable dark mode
        }
      );
    }

    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (graphRef.current) {
      const allExpressions = functions.map((func, index) => ({
        id: `func-${func.id}`,
        latex: func.expression,
        color: PLOT_COLORS[index % PLOT_COLORS.length],
      }));
      graphRef.current.setExpressions(allExpressions);
    }
  }, [functions, PLOT_COLORS]);

  return (
    <div className="page">
      <Script
        src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
        strategy="afterInteractive"
        onLoad={() => {
          if (calculatorRef.current && !graphRef.current) {
            graphRef.current = window.Desmos.GraphingCalculator(
              calculatorRef.current,
              {
                keypad: true,
                expressions: false,
                settingsMenu: false,
                invertedColors: true, // Enable dark mode
              }
            );
          }
        }}
      />
      <div className="graph-container">
        <div className="floating-controls">
          {functions.map((func, index) => (
            <div
              key={func.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.75rem",
                gap: "10px",
              }}
            >
              <span
                style={{
                  color: PLOT_COLORS[index % PLOT_COLORS.length],
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                ƒ({func.id})=
              </span>
              <input
                type="text"
                value={func.expression}
                onChange={(e) =>
                  updateFunctionExpression(func.id, e.target.value)
                }
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: `1px solid #ccc`,
                  borderRadius: "4px",
                }}
              />
              <button
                onClick={() => removeFunction(func.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addFunction}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              border: "none",
              background: "#5cb85c",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Add Function
          </button>
        </div>

        <div ref={calculatorRef} className="desmos-calculator"></div>
      </div>
    </div>
  );
}
