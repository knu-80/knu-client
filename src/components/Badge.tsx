interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center rounded-[4px] px-[6px] py-0.5 typo-caption leading-normal ${className}`}
    >
      <span className="translate-y-[0.5px]">{children}</span>
    </span>
  );
}
