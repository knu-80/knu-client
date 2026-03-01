export type EventType = 'RECRUITMENT' | 'PUB';

export interface FestivalEvent {
  id: number;
  type: EventType;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
}

export const ALL_EVENTS: FestivalEvent[] = [
  {
    id: 1,
    type: 'RECRUITMENT',
    title: '가두모집 동아리 공연',
    description:
      '중앙동아리들의 열정 넘치는 공연을 만나보세요! 댄스, 밴드, 힙합 등 다양한 장르의 무대가 준비되어 있습니다.',
    startDate: '2026-03-16T13:00',
    endDate: '2026-03-16T17:00',
    location: '백양로 야외무대',
    imageUrl: 'https://picsum.photos/600/400?random=1',
  },
  {
    id: 2,
    type: 'RECRUITMENT',
    title: '스탬프 투어 이벤트',
    description:
      '부스를 돌며 스탬프를 모아보세요! 5개 이상의 스탬프를 모으면 소정의 기념품을 드립니다.',
    startDate: '2026-03-16T11:00',
    endDate: '2026-03-16T18:00',
    location: '축제 구역 전체',
    imageUrl: 'https://picsum.photos/600/400?random=2',
  },
  {
    id: 3,
    type: 'PUB',
    title: '주막 야간 디제잉 파티',
    description:
      '축제의 밤을 화려하게 장식할 디제잉 파티! 시원한 음료와 함께 신나는 음악을 즐겨보세요.',
    startDate: '2026-03-16T19:00',
    endDate: '2026-03-16T22:00',
    location: '대운동장 주막존',
    imageUrl: 'https://picsum.photos/600/400?random=4',
  },
  {
    id: 4,
    type: 'PUB',
    title: '주막 안주 요리 대회',
    description:
      '각 학과별 자존심을 건 안주 대결! 최고의 안주를 뽑아주시는 분들께 경품을 증정합니다.',
    startDate: '2026-03-17T18:00',
    endDate: '2026-03-17T20:00',
    location: '대운동장 특설무대',
    imageUrl: 'https://picsum.photos/600/400?random=5',
  },
];
