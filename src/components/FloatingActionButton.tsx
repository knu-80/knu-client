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
  const baseClassName = `inline-flex h-14 w-14 items-center justify-center rounded-full bg-knu-red transition-transform active:scale-95 ${className}`;

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
