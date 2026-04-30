/** Scroll-linked phase within section [0, 1]: entering viewport → exiting. */
export function sectionViewportProgress(rect: DOMRect): number {
  const vh = typeof window !== "undefined" ? window.innerHeight || 1 : 1;
  const denom = Math.max(1e-6, vh + rect.height);
  const raw = (vh - rect.top) / denom;
  return Math.min(1, Math.max(0, raw));
}

/** Idle until raw ≥ enterAt, ramps to complete by exitAt (both in [0,1]). */
export function windowProgress(raw: number, enterAt: number, exitAt: number): number {
  if (exitAt <= enterAt + 1e-6) return raw >= exitAt ? 1 : 0;
  return Math.min(1, Math.max(0, (raw - enterAt) / (exitAt - enterAt)));
}

/** Map global section progress to this index’s slice [0, 1]. */
export function sliceProgress(global: number, index: number, total: number): number {
  if (total <= 0) return 0;
  const start = index / total;
  const end = (index + 1) / total;
  const span = Math.max(1e-6, end - start);
  return Math.min(1, Math.max(0, (global - start) / span));
}

/**
 * Slice-local progress that ramps shortly after the slice starts and completes before the slice ends.
 * leadIn / leadOut are fractions of that slice’s span (e.g. 0.2 = use middle 60% for the ramp).
 */
export function sliceProgressSnappy(
  global: number,
  index: number,
  total: number,
  leadIn = 0.16,
  leadOut = 0.28,
): number {
  if (total <= 0) return 0;
  const sliceStart = index / total;
  const sliceEnd = (index + 1) / total;
  const span = sliceEnd - sliceStart;
  const rampStart = sliceStart + span * leadIn;
  const rampEnd = sliceEnd - span * leadOut;
  if (rampEnd <= rampStart + 1e-6) return sliceProgress(global, index, total);
  return Math.min(1, Math.max(0, (global - rampStart) / (rampEnd - rampStart)));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / Math.max(1e-6, edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
