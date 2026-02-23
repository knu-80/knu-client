import { useState } from 'react';
import { MdEventNote } from 'react-icons/md';
import EventCard from '@/components/EventCard';
import SegmentedControl from '@/components/SegmentedControl';

type EventType = 'RECRUITMENT' | 'PUB';

const ALL_EVENTS = [
  {
    id: 1,
    type: 'RECRUITMENT' as EventType,
    title: '가두모집 동아리 공연',
    description:
      '중앙동아리들의 열정 넘치는 공연을 만나보세요! 댄스, 밴드, 힙합 등 다양한 장르의 무대가 준비되어 있습니다.',
    date: '3월 16일 (일) 13:00 - 17:00',
    location: '백양로 야외무대',
    imageUrl: 'https://picsum.photos/600/400?random=1',
  },
  {
    id: 2,
    type: 'RECRUITMENT' as EventType,
    title: '스탬프 투어 이벤트',
    description:
      '부스를 돌며 스탬프를 모아보세요! 5개 이상의 스탬프를 모으면 소정의 기념품을 드립니다.',
    date: '3월 16일 (일) 11:00 - 18:00',
    location: '축제 구역 전체',
    imageUrl: 'https://picsum.photos/600/400?random=2',
  },
  {
    id: 3,
    type: 'PUB' as EventType,
    title: '주막 야간 디제잉 파티',
    description:
      '축제의 밤을 화려하게 장식할 디제잉 파티! 시원한 음료와 함께 신나는 음악을 즐겨보세요.',
    date: '3월 16일 (일) 19:00 - 22:00',
    location: '대운동장 주막존',
    imageUrl: 'https://picsum.photos/600/400?random=4',
  },
  {
    id: 4,
    type: 'PUB' as EventType,
    title: '주막 안주 요리 대회',
    description:
      '각 학과별 자존심을 건 안주 대결! 최고의 안주를 뽑아주시는 분들께 경품을 증정합니다.',
    date: '3월 17일 (월) 18:00 - 20:00',
    location: '대운동장 특설무대',
    imageUrl: 'https://picsum.photos/600/400?random=5',
  },
];

export default function EventPage() {
  const [selectedType, setSelectedType] = useState<EventType>('RECRUITMENT');

  const filteredEvents = ALL_EVENTS.filter((event) => event.type === selectedType);

  return (
    <div className="pt-5 sm:p-5">
      <div className="flex items-center space-x-2 mb-4">
        <MdEventNote className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">이벤트</h2>
      </div>

      <div className="mb-6">
        <SegmentedControl
          options={[
            { label: '가두모집 이벤트', value: 'RECRUITMENT' },
            { label: '주막이벤트', value: 'PUB' },
          ]}
          selectedValue={selectedType}
          onChange={(val) => setSelectedType(val as EventType)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filteredEvents.map((event) => (
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
