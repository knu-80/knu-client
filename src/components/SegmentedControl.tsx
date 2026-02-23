import { useId } from 'react';
import { motion } from 'framer-motion';

interface SegmentedControlProps {
  id?: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function SegmentedControl({
  id,
  options,
  selectedValue,
  onChange,
}: SegmentedControlProps) {
  const generatedId = useId();
  const baseId = id || generatedId;

  return (
    <div className="relative flex w-full gap-1 rounded-full bg-gray-100 p-1">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex flex-1 items-center justify-center py-2 text-sm font-medium transition-colors outline-none cursor-pointer rounded-full ${
              isSelected ? 'text-white font-semibold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId={`segmented-control-bg-${baseId}`}
                className="absolute inset-0 rounded-full bg-knu-red"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
