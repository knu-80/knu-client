import { type RefObject, useEffect, useRef, useState, useCallback } from 'react';
import { animate, useMotionValue } from 'framer-motion';
import { WORLD_WIDTH, WORLD_HEIGHT } from './world';
import { BOOTH_COORDINATES } from './world';

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.5, 2];

export function useMapCamera(containerRef: RefObject<HTMLDivElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(ZOOM_LEVELS[0]);

  const [constraints, setConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const levelRef = useRef(0);
  const constraintsRef = useRef({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const lastZoomTime = useRef(0);
  const isInitialized = useRef(false);

  const calculateConstraints = useCallback(
    (currentScale: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scaledWidth = WORLD_WIDTH * currentScale;
      const scaledHeight = WORLD_HEIGHT * currentScale;

      const left = Math.min(0, rect.width - scaledWidth);
      const top = Math.min(0, rect.height - scaledHeight);

      const next = { left, right: 0, top, bottom: 0 };

      constraintsRef.current = next;
      setConstraints(next);
    },
    [containerRef],
  );

  const clampPosition = useCallback(() => {
    const { left, right, top, bottom } = constraintsRef.current;

    const clampedX = Math.min(right, Math.max(left, x.get()));
    const clampedY = Math.min(bottom, Math.max(top, y.get()));

    x.set(clampedX);
    y.set(clampedY);
  }, [x, y]);

  const moveToBooth = useCallback(
    (id: number) => {
      const container = containerRef.current;
      const coords = BOOTH_COORDINATES[id];

      if (!container || !coords) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const currentScale = scale.get();

      const targetX = rect.width / 2 - coords.x * currentScale;
      const targetY = rect.height / 2 - coords.y * currentScale;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        restDelta: 0.5,
      });

      animate(y, targetY, {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        restDelta: 0.5,
        onComplete: () => {
          clampPosition();
        },
      });
    },
    [containerRef, scale, x, y, clampPosition],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInitialized.current) return;

    const rect = container.getBoundingClientRect();
    const initialScale = scale.get();

    const initialX = (rect.width - WORLD_WIDTH * initialScale) / 2;
    const initialY = rect.height - WORLD_HEIGHT * initialScale;

    x.set(initialX);
    y.set(initialY);

    calculateConstraints(initialScale);
    isInitialized.current = true;
  }, [containerRef, calculateConstraints, scale, x, y]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      calculateConstraints(scale.get());
      clampPosition();
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, calculateConstraints, clampPosition, scale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastZoomTime.current < 50) return;

      let nextLevel = levelRef.current;

      if (e.deltaY < 0) nextLevel = Math.min(levelRef.current + 1, ZOOM_LEVELS.length - 1);
      else if (e.deltaY > 0) nextLevel = Math.max(levelRef.current - 1, 0);

      if (nextLevel === levelRef.current) return;

      const rect = container.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;

      const prevScale = scale.get();
      const nextScale = ZOOM_LEVELS[nextLevel];
      const ratio = nextScale / prevScale;

      scale.set(nextScale);

      x.set((x.get() - centerX) * ratio + centerX);
      y.set((y.get() - centerY) * ratio + centerY);

      calculateConstraints(nextScale);
      clampPosition();

      levelRef.current = nextLevel;
      lastZoomTime.current = now;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [containerRef, calculateConstraints, clampPosition, scale, x, y]);

  return {
    x,
    y,
    scale,
    constraints,
    clampPosition,
    moveToBooth,
  };
}
