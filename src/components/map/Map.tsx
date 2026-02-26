import { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';
import { WORLD_WIDTH, WORLD_HEIGHT, BUILDING_LABELS, BOOTH_COORDINATES } from './world';
import { MapBackground } from './MapBackground';
import { useMapCamera, ZOOM_LEVELS } from './useMapCamera';
import { BoothMarker } from './BoothMarker';

const DEFAULT_BOOTH: BoothDetail = {
  booth_number: 0,
  name: '',
  division: 'ACADEMIC_DIVISION',
  is_active: false,
};

export function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { scale: scaleState, constraints, level, setLevel } = useMapCamera(containerRef);
  const scale = useMotionValue(scaleState);

  const levelRef = useRef(level);
  const lastZoomTime = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    levelRef.current = level;
    scale.set(ZOOM_LEVELS[level]);
  }, [level, scale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInitialized.current) return;

    const containerRect = container.getBoundingClientRect();
    const initialX = (containerRect.width - WORLD_WIDTH * scaleState) / 2;
    const initialY = containerRect.height - WORLD_HEIGHT * scaleState;
    x.set(initialX);
    y.set(initialY);
    isInitialized.current = true;
  }, [x, y, scaleState]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastZoomTime.current < 50) return;

      const rect = container.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;

      let nextLevel = levelRef.current;
      if (e.deltaY < 0) nextLevel = Math.min(levelRef.current + 1, ZOOM_LEVELS.length - 1);
      else if (e.deltaY > 0) nextLevel = Math.max(levelRef.current - 1, 0);

      if (nextLevel === levelRef.current) return;

      const prevScale = ZOOM_LEVELS[levelRef.current];
      const nextScale = ZOOM_LEVELS[nextLevel];
      const ratio = nextScale / prevScale;

      scale.set(nextScale);
      x.set((x.get() - centerX) * ratio + centerX);
      y.set((y.get() - centerY) * ratio + centerY);

      levelRef.current = nextLevel;
      lastZoomTime.current = now;
      setLevel(nextLevel);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [x, y, scale, setLevel]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        ref={canvasRef}
        drag={constraints !== false}
        dragConstraints={constraints || undefined}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y, scale, originX: 0, originY: 0 }}
        className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
      >
        <MapBackground />

        {BUILDING_LABELS.map((b) => (
          <div
            key={b.name}
            className="absolute text-body1 font-medium text-gray-500 pointer-events-none"
            style={{
              left: b.x,
              top: b.y,
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            {b.name}
          </div>
        ))}

        {Object.entries(BOOTH_COORDINATES).map(([number, coord]) => {
          const boothNum = Number(number);
          const boothInfo = MOCK_BOOTHS[boothNum] || DEFAULT_BOOTH;
          const bgColorClass = 'bg-vanilla';

          return (
            <BoothMarker
              key={boothNum}
              {...coord}
              name={boothInfo.name}
              bgColorClass={bgColorClass}
              isOpen={boothInfo.is_active}
              onClick={() => {}}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
