import banner3 from '@/assets/banner3.webp';

export default function AdminPubPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center pt-32 px-6 text-center">
        <div className="w-64 h-48 flex items-center justify-center mb-10">
          <img
            src={banner3}
            alt="주막 홍보 배너"
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>
        <h2 className="typo-heading-2 text-black mb-3 font-bold text-2xl">준비 중인 기능입니다</h2>
        <p className="typo-body-1 text-gray-500 leading-relaxed font-medium">
          주막 관리 기능은 현재 준비 중입니다.
          <br />
          <span className="text-knu-red font-bold text-xl mt-3 inline-block">3월 말에 만나요!</span>
        </p>
      </div>
    </div>
  );
}
