"use client";

import React, { useMemo, useEffect } from "react";
import { useAtom } from "jotai";
import { notebookAtom } from "@/store";
import katex from "katex";
import "katex/dist/katex.min.css";
import "@/styles/notebook.scss";

const parseContent = (text: string) => {
  const lines = text.split("\n");

  const parsedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      return "<br />";
    }

    const processInlineElements = (str: string) => {
      let processed = str.replace(/\\\((.+?)\\\)/g, (match, equation) => {
        try {
          return katex.renderToString(equation, {
            throwOnError: false,
            displayMode: false,
          });
        } catch (error) {
          console.error("KaTeX error:", error);
          return `<span class="katex-error">${(error as Error).message}</span>`;
        }
      });
      processed = processed.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      return processed;
    };

    if (trimmedLine.startsWith("$$") && trimmedLine.endsWith("$$")) {
      const equation = trimmedLine.slice(2, -2);
      try {
        return katex.renderToString(equation, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (error) {
        console.error("KaTeX error:", error);
        return `<p><span class="katex-error">${
          (error as Error).message
        }</span></p>`;
      }
    }

    const matchH3 = line.match(/^\s*###\s+(.*)/);
    if (matchH3) {
      return `<h3 class = "text-xl">${processInlineElements(matchH3[1])}</h3>`;
    }
    const matchH2 = line.match(/^\s*##\s+(.*)/);
    if (matchH2) {
      return `<h2 class = "text-xl"><strong>${processInlineElements(
        matchH2[1]
      )}</strong></h2>`;
    }
    const matchH1 = line.match(/^\s*#\s+(.*)/);
    if (matchH1) {
      return `<h1 class="text-2xl"><strong>${processInlineElements(
        matchH1[1]
      )}</strong></h1>`;
    }

    return `<p>${processInlineElements(line)}</p>`;
  });

  return parsedLines.join("");
};

export default function NotebookPage() {
  const [content, setContent] = useAtom(notebookAtom);

  const renderedContent = useMemo(() => parseContent(content), [content]);

  useEffect(() => {
    const PREVIEW_CLASS = "notebook--preview-only";
    
    // Function to set preview-only mode
    const setPreviewMode = (enabled: boolean) => {
      if (enabled) {
        document.documentElement.classList.add(PREVIEW_CLASS);
      } else {
        document.documentElement.classList.remove(PREVIEW_CLASS);
      }
    };

    // Check URL params for manual override
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('preview') === '1' || urlParams.get('stream') === 'right';
    };

    // Check Chromium capture state (experimental API)
    const checkCaptureState = async () => {
      try {
        // Feature detection for experimental APIs
        if (typeof document !== 'undefined' && 'getCaptureState' in document && typeof (document as unknown as { getCaptureState?: () => Promise<{ displaySurface?: string }> }).getCaptureState === 'function') {
          const state = await (document as unknown as { getCaptureState: () => Promise<{ displaySurface?: string }> }).getCaptureState();
          return state && state.displaySurface === 'browser';
        }
        // Alternative check for hasCapture property
        if (typeof document !== 'undefined' && 'hasCapture' in document) {
          return !!(document as unknown as { hasCapture?: boolean }).hasCapture;
        }
      } catch (error) {
        // Silently fail for non-supporting browsers
        console.debug('Capture state detection not supported:', error);
      }
      return false;
    };

    // Update preview mode based on URL params and capture state
    const updatePreviewMode = async () => {
      const isManualOverride = checkUrlParams();
      if (isManualOverride) {
        setPreviewMode(true);
        return;
      }

      const isCaptured = await checkCaptureState();
      setPreviewMode(isCaptured);
    };

    // Initial check
    updatePreviewMode();

    // Listen for capture state changes (experimental API)
    const handleCaptureStateChange = () => {
      updatePreviewMode();
    };

    // Add event listener for capture state changes if available
    if (typeof document !== 'undefined' && document.addEventListener) {
      try {
        document.addEventListener('capturestatechange', handleCaptureStateChange);
      } catch (error) {
        // Silently fail for non-supporting browsers
        console.debug('capturestatechange event not supported:', error);
      }
    }

    // Cleanup function
    return () => {
      // Remove the class on unmount
      document.documentElement.classList.remove(PREVIEW_CLASS);
      
      // Remove event listener
      if (typeof document !== 'undefined' && document.removeEventListener) {
        try {
          document.removeEventListener('capturestatechange', handleCaptureStateChange);
        } catch (error) {
          // Silently fail
          console.debug('Failed to remove capturestatechange listener:', error);
        }
      }
    };
  }, []);

  return (
    <div className="notebook-container">
      <div className="editor-pane">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="editor-textarea"
          placeholder="Start typing your markdown here..."
        />
      </div>
      <div
        className="preview-pane"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  );
}
