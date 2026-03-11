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
  return (
    <button
      type="button"
      onClick={onClick}
      role={role}
      id={id}
      className={`interactive-transition rounded-full px-4 py-2 text-sm font-medium 
        ${selected ? 'bg-primary text-white border border-primary' : 'bg-white text-gray-400 border border-gray-200 hover:text-primary hover:border hover:border-primary'}
        ${className}
        focus:outline-none
      `}
    >
      {children}
    </button>
  );
}
