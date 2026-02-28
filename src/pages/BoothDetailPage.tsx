import { FaInstagram } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import RepresentativeImage from '@/components/RepresentativeImage';
import ApplyButton from '@/components/ApplyButton';
import { ClubCategory } from '@/components/ClubCategory';

export default function BoothDetailPage() {
  return (
    <div className="pt-5">
      <div className="flex items-center space-x-4 mb-2 text-black">
        <h2 className="typo-heading-3">동아리이름</h2>
        <ClubCategory division="ACADEMIC_DIVISION" />
      </div>

      <div className="flex items-center space-x-2 mb-2 typo-muted text-knu-gray">
        <p>[전 학년 모집]</p>
        <p>회비 40,000원</p>
      </div>

      <div className="mb-10 text-black">
        <p className="typo-body-1">
          경북대학교 문예부 동아리 XXX입니다. <br />
          매주 월요일마다 모여서 밥먹기를 주로 하구요 어쩌구 저쩌구..
        </p>
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 text-black mb-3">동아리 대표 사진</h3>
        <RepresentativeImage
          imageUrl="https://picsum.photos/600/400"
          altText="동아리이름 대표 사진"
        />
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 mb-3 text-black">문의하기</h3>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 text-black">
            <FaInstagram className="h-5 w-5" />
            <p className="typo-body-1">인스타그램:</p>
            <p className="typo-body-1 font-semibold">@knu_club</p>
          </div>
          <div className="flex items-center space-x-2 text-black">
            <FaPhoneAlt className="h-5 w-5" />
            <p className="typo-body-1">전화번호:</p>
            <p className="typo-body-1 font-semibold">010-1234-5678</p>
          </div>
        </div>
      </div>

      <ApplyButton url="https://example.com/apply" />
    </div>
  );
}
