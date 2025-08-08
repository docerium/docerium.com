import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { AppState } from "@excalidraw/excalidraw/types";

export type { ExcalidrawElement, AppState };

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

export type WhiteboardData = {
  elements: readonly ExcalidrawElement[];
  appState: Partial<AppState>;
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
const INITIAL_WHITEBOARD_DATA: WhiteboardData = {
  elements: [],
  appState: { theme: "dark", isLoading: false },
};

const INITIAL_NOTEBOOK_CONTENT =
  "# Notebook\n\nThis is a notebook for your notes and equations.\n\n" +
  "You can write **LaTeX** equations like this:\n" +
  "$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$\n\n" +
  "And inline equations like \\( E = mc^2 \\).";

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

export const whiteboardAtom = atomWithStorage<WhiteboardData>(
  "whiteboardData",
  INITIAL_WHITEBOARD_DATA
);

export const notebookAtom = atomWithStorage<string>(
  "notebookContent",
  INITIAL_NOTEBOOK_CONTENT
);
