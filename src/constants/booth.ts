import type { BoothDivision } from '@/apis/modules/boothApi';

export const DIVISION_INFO: Record<
  BoothDivision,
  { name: string; shortName: string; color: string }
> = {
  ACADEMIC_DIVISION: {
    name: '학술부',
    shortName: '학술',
    color: 'bg-[var(--color-knu-sage)]',
  },
  CULTURE_ART_DIVISION: {
    name: '문예부',
    shortName: '문예',
    color: 'bg-[var(--color-knu-gold)]',
  },
  SPORTS_DIVISION: {
    name: '체육부',
    shortName: '체육',
    color: 'bg-[var(--color-knu-lavender)]',
  },
  SOCIAL_DIVISION: {
    name: '사회부',
    shortName: '사회',
    color: 'bg-[var(--color-knu-mint)]',
  },
  RELIGIOUS_DIVISION: {
    name: '종교부',
    shortName: '종교',
    color: 'bg-[var(--color-knu-silver)]',
  },
  MANAGEMENT: {
    name: '총동연',
    shortName: '총동연',
    color: 'bg-knu-red',
  },
  EXTERNAL_SUPPORT: {
    name: '외부부스',
    shortName: '외부',
    color: 'bg-gray-400',
  },
};

export const DIVISION_LIST: BoothDivision[] = [
  'CULTURE_ART_DIVISION',
  'SOCIAL_DIVISION',
  'ACADEMIC_DIVISION',
  'SPORTS_DIVISION',
  'RELIGIOUS_DIVISION',
];
