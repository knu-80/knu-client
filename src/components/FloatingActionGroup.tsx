import { useEffect, useRef, useState } from 'react';

import FloatingActionButton from './FloatingActionButton';

type FloatingAction = {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
};

type FloatingActionGroupProps = {
  actions: FloatingAction[];
  hideOnScrollDown?: boolean;
  className?: string;
};

export default function FloatingActionGroup({
  actions,
  hideOnScrollDown = true,
  className = '',
}: FloatingActionGroupProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!hideOnScrollDown) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (Math.abs(delta) > 6) {
          setVisible(delta < 0 || currentScrollY < 10);
          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hideOnScrollDown]);

  const visibilityClass = visible
    ? 'opacity-100 translate-y-0'
    : 'invisible opacity-0 translate-y-4';

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] z-30 transition-all duration-200 ${visibilityClass} ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[700px] justify-end px-5">
        <div className="flex flex-col gap-3">
          {actions.map((action) => (
            <FloatingActionButton
              key={action.href}
              label={action.label}
              href={action.href}
              icon={action.icon}
              external={action.external}
              className="pointer-events-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
