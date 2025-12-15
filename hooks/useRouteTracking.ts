"use client";

import { useEffect, useState } from "react";

export function useRouteTracking(
  route: [number, number][],
  interval = 3000
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (route.length === 0) return;

    setCurrentIndex(0);

    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= route.length - 1) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(id);
  }, [route, interval]);

  return {
    completedPath: route.slice(0, currentIndex + 1),
    activeSegment: route.slice(currentIndex, currentIndex + 2),
    currentPosition: route[currentIndex] ?? null,
  };
}
