import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface StarBurst {
  id: string;
  x: number;
  y: number;
}

interface StarBurstOverlayProps {
  bursts: StarBurst[];
}

export function StarBurstOverlay({ bursts }: StarBurstOverlayProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 2.5, 2],
              y: burst.y,
              x: burst.x,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute"
          >
            <FaStar size={100} className="text-secondary-yellow" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
