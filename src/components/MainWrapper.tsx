"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // For notebook, graphs, and whiteboard, don't add padding
  const isFullPageApp =
    pathname === "/notebook" ||
    pathname === "/graphs" ||
    pathname === "/whiteboard";

  return <main className={isFullPageApp ? "" : "pt-4"}>{children}</main>;
}
