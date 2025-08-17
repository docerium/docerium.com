"use client";

import React, { useMemo } from "react";
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
