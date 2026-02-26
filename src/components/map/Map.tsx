import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
// import { BoothMarker } from '@/components/BoothMarker';
// import { BOOTH_COORDINATES } from '@/constants/map';
// import { MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';

import { MapBackground } from './MapBackground';
import { WORLD_WIDTH, WORLD_HEIGHT } from './world';

// const DEFAULT_BOOTH: BoothDetail = {
//   booth_number: 0,
//   name: '',
//   division: 'ACADEMIC_DIVISION',
//   is_active: false,
// };

export function Map() {
  //   {
  //   selectedBoothId,
  //   setSelectedBoothId,
  // }: {
  //   selectedBoothId: number | null;
  //   setSelectedBoothId: (id: number) => void;
  // }
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-300);
  const y = useMotionValue(-2000);

  const [constraints, setConstraints] = useState<
    { left: number; right: number; top: number; bottom: number } | false
  >(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const calculateBounds = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();

      const left = Math.min(0, containerRect.width - canvasRect.width);
      const top = Math.min(0, containerRect.height - canvasRect.height);

      setConstraints({
        left,
        right: 0,
        top,
        bottom: 0,
      });
    };

    calculateBounds();
    const observer = new ResizeObserver(calculateBounds);
    observer.observe(canvasRef.current);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        ref={canvasRef}
        drag={constraints !== false}
        dragConstraints={constraints || undefined}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y, width: WORLD_WIDTH, height: WORLD_HEIGHT }}
        className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
      >
        <MapBackground />
        {/* 
        {Object.entries(BOOTH_COORDINATES).map(([number, coord]) => {
          const boothNum = Number(number);
          const boothInfo = MOCK_BOOTHS[boothNum] || DEFAULT_BOOTH;
          const isSelected = selectedBoothId === boothNum;
          const bgColorClass = isSelected ? 'bg-knu-red' : 'bg-vanilla';

          return (
            <BoothMarker
              key={boothNum}
              {...coord}
              name={boothInfo.name}
              bgColorClass={bgColorClass}
              isOpen={boothInfo.is_active}
              onClick={() => setSelectedBoothId(boothNum)}
            />
          );
        })} */}
      </motion.div>
    </div>
  );
}
