import Link from "next/link";
import { ProjectIcon, GraphIcon, FileIcon } from "@primer/octicons-react";
import PixelCard from "@/components/PixelCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 page">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">Teaching Made Easy</h1>
        <p className="text-lg text-gray-600">
          An all-in-one web application for teaching and learning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/whiteboard">
              <div className="flex items-center justify-center mb-3">
                <ProjectIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">
                  Interactive Whiteboard
                </h2>
              </div>
              <p>Sketch ideas, draw diagrams, and collaborate in real-time.</p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/graphs">
              <div className="flex items-center justify-center mb-3">
                <GraphIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">Graphing Calculator</h2>
              </div>
              <p>Plot functions, zoom, and analyze mathematical expressions.</p>
            </Link>
          </div>
        </PixelCard>

        <PixelCard variant="blue">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <Link href="/notebook">
              <div className="flex items-center justify-center mb-3">
                <FileIcon size={32} className="mr-3" />
                <h2 className="text-2xl font-semibold">Live Notebook</h2>
              </div>
              <p>
                A split-screen markdown editor that renders LaTeX as you type.
              </p>
            </Link>
          </div>
        </PixelCard>
      </div>
    </main>
  );
}
