import "@/styles/sidebar.scss";
import { ProjectIcon } from "@primer/octicons-react";
import { GraphIcon } from "@primer/octicons-react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <a href="/whiteboard" className="sidebar-icon">
          <ProjectIcon size={56} />
        </a>
        <a href="/graphs" className="sidebar-icon">
          <GraphIcon size={56} />
        </a>
      </div>
    </div>
  );
}
