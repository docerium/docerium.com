import type { Metadata } from "next";
import "../styles/globals.scss";
import "../styles/app.scss";
import "../styles/tailwind.css";
import DockElement from "../components/DockElement";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Teaching Made Easy",
  description: "The all-in-one tool for teaching and learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-gray-900`}>
        <Header />
        <main className="pt-4">{children}</main>
        <DockElement />
      </body>
    </html>
  );
}
