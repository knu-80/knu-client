export interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  category: '공지' | '분실물';
  content: string;
  itemName?: string;
  foundLocation?: string;
}

export const NOTICES: Notice[] = [
  {
    id: 101,
    title: '축제 부스 운영 시간 변경 안내',
    author: '운영팀',
    date: '2026.10.26',
    category: '공지',
    content:
      '안녕하세요, 운영팀입니다.\n행사 진행 상황에 따라 일부 부스의 운영시간이 오후 8시까지로 연장되었습니다.\n이용에 참고하시기 바랍니다.',
  },
  {
    id: 102,
    title: '학생회관에서 지갑 분실했어요!',
    author: '총동연',
    date: '2026.10.25',
    category: '분실물',
    content:
      '안녕하세요, 학생회관에서 지갑을 분실하신 분을 찾습니다. 아래 물품 정보를 확인하시고 본인인 경우 부스로 방문해 주세요.',
    itemName: '검은색 가죽 지갑',
    foundLocation: '학생회관 1층 식당',
  },
  {
    id: 103,
    title: '중앙도서관 시험 기간 연장 운영',
    author: '운영팀',
    date: '2026.10.24',
    category: '공지',
    content:
      '시험 기간을 맞아 중앙도서관 열람실을 24시간 개방합니다.\n쾌적한 학습 환경을 위해 정숙을 유지해 주세요.',
  },
  {
    id: 104,
    title: '본관 앞에서 에어팟 주우신 분!',
    author: '총동연',
    date: '2026.10.23',
    category: '분실물',
    content:
      '본관 앞에서 에어팟 프로를 습득했습니다.\n케이스가 독특하니 본인이 맞는지 확인을 위해 부스에 방문해 주세요.',
    itemName: '에어팟 프로 2세대',
    foundLocation: '본관 앞 잔디광장',
  },
  {
    id: 105,
    title: '[긴급] 축제 당일 안전 수칙 공지',
    author: '운영팀',
    date: '2026.10.22',
    category: '공지',
    content: '축제 당일 인파 밀집이 예상됩니다.\n안전 요원의 안내에 적극 협조해 주시기 바랍니다.',
  },
  {
    id: 106,
    title: '정문 근처에서 파란색 우산 습득했습니다',
    author: '총동연',
    date: '2026.10.21',
    category: '분실물',
    content: '정문 버류장 인근에서 파란색 장우산을 습득하여 보관 중입니다.',
    itemName: '파란색 장우산',
    foundLocation: '정문 버스정류장 인근',
  },
];
