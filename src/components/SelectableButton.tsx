type SelectableButtonProps = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  role?: string;
  id?: string;
  className?: string;
};

export function SelectableButton({
  children,
  selected,
  onClick,
  role,
  id,
  className = '',
}: SelectableButtonProps) {
  const hasCustomBg = className.includes('bg-');
  const hasCustomText = className.includes('text-');

  return (
    <button
      type="button"
      onClick={onClick}
      role={role}
      id={id}
      className={`interactive-transition inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium focus:outline-none border
        ${
          selected
            ? `${hasCustomBg ? '' : 'bg-primary border-primary'} ${hasCustomText ? '' : 'text-white'}`
            : 'bg-white text-gray-400 border-gray-200 hover:text-primary hover:border-primary'
        }
        ${className}
      `}
    >
      <span className="translate-y-[-0.5px]">{children}</span>
    </button>
  );
}
