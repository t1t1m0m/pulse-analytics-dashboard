import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface LivePulseState {
  /** Streams happening "right now" — nudged on every tick. */
  streamsNow: number;
  /** True on the tick where the value just changed (drives the flash animation). */
  beat: boolean;
}

interface Options {
  /** Baseline value the ticker orbits around. */
  base?: number;
  /** Update cadence in ms. */
  intervalMs?: number;
}

/**
 * Simulates a live-updating "streams right now" counter.
 * Respects prefers-reduced-motion: when the user opts out of motion we settle on
 * the baseline and stop the interval entirely (no ticking, no flashing).
 */
export function useLivePulse({ base = 18420, intervalMs = 2000 }: Options = {}): LivePulseState {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<LivePulseState>({ streamsNow: base, beat: false });
  const beatTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setState({ streamsNow: base, beat: false });
      return;
    }

    const id = window.setInterval(() => {
      setState((prev) => {
        // Gentle drift: bias back toward the baseline so it never runs away.
        const pull = (base - prev.streamsNow) * 0.08;
        const jitter = (Math.random() - 0.5) * 260;
        const next = Math.round(prev.streamsNow + pull + jitter);
        return { streamsNow: next, beat: true };
      });

      if (beatTimeout.current) window.clearTimeout(beatTimeout.current);
      beatTimeout.current = window.setTimeout(() => {
        setState((prev) => ({ ...prev, beat: false }));
      }, 420);
    }, intervalMs);

    return () => {
      window.clearInterval(id);
      if (beatTimeout.current) window.clearTimeout(beatTimeout.current);
    };
  }, [base, intervalMs, reducedMotion]);

  return state;
}
