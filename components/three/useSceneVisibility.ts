"use client";

import { useEffect, useRef, useState } from "react";

export function useSceneVisibility(rootMargin = "300px 0px") {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      setShouldMount(true);
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNearViewport = entry.isIntersecting;
        setIsActive(isNearViewport);
        if (isNearViewport) setShouldMount(true);
      },
      { rootMargin },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { containerRef, shouldMount, isActive };
}
