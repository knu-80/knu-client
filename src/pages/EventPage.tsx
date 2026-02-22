import { MdEventNote } from 'react-icons/md';
import EventCard from '@/components/EventCard';

export default function EventPage() {
  const events = [
    {
      id: 1,
      title: '가두모집 동아리 공연',
      description:
        '중앙동아리들의 열정 넘치는 공연을 만나보세요! 댄스, 밴드, 힙합 등 다양한 장르의 무대가 준비되어 있습니다.',
      date: '3월 16일 (일) 13:00 - 17:00',
      location: '백양로 야외무대',
      imageUrl: 'https://picsum.photos/600/400?random=1',
    },
    {
      id: 2,
      title: '스탬프 투어 이벤트',
      description:
        '부스를 돌며 스탬프를 모아보세요! 5개 이상의 스탬프를 모으면 소정의 기념품을 드립니다.',
      date: '3월 16일 (일) 11:00 - 18:00',
      location: '축제 구역 전체',
      imageUrl: 'https://picsum.photos/600/400?random=2',
    },
    {
      id: 3,
      title: '경북대 굿즈 팝업스토어',
      description:
        '경북대학교 캐릭터 굿즈와 한정판 축제 티셔츠를 판매합니다. 인기 상품은 조기 품절될 수 있습니다.',
      date: '3월 16일 - 17일 11:00 - 17:00',
      location: '일정담 입구 광장',
      imageUrl: 'https://picsum.photos/600/400?random=3',
    },
  ];

  return (
    <div className="pt-5 sm:p-5">
      <div className="flex items-center space-x-2 mb-4">
        <MdEventNote className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">이벤트</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
