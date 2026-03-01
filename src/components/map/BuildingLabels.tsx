import { memo } from 'react';
import { BUILDING_LABELS } from './world';

export const BuildingLabels = memo(function BuildingLabels() {
  return (
    <>
      {BUILDING_LABELS.map((b) => (
        <div
          key={b.name}
          className="absolute text-body1 font-medium text-gray-500 pointer-events-none whitespace-nowrap"
          style={{
            left: b.x,
            top: b.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {b.name}
        </div>
      ))}
    </>
  );
});
