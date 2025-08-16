import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Notebook",
  description:
    "Real-time markdown editor with LaTeX support for creating mathematical notes and documentation.",
};

export default function NotebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
