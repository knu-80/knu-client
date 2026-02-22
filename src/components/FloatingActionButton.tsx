import { Link } from 'react-router-dom';

type FloatingActionButtonProps = {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  className?: string;
};

export default function FloatingActionButton({
  label,
  href,
  icon,
  external = false,
  className = '',
}: FloatingActionButtonProps) {
  const baseClassName = `inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-knu-red via-[#d10000] to-[#b80000] shadow-[0_12px_24px_rgba(230,0,0,0.35),0_3px_8px_rgba(0,0,0,0.22)] ring-2 ring-white/60 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(230,0,0,0.4),0_6px_14px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-95 ${className}`;

  const content = <img src={icon} alt="" className="h-7 w-7" aria-hidden="true" />;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={baseClassName} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={baseClassName} aria-label={label}>
      {content}
    </Link>
  );
}
