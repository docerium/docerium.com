"use client";

import React, { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import debounce from "lodash.debounce";
import { whiteboardAtom, ExcalidrawElement, AppState } from "@/store";
import "@excalidraw/excalidraw/index.css";
import "@/styles/whiteboard.scss";

const Whiteboard = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

export default function WhiteboardPage() {
  const [whiteboardData, setWhiteboardData] = useAtom(whiteboardAtom);

  const debouncedSetState = useMemo(
    () =>
      debounce(
        (elements: readonly ExcalidrawElement[], appState: AppState) => {
          setWhiteboardData({
            elements,
            appState: {
              theme: appState.theme,
              viewBackgroundColor: appState.viewBackgroundColor,
            },
          });
        },
        250 //milliseconds
      ),
    [setWhiteboardData]
  );

  const handleWhiteboardChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AppState) => {
      debouncedSetState(elements, appState);
    },
    [debouncedSetState]
  );

  return (
    <div className="page custom-styles">
      <Whiteboard
        initialData={whiteboardData}
        onChange={handleWhiteboardChange}
      />
    </div>
  );
}
