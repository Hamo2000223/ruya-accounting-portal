"use client";

import { useState } from "react";

type HelpTooltipProps = {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
};

export function HelpTooltip({ content, position = "top" }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition text-xs"
        aria-label="مساعدة"
      >
        ?
      </button>
      {isVisible && (
        <div
          className={`absolute z-50 w-64 px-3 py-2 text-sm text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl ${positionClasses[position]}`}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-zinc-800 border-zinc-700 transform rotate-45 ${
              position === "top"
                ? "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r"
                : position === "bottom"
                  ? "top-[-5px] left-1/2 -translate-x-1/2 border-t border-l"
                  : position === "left"
                    ? "right-[-5px] top-1/2 -translate-y-1/2 border-t border-r"
                    : "left-[-5px] top-1/2 -translate-y-1/2 border-b border-l"
            }`}
          />
        </div>
      )}
    </div>
  );
}
