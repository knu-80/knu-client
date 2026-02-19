import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { BoothMarker } from '@/components/BoothMarker';
import { BOOTH_COORDINATES } from '@/constants/map';
import { DIVISION_INFO, MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';
import MapSvg from '@/assets/map.svg';

const DEFAULT_BOOTH: BoothDetail = {
  booth_number: 0,
  name: '',
  division: 'ACADEMIC_DIVISION',
  is_active: false,
};

export default function MapPage() {
  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-220);
  const y = useMotionValue(-2100);
  const [constraints, setConstraints] = useState<{ left: number; right: number; top: number; bottom: number } | false>(false);

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
    <div ref={containerRef} className="w-full h-screen relative overflow-hidden bg-gray-50">
      <div className="px-5 py-3 z-30 sticky top-0 bg-white">
        <SearchBar value={value} onChange={setValue} onClear={() => setValue('')} placeholder="동아리, 부스명을 검색해보세요" />
      </div>

      <div className="sticky top-[52px] z-20 flex gap-2 overflow-x-auto px-5 py-2">
        {['문예부', '사회부', '학술부', '체육부', '종교부'].map(d => (
          <MapPageClubCategory key={d} divisionName={d} />
        ))}
      </div>

      <motion.div
        ref={canvasRef}
        drag={constraints !== false}
        dragConstraints={constraints || undefined}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y }}
        className="absolute top-0 left-0 w-[700px] h-[3100px] cursor-grab active:cursor-grabbing"
      >
        <img src={MapSvg} alt="지도" className="w-full h-full" />
        {Object.entries(BOOTH_COORDINATES).map(([number, coord]) => {
          const boothNum = Number(number);
          const boothInfo = MOCK_BOOTHS[boothNum] || DEFAULT_BOOTH;
          const isSelected = selectedBoothId === boothNum;
          const divisionColor = coord.isManagement
            ? DIVISION_INFO.MANAGEMENT.color
            : DIVISION_INFO[boothInfo.division].color;
          const bgColorClass = isSelected ? divisionColor : 'bg-vanilla';

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
        })}
      </motion.div>
    </div>
  );
}
