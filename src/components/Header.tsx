"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Fetch star count from GitHub API
        const response = await fetch(
          "https://api.github.com/repos/andrinoff/tme"
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        } else {
          console.error("Failed to fetch GitHub stars");
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <div className="header absolute flex items-center justify-between px-4">
      {stars !== null ? (
        <a
          href="https://github.com/andrinoff/tme"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors duration-300 px-4 py-2 rounded-full"
        >
          {stars} &nbsp;
          <span className="text-sm flex flex-row items-center justify-center gap-2">
            <MarkGithubIcon size={16} /> Stars
          </span>
        </a>
      ) : (
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full animate-pulse">
          <div className="h-4 w-16 bg-gray-400/50 rounded"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
