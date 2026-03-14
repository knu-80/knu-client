import FaceStrokeSvg from '@/assets/face-stroke.svg';

interface NoImageProps {
  className?: string;
  text?: string;
}

export const NoImage = ({ className = 'w-full h-full' }: NoImageProps) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-[4px] ${className}`}>
      <img src={FaceStrokeSvg} alt="No Image" className="w-14 h-14 mb-1 opacity-40" />
    </div>
  );
};
