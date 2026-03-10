import SurfingSvg from '@/assets/surfing.svg';

export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-10 px-10">
      <img src={SurfingSvg} alt="결과 없음" className="w-40 h-40 object-contain" />

      <div className="text-center">
        <h3 className="typo-heading-3 text-gray-800 font-regular mb-2">검색 결과가 없어요</h3>
        <p className="typo-body-2 font-regular text-gray-500">다른 검색어를 입력해보세요</p>
      </div>
    </div>
  );
}
