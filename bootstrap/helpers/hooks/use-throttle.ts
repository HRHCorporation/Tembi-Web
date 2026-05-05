"use client";

import { useRef } from "react";

export default function useThrottle<T extends () => unknown>(
  callback: T,
  time: number = 2000,
) {
  const lastRun = useRef<number | null>(null);

  return function () {
    if (lastRun.current && Date.now() - lastRun.current <= time) return;
    lastRun.current = Date.now();
    callback();
  };
}