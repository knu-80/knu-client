import { type RefObject, useEffect, useRef, useState, useCallback } from 'react';
import { animate, useMotionValue } from 'framer-motion';
import { WORLD_WIDTH, WORLD_HEIGHT } from './world';
import { BOOTH_COORDINATES } from './world';

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.5, 2];

const getDistance = (touches: React.TouchList | TouchList) => {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  );
};

export function useMapCamera(containerRef: RefObject<HTMLDivElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(ZOOM_LEVELS[0]);
  const lastTouchDistance = useRef<number | null>(null);

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

  const clampPosition = useCallback(
    (nextScale?: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const currentScale = nextScale ?? scale.get();

      const scaledWidth = WORLD_WIDTH * currentScale;
      const scaledHeight = WORLD_HEIGHT * currentScale;

      const left = Math.min(0, rect.width - scaledWidth);
      const top = Math.min(0, rect.height - scaledHeight);

      const right = 0;
      const bottom = 0;

      const clampedX = Math.min(right, Math.max(left, x.get()));
      const clampedY = Math.min(bottom, Math.max(top, y.get()));

      x.set(clampedX);
      y.set(clampedY);
    },
    [containerRef, scale, x, y],
  );

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
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        lastTouchDistance.current = getDistance(e.touches);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDistance.current !== null) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();

        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

        const currentX = x.get();
        const currentY = y.get();
        const currentScale = scale.get();

        const currentDistance = getDistance(e.touches);
        const zoomFactor = currentDistance / lastTouchDistance.current;
        let nextScale = currentScale * zoomFactor;

        nextScale = Math.max(
          ZOOM_LEVELS[0],
          Math.min(ZOOM_LEVELS[ZOOM_LEVELS.length - 1], nextScale),
        );

        if (nextScale !== currentScale) {
          const scaleRatio = nextScale / currentScale;

          const newX = centerX - (centerX - currentX) * scaleRatio;
          const newY = centerY - (centerY - currentY) * scaleRatio;

          x.set(newX);
          y.set(newY);
          scale.set(nextScale);

          calculateConstraints(nextScale);
        }

        lastTouchDistance.current = currentDistance;
      }
    };
    const handleTouchEnd = () => {
      lastTouchDistance.current = null;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, scale, x, y, calculateConstraints, clampPosition]);

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
