"use client";

import React, { useMemo, useCallback } from "react";
import { useAtom } from "jotai";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import * as Victory from "victory";
import * as math from "mathjs";
import "@/styles/graphs.scss";
import {
  functionsAtom,
  zoomDomainAtom,
  plotColorsAtom,
  initialDomainAtom,
  FunctionState,
} from "@/store"; // Import atoms from the store

// --- Type Definitions ---
type Point = {
  x: number;
  y: number;
};

type PlotData = FunctionState & {
  data: Point[];
};

// --- Constants ---
const DATA_GENERATION_DOMAIN = { min: -100, max: 100 };
const DATA_POINT_COUNT = 800;

const VictoryZoomVoronoiContainer = Victory.createContainer("zoom", "voronoi");

export default function FinalWorkingPlotter(): React.JSX.Element {
  const [functions, setFunctions] = useAtom(functionsAtom);
  const [zoomDomain, setZoomDomain] = useAtom(zoomDomainAtom);
  const [PLOT_COLORS] = useAtom(plotColorsAtom);
  const [INITIAL_DOMAIN] = useAtom(initialDomainAtom);

  const addFunction = (): void =>
    setFunctions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        expression: "",
        color: PLOT_COLORS[prev.length % PLOT_COLORS.length],
        error: null,
      },
    ]);

  const removeFunction = (id: number): void =>
    setFunctions((prev) => prev.filter((f) => f.id !== id));

  const updateFunctionExpression = (id: number, newExpression: string): void =>
    setFunctions((prev) =>
      prev.map((f) => (f.id === id ? { ...f, expression: newExpression } : f))
    );

  const plotData = useMemo<PlotData[]>(() => {
    return functions.map((func) => {
      if (!func.expression) return { ...func, data: [], error: null };
      try {
        const code = math.parse(func.expression).compile();
        const { min, max } = DATA_GENERATION_DOMAIN;
        const step = (max - min) / DATA_POINT_COUNT;
        const points: Point[] = [];
        for (let x = min; x <= max; x += step) {
          const y = code.evaluate({ x });
          if (Number.isFinite(y)) points.push({ x, y });
        }
        return { ...func, data: points, error: null };
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        return { ...func, data: [], error: errorMessage };
      }
    });
  }, [functions]);

  const handleZoom = useCallback(
    (domain: {
      x: [number, number] | [Date, Date];
      y: [number, number] | [Date, Date];
    }) => {
      if (
        Array.isArray(domain.x) &&
        typeof domain.x[0] === "number" &&
        typeof domain.x[1] === "number" &&
        Array.isArray(domain.y) &&
        typeof domain.y[0] === "number" &&
        typeof domain.y[1] === "number"
      ) {
        setZoomDomain({
          x: [domain.x[0], domain.x[1]],
          y: [domain.y[0], domain.y[1]],
        });
      }
    },
    [setZoomDomain]
  );

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "2rem",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <div
        style={{
          marginBottom: "1.5rem",
          border: "1px solid #eee",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {functions.map((func) => (
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
                color: func.color,
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
                border: `1px solid ${
                  plotData.find((p) => p.id === func.id)?.error ? "red" : "#ccc"
                }`,
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
        {plotData.map(
          (p) =>
            p.error && (
              <p
                key={`err-${p.id}`}
                style={{ color: "red", margin: "0 0 0.5rem 55px" }}
              >
                Error: {p.error}
              </p>
            )
        )}
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

      <div
        style={{
          border: `1px solid #ccc`,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          height={450}
          width={800}
          containerComponent={
            <VictoryZoomVoronoiContainer
              responsive={false}
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
              labels={({ datum }) =>
                `(${datum.x.toFixed(2)}, ${datum.y.toFixed(2)})`
              }
              labelComponent={
                <VictoryTooltip
                  cornerRadius={5}
                  flyoutStyle={{ fill: "white", stroke: "#ccc" }}
                  style={{ fontSize: 10 }}
                />
              }
            />
          }
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />

          {plotData.map(
            (plot) =>
              plot.data.length > 0 && (
                <VictoryLine
                  key={plot.id}
                  data={plot.data}
                  style={{ data: { stroke: plot.color, strokeWidth: 2 } }}
                />
              )
          )}
        </VictoryChart>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={() => setZoomDomain(INITIAL_DOMAIN)}
          className="reset-view-button"
        >
          Reset View
        </button>
        <p style={{ fontSize: "0.8rem", color: "#666" }}></p>
      </div>
    </div>
  );
}
