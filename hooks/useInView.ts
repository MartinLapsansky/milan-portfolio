"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element the first time it scrolls into view.
 * Mirrors the IntersectionObserver behaviour used by Services / Process so the
 * whole site shares one reveal implementation.
 */
const REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -10% 0px",
};

export default function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallback = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, REVEAL_OPTIONS);

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
