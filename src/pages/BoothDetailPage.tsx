import { useParams } from 'react-router-dom';
// import { FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import ImageCarousel from '@/components/ImageCarousel';
import ApplyButton from '@/components/ApplyButton';
import { MOCK_BOOTHS } from '@/constants/booth';
import { ClubCategory } from '@/components/ClubCategory';

export default function BoothDetailPage() {
  const { id } = useParams<{ id: string }>();
  const booth = MOCK_BOOTHS[Number(id)];

  if (!booth) {
    return <div className="py-20 text-center text-gray-500">부스 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="pt-5">
      <div className="flex items-center space-x-4 mb-2 text-black">
        <h2 className="typo-heading-3">{booth.name}</h2>
        <ClubCategory division={booth.division} />
      </div>

      <div className="flex items-center space-x-2 mb-4 typo-muted text-knu-gray">
        {/* <p>[{booth.recruitmentGrades || '모집 정보 없음'}]</p>
        {booth.fee && <p>회비 {booth.fee}원</p>} */}
      </div>

      <div className="mb-10 text-black">
        <p className="typo-body-1 whitespace-pre-wrap">
          {booth.description || '동아리 소개 정보가 없습니다.'}
        </p>
      </div>

      {booth.imageUrls && booth.imageUrls.length > 0 && (
        <ImageCarousel
          imageUrls={booth.imageUrls}
          altText={`${booth.name} 사진`}
          label="동아리 활동 사진"
          className="mb-10"
        />
      )}

      {/* {(booth.instagram || booth.phone) && (
        <div className="mb-10">
          <h3 className="typo-heading-3 mb-3 text-black">문의하기</h3>
          <div className="flex flex-col space-y-3">
            {booth.instagram && (
              <div className="flex items-center space-x-2 text-black">
                <FaInstagram className="h-5 w-5 text-pink-600" />
                <p className="typo-body-1">인스타그램:</p>
                <p className="typo-body-1 font-semibold">@{booth.instagram}</p>
              </div>
            )}
            {booth.phone && (
              <div className="flex items-center space-x-2 text-black">
                <FaPhoneAlt className="h-5 w-5 text-blue-600" />
                <p className="typo-body-1">전화번호:</p>
                <p className="typo-body-1 font-semibold">{booth.phone}</p>
              </div>
            )}
          </div>
        </div>
      )} */}

      {booth.applyLink && <ApplyButton url={booth.applyLink} />}
    </div>
  );
}
