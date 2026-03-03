import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapBackground } from './MapBackground';
import { BuildingLabels } from './BuildingLabels';
import { BoothMarkers } from './BoothMarkers';
import { useMapCamera } from './useMapCamera';

interface MapProps {
  onBoothClick: (id: number) => void;
  selectedBoothId: number | null;
}

export function Map({ onBoothClick, selectedBoothId }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { x, y, scale, constraints, moveToBooth, isPinching } = useMapCamera(containerRef);

  useEffect(() => {
    if (selectedBoothId !== null) {
      moveToBooth(selectedBoothId);
    }
  }, [selectedBoothId, moveToBooth]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden touch-none">
      <motion.div
        drag={!isPinching}
        dragConstraints={constraints}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y, scale, originX: 0, originY: 0 }}
        className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
      >
        <MapBackground />
        <BuildingLabels />
        <BoothMarkers
          onBoothClick={(id) => {
            onBoothClick(id);
          }}
          selectedBoothId={selectedBoothId}
        />
      </motion.div>
    </div>
  );
}
