import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import "../styles/app.scss";
import DockElement from "@/components/DockElement";
import { MarkGithubIcon } from "@primer/octicons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teaching Made Easy",
  description: "An ultimate tool for teaching and learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          integrity="sha384-sN/J2HsdG2IA23C2bUUN9gscS/bWGFp9+cNl3v4hmi2D+p9glK3Y0f2zTAJdY2ED"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="text-center text-gray-500 header">
          <p>
            Teaching Made Easy is open-source! Star the project on{" "}
            <a
              href="https://github.com/andrinoff/tme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <MarkGithubIcon size={16} className="inline-block" /> GitHub
            </a>
            .
          </p>
        </div>
        <div className="layout">
          {children}
          <DockElement />
        </div>
      </body>
    </html>
  );
}
