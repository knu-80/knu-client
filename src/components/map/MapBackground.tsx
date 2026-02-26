import MapSvg from '@/assets/map.svg';
import { WORLD_WIDTH, WORLD_HEIGHT } from './world';

export function MapBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        backgroundColor: '#F1F6FD',
      }}
    >
      <img
        src={MapSvg}
        alt="지도"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
