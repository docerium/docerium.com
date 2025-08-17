"use client";

import { MarkGithubIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";

const GitHubStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Fetch star count from GitHub API
        const response = await fetch(
          "https://api.github.com/repos/docerium/docerium.com"
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
    <div className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-50">
      {stars !== null ? (
        <a
          href="https://github.com/docerium/docerium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-lg hover:shadow-xl text-xs sm:text-sm text-gray-300 hover:text-white"
        >
          <MarkGithubIcon
            size={12}
            className="sm:w-[14px] sm:h-[14px] transition-transform group-hover:scale-110"
          />
          <span className="font-medium">{stars}</span>
          <span className="text-xs opacity-80 group-hover:opacity-100">★</span>
        </a>
      ) : (
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-gray-600/50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full animate-pulse">
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-gray-500/50 rounded-full"></div>
          <div className="h-2.5 w-6 sm:h-3 sm:w-8 bg-gray-500/50 rounded"></div>
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-gray-500/50 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default GitHubStars;
