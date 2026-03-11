import { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
}

export function ExpandableText({ text, maxLines = 3 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * maxLines;

    const id = requestAnimationFrame(() => {
      if (el.scrollHeight > maxHeight) {
        setIsOverflowed(true);
      }
    });

    return () => cancelAnimationFrame(id);
  }, [text, maxLines]);

  return (
    <div className="mb-10 text-base-deep relative">
      <p
        ref={pRef}
        className="typo-body-2 whitespace-pre-wrap overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'none' : maxLines,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {text}
      </p>

      {isOverflowed && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute bottom-0 right-0 typo-body-2 text-primary bg-gradient-to-l from-white via-white/90 via-40% to-transparent pl-20"
        >
          {expanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
}
