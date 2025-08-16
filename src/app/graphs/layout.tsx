import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphing Calculator",
  description:
    "Interactive graphing calculator for plotting mathematical functions and expressions with real-time visualization.",
};

export default function GraphsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
