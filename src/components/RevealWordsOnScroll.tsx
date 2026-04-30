"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { smoothstep } from "@/lib/scrollProgress";
import styles from "./RevealWordsOnScroll.module.css";

type Tone = "green" | "dark";

/** Viewport-relative scroll band: progress 0→1 as section moves through view. */
export type RevealTiming = "default" | "fast" | "late";

const PRESETS: Record<
  RevealTiming,
  { start: number; end: number; speed: number }
> = {
  /** Baseline home / About-style timing */
  default: { start: 0.89, end: 0.34, speed: 1 },
  /** Completes sooner along the scroll path (titles: Everything… / The Work We Do) */
  fast: { start: 0.89, end: 0.34, speed: 2.15 },
  /** Starts later in the scroll (needs section higher before words ramp) */
  late: { start: 0.58, end: 0.14, speed: 1 },
};

type RevealWordsOnScrollProps = {
  text: string;
  className?: string;
  as?: ElementType;
  tone?: Tone;
  revealTiming?: RevealTiming;
  /** Fires once when every word has lit (scroll reveal complete). */
  onRevealComplete?: () => void;
  /** Rendered below the title; fades in by scroll using the same word-reveal progress. */
  afterReveal?: ReactNode;
  /** When fraction of words lit reaches this [0–1], below content begins fading in. Default 0.45 */
  afterRevealFadeStart?: number;
  /** Fraction at which fade reaches full opacity. Default 0.88 */
  afterRevealFadeEnd?: number;
  classNameAfterReveal?: string;
  "aria-label"?: string;
};

/** Scroll-linked progressive word reveal using viewport-relative progress. */
export default function RevealWordsOnScroll({
  text,
  className = "",
  as: Tag = "h2",
  tone = "dark",
  revealTiming = "default",
  onRevealComplete,
  afterReveal,
  afterRevealFadeStart = 0.45,
  afterRevealFadeEnd = 0.88,
  classNameAfterReveal = "",
  "aria-label": ariaLabel,
}: RevealWordsOnScrollProps) {
  const headingRef = useRef<HTMLElement | null>(null);
  const [litCount, setLitCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const revealCompleteFired = useRef(false);

  const lines = text.split("\n").map((line) =>
    line.split(/\s+/).filter(Boolean),
  );
  const flatWords = lines.flat();

  useEffect(() => {
    const container = headingRef.current?.closest("section");
    if (!container || flatWords.length === 0) return;

    const { start: startFrac, end: endFrac, speed } = PRESETS[revealTiming];

    const revealWordsForScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = Math.max(0.001, (startFrac - endFrac) * vh);
      let raw = (startFrac * vh - rect.top) / span;
      raw = Math.min(1, Math.max(0, raw));
      raw = Math.min(1, raw * speed);

      const activeWords = Math.round(raw * flatWords.length);
      setLitCount(activeWords);
    };

    revealWordsForScroll();
    window.addEventListener("scroll", revealWordsForScroll, { passive: true });
    window.addEventListener("resize", revealWordsForScroll);
    return () => {
      window.removeEventListener("scroll", revealWordsForScroll);
      window.removeEventListener("resize", revealWordsForScroll);
    };
  }, [flatWords.length, revealTiming]);

  useEffect(() => {
    if (!onRevealComplete || flatWords.length === 0) return;
    if (litCount >= flatWords.length && !revealCompleteFired.current) {
      revealCompleteFired.current = true;
      onRevealComplete();
    }
  }, [litCount, flatWords.length, onRevealComplete]);

  useEffect(() => {
    revealCompleteFired.current = false;
  }, [text, revealTiming]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toneClass = tone === "green" ? styles.toneGreen : styles.toneDark;

  const revealRatio = flatWords.length
    ? Math.min(1, litCount / flatWords.length)
    : 1;

  let afterOpacity = smoothstep(afterRevealFadeStart, afterRevealFadeEnd, revealRatio);
  let afterDy = (1 - afterOpacity) * 12;
  if (reducedMotion) {
    afterOpacity = 1;
    afterDy = 0;
  }

  let wordIndex = 0;

  return (
    <>
      <Tag
        ref={headingRef as never}
        className={`${toneClass} ${className}`.trim()}
        aria-label={ariaLabel}
      >
        <span className={styles.wordsWrap}>
          {lines.map((lineWords, lineIdx) => (
            <Fragment key={`line-${lineIdx}`}>
              {lineIdx > 0 ? <br /> : null}
              {lineWords.map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={`${word}-${idx}`}
                    className={`${styles.word} ${idx < litCount ? styles.wordActive : ""}`}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </Fragment>
          ))}
        </span>
      </Tag>
      {afterReveal != null ? (
        <div
          className={`${styles.afterReveal} ${classNameAfterReveal}`.trim()}
          style={{
            opacity: afterOpacity,
            transform: `translateY(${afterDy}px)`,
          }}
        >
          {afterReveal}
        </div>
      ) : null}
    </>
  );
}
