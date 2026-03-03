export const DIVISION_INFO = {
  ACADEMIC_DIVISION: { name: '학술부', shortName: '학술', color: 'bg-[var(--color-knu-sage)]' },
  CULTURE_ART_DIVISION: { name: '문예부', shortName: '문예', color: 'bg-[var(--color-knu-gold)]' },
  SPORTS_DIVISION: { name: '체육부', shortName: '체육', color: 'bg-[var(--color-knu-lavender)]' },
  SOCIAL_DIVISION: { name: '사회부', shortName: '사회', color: 'bg-[var(--color-knu-mint)]' },
  RELIGIOUS_DIVISION: { name: '종교부', shortName: '종교', color: 'bg-[var(--color-knu-silver)]' },
  MANAGEMENT: { name: '총동연', shortName: '총동연', color: 'bg-knu-red' },
  EXTERNAL_SUPPORT: { name: '외부부스', shortName: '외부', color: 'bg-gray-400' },
} as const;

export type DivisionType = keyof typeof DIVISION_INFO;

export const DIVISION_LIST: DivisionType[] = [
  'CULTURE_ART_DIVISION',
  'SOCIAL_DIVISION',
  'ACADEMIC_DIVISION',
  'SPORTS_DIVISION',
  'RELIGIOUS_DIVISION',
];

export interface BoothDetail {
  id: number;
  boothNumber: number;
  name: string;
  division: DivisionType;
  isActive: boolean;
  recruitmentGrades?: string;
  fee?: string;
  description?: string;
  instagram?: string;
  phone?: string;
  imgUrls?: string[];
  applyLink?: string;
}

export const DEFAULT_BOOTH: BoothDetail = {
  id: 0,
  boothNumber: 0,
  name: '부스이름',
  division: 'ACADEMIC_DIVISION',
  isActive: false,
  description: '설명',
  applyLink: '',
  imgUrls: [],
};

export const MOCK_BOOTHS: Record<number, BoothDetail> = {
  1: {
    id: 1,
    boothNumber: 1,
    name: '쌩목',
    division: 'CULTURE_ART_DIVISION',
    isActive: false,
    description: '예시!!!!!!!',
    applyLink: '',
    recruitmentGrades: '전 학년 모집',
    fee: '40,000',
    instagram: 'knu_academic',
    phone: '010-0000-0000',
    imgUrls: [
      'https://picsum.photos/id/101/600/400',
      'https://picsum.photos/id/102/600/400',
      'https://picsum.photos/id/103/600/400',
    ],
  },
  2: {
    id: 2,
    boothNumber: 2,
    name: '브리드',
    division: 'CULTURE_ART_DIVISION',
    isActive: false,
    description: '문예부에서 창작의 즐거움을 느껴보세요.',
    applyLink: '',
    recruitmentGrades: '1, 2학년 모집',
    fee: '30,000',
    instagram: 'knu_culture',
    imgUrls: ['https://picsum.photos/id/201/600/400', 'https://picsum.photos/id/202/600/400'],
  },
  3: {
    id: 3,
    boothNumber: 3,
    name: '크누피',
    division: 'CULTURE_ART_DIVISION',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  4: {
    id: 4,
    boothNumber: 4,
    name: '에이밍',
    division: 'SPORTS_DIVISION',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  5: {
    id: 5,
    boothNumber: 5,
    name: 'DFC',
    division: 'RELIGIOUS_DIVISION',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  6: {
    id: 6,
    boothNumber: 6,
    name: '뜨람',
    division: 'ACADEMIC_DIVISION',
    isActive: true,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  7: {
    id: 7,
    boothNumber: 7,
    name: '수리영역',
    division: 'ACADEMIC_DIVISION',
    isActive: true,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  8: {
    id: 8,
    boothNumber: 8,
    name: '합창단',
    division: 'CULTURE_ART_DIVISION',
    isActive: true,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  9: {
    id: 9,
    boothNumber: 9,
    name: '크누모빌리티',
    division: 'ACADEMIC_DIVISION',
    isActive: true,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  10: {
    id: 10,
    boothNumber: 10,
    name: 'H.P',
    division: 'RELIGIOUS_DIVISION',
    isActive: true,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  101: {
    id: 101,
    boothNumber: 101,
    name: '총동아리연합회',
    division: 'MANAGEMENT',
    isActive: false,
    description: '경북대학교 제XX대 총동아리연합회입니다.',
    applyLink: '',
    recruitmentGrades: '모집 마감',
    imgUrls: ['https://picsum.photos/id/301/600/400'],
  },
  102: {
    id: 102,
    boothNumber: 102,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  103: {
    id: 103,
    boothNumber: 103,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  104: {
    id: 104,
    boothNumber: 104,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  105: {
    id: 105,
    boothNumber: 105,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  106: {
    id: 106,
    boothNumber: 106,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
  107: {
    id: 107,
    boothNumber: 107,
    name: '외부부스',
    division: 'EXTERNAL_SUPPORT',
    isActive: false,
    description: '',
    applyLink: '',
    imgUrls: [],
  },
};
