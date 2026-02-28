export interface Notice {
  id: number;
  title: string;
  date: string;
  category: '공지' | '분실물';
}

export const NOTICES: Notice[] = [
  {
    id: 101,
    title: '축제 부스 운영 시간 변경 안내',
    date: '2026.10.26',
    category: '공지',
  },
  {
    id: 102,
    title: '학생회관에서 지갑 분실했어요!',
    date: '2026.10.25',
    category: '분실물',
  },
  {
    id: 103,
    title: '중앙도서관 시험 기간 연장 운영',
    date: '2026.10.24',
    category: '공지',
  },
  {
    id: 104,
    title: '본관 앞에서 에어팟 주우신 분!',
    date: '2026.10.23',
    category: '분실물',
  },
  {
    id: 105,
    title: '[긴급] 축제 당일 안전 수칙 공지',
    date: '2026.10.22',
    category: '공지',
  },
  {
    id: 106,
    title: '정문 근처에서 파란색 우산 습득했습니다',
    date: '2026.10.21',
    category: '분실물',
  },
];
