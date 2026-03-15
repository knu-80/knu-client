import { useState } from 'react';
import { NoImage } from './NoImage';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-200 shrink-0 w-full h-full ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)] custom-shimmer" />
  </div>
);

export const ImageWithFallback = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (!src || isError) return <NoImage className={className} />;

  return (
    <div className={`relative overflow-hidden shrink-0 ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 z-10" />}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};
