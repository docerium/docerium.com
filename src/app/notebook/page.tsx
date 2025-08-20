"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { notebookAtom } from "@/store";
import katex from "katex";
import "katex/dist/katex.min.css";
import "@/styles/notebook.scss";
import MathKeyboard from "@/components/MathKeyboard";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log("NotebookPage rendered, content length:", content.length); // Debug log

  const handleMathInsert = (mathText: string) => {
    console.log("Inserting math text:", mathText); // Debug log
    const textarea = textareaRef.current;
    if (!textarea) {
      console.log("No textarea ref found"); // Debug log
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newContent;
    let cursorPosition;

    if (mathText.includes("\n")) {
      // For display math with newlines, add proper spacing
      const needsNewlineBefore =
        beforeText.length > 0 && !beforeText.endsWith("\n");
      const prefix = needsNewlineBefore ? "\n" : "";
      newContent = beforeText + prefix + mathText + "\n" + afterText;
      cursorPosition = start + prefix.length + mathText.length - 3; // Position inside the $$
    } else {
      // For inline math, insert directly
      newContent = beforeText + mathText + afterText;
      // Position cursor between the \( and \) for easy editing
      cursorPosition = start + mathText.length - 2;
    }

    setContent(newContent);

    // Focus and set cursor position after insertion
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 10); // Slightly longer timeout to ensure state update
  };

  useEffect(() => {
    const html = document.documentElement;

    const apply = (enabled: boolean) => {
      html.classList.toggle("notebook--preview-only", enabled);
    };

    // URL param fallback
    const params = new URLSearchParams(window.location.search);
    const forced =
      params.get("preview") === "1" || params.get("stream") === "right";
    if (forced) apply(true);

    // Experimental Chromium capture detection
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const docAny = document as any;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        // Variant A: document.hasCapture + capturestatechange
        if (typeof docAny.hasCapture === "boolean") {
          const updateA = () => {
            if (!forced) apply(!!docAny.hasCapture);
          };
          updateA();
          docAny.addEventListener?.("capturestatechange", updateA);
          cleanup = () =>
            docAny.removeEventListener?.("capturestatechange", updateA);
          return;
        }

        // Variant B: document.getCaptureState() + capturestatechange
        if (typeof docAny.getCaptureState === "function") {
          const updateB = async () => {
            try {
              const state = await docAny.getCaptureState(); // { active, displaySurface? }
              const isBrowserTab =
                !!state?.active && state?.displaySurface === "browser";
              if (!forced) apply(isBrowserTab);
            } catch {
              // ignore
            }
          };
          await updateB();
          const handler = () => {
            void updateB();
          };
          docAny.addEventListener?.("capturestatechange", handler);
          cleanup = () =>
            docAny.removeEventListener?.("capturestatechange", handler);
          return;
        }
      } catch {
        // ignore
      }
    };

    void setup();

    return () => {
      cleanup?.();
      html.classList.remove("notebook--preview-only");
    };
  }, []);

  const renderedContent = useMemo(() => parseContent(content), [content]);

  return (
    <div className="notebook-container">
      <div className="editor-pane">
        <div className="editor-wrapper">
          <MathKeyboard onInsert={handleMathInsert} />
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="editor-textarea"
            placeholder="Start typing your markdown here..."
          />
        </div>
      </div>
      <div
        className="preview-pane"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  );
}
