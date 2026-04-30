"use client";

import { useEffect, useRef, useState } from "react";
import { sectionViewportProgress } from "@/lib/scrollProgress";

/** Progress [0,1] while section travels through viewport (enter bottom → exit top). */
export function useSectionScrollProgress(enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const tick = () => {
      raf = 0;
      if (!el.isConnected) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      setProgress(sectionViewportProgress(el.getBoundingClientRect()));
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => schedule();
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", onMq);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return { ref, progress };
}
