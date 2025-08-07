import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type FunctionState = {
  id: number;
  expression: string;
  color: string;
  error: string | null;
};

export type ZoomDomain = {
  x: [number, number];
  y: [number, number];
};

const PLOT_COLORS = [
  "#0077b6",
  "#d9534f",
  "#5cb85c",
  "#f0ad4e",
  "#5bc0de",
  "#337ab7",
];
const INITIAL_DOMAIN: ZoomDomain = { x: [-10, 10], y: [-10, 10] };

export const functionsAtom = atomWithStorage<FunctionState[]>("functions", [
  { id: 1, expression: "sin(x) * x", color: PLOT_COLORS[0], error: null },
  { id: 2, expression: "cos(x) * 5", color: PLOT_COLORS[1], error: null },
]);

export const zoomDomainAtom = atomWithStorage<ZoomDomain>(
  "zoomDomain",
  INITIAL_DOMAIN
);

export const plotColorsAtom = atom(() => PLOT_COLORS);

export const initialDomainAtom = atom(() => INITIAL_DOMAIN);
