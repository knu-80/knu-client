import { useState, useEffect } from 'react';
import { WORLD_WIDTH, WORLD_HEIGHT } from './world';

export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.5, 2];

export function useMapCamera(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [level, setLevel] = useState(0);
  const [scale, setScale] = useState(ZOOM_LEVELS[level]);
  const [constraints, setConstraints] = useState<
    { left: number; right: number; top: number; bottom: number } | false
  >(false);

  useEffect(() => {
    setScale(ZOOM_LEVELS[level]);
  }, [level]);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateConstraints = () => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const scaledWidth = WORLD_WIDTH * scale;
      const scaledHeight = WORLD_HEIGHT * scale;

      const left = Math.min(0, containerRect.width - scaledWidth);
      const top = Math.min(0, containerRect.height - scaledHeight);

      setConstraints({ left, right: 0, top, bottom: 0 });
    };

    calculateConstraints();
    const observer = new ResizeObserver(calculateConstraints);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, scale]);

  const zoomIn = () => setLevel((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));

  const zoomOut = () => setLevel((prev) => Math.max(prev - 1, 0));
  return { scale, level, zoomIn, zoomOut, constraints, setLevel };
}
