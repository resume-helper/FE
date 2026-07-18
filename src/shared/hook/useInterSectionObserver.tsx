"use client";

import { useEffect, useRef, useState } from "react";

interface INTER_SECTION_OBSERVER {
  threshold?: number;
}

export const useInterSectionObserver = <HTML extends HTMLElement>({
  threshold,
}: INTER_SECTION_OBSERVER) => {
  const ref = useRef<HTML>(null);

  const [isView, SetIsView] = useState<boolean>(false);

  const [isReady, SetIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!ref["current"]) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // SetIsView(!entry.isIntersecting);
        SetIsReady(true);
        SetIsView(entry.isIntersecting);
      },
      {
        threshold: threshold ?? 0,
      }
    );

    observer.observe(ref["current"]);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isView, isReady };
};
