export const DIVISION_INFO = {
  ACADEMIC_DIVISION: { name: '학술부', shortName: '학술', color: 'bg-[var(--color-knu-sage)]' },
  CULTURE_ART_DIVISION: { name: '문예부', shortName: '문예', color: 'bg-[var(--color-knu-gold)]' },
  SPORTS_DIVISION: { name: '체육부', shortName: '체육', color: 'bg-[var(--color-knu-lavender)]' },
  SOCIAL_DIVISION: { name: '사회부', shortName: '사회', color: 'bg-[var(--color-knu-mint)]' },
  RELIGIOUS_DIVISION: { name: '종교부', shortName: '종교', color: 'bg-[var(--color-knu-silver)]' },
  MANAGEMENT: { name: '총동아리연합회', shortName: '총동연', color: 'bg-knu-red' },
} as const;

export interface BoothDetail {
  booth_number: number;
  name: string;
  division:
    | 'ACADEMIC_DIVISION'
    | 'CULTURE_ART_DIVISION'
    | 'SPORTS_DIVISION'
    | 'SOCIAL_DIVISION'
    | 'RELIGIOUS_DIVISION'
    | 'MANAGEMENT';
  is_active: boolean;
  recruitmentGrades?: string;
  fee?: string;
  description?: string;
  instagram?: string;
  phone?: string;
  imgUrls?: string[];
  applyUrl?: string;
}

export const MOCK_BOOTHS: Record<number, BoothDetail> = {
  1: {
    booth_number: 1,
    name: '테스트 학술',
    division: 'ACADEMIC_DIVISION',
    is_active: false,
    recruitmentGrades: '전 학년 모집',
    fee: '40,000',
    description: '저희는 경북대 학술 동아리입니다. 함께 공부해요!',
    instagram: 'knu_academic',
    phone: '010-0000-0000',
    imgUrls: [
      'https://picsum.photos/id/101/600/400',
      'https://picsum.photos/id/102/600/400',
      'https://picsum.photos/id/103/600/400',
    ],
    applyUrl: 'https://example.com/apply',
  },
  2: {
    booth_number: 2,
    name: '테스트 문예',
    division: 'CULTURE_ART_DIVISION',
    is_active: false,
    recruitmentGrades: '1, 2학년 모집',
    fee: '30,000',
    description: '문예부에서 창작의 즐거움을 느껴보세요.',
    instagram: 'knu_culture',
    imgUrls: ['https://picsum.photos/id/201/600/400', 'https://picsum.photos/id/202/600/400'],
  },
  100: {
    booth_number: 99,
    name: '총동연',
    division: 'MANAGEMENT',
    is_active: false,
    recruitmentGrades: '모집 마감',
    imgUrls: ['https://picsum.photos/id/301/600/400'],
  },
};
