interface ApplyButtonProps {
  url: string;
}

export default function ApplyButton({ url }: ApplyButtonProps) {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <button
      className="w-full rounded-3xl bg-knu-red py-3 text-white font-bold typo-subheading-2 mb-6 cursor-pointer transition-all hover:scale-[1.01] hover:brightness-95 active:scale-[0.98]"
      onClick={handleClick}
    >
      지원하기
    </button>
  );
}
