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
  division: 'ACADEMIC_DIVISION' | 'CULTURE_ART_DIVISION' | 'SPORTS_DIVISION' | 'SOCIAL_DIVISION' | 'RELIGIOUS_DIVISION';
  is_active: boolean;
}

export const MOCK_BOOTHS: Record<number, BoothDetail> = {
  1: { booth_number: 1, name: '테스트 학술', division: 'ACADEMIC_DIVISION', is_active: false },
  2: { booth_number: 2, name: '테스트 문예', division: 'CULTURE_ART_DIVISION', is_active: false },
  3: { booth_number: 3, name: '테스트 체육', division: 'SPORTS_DIVISION', is_active: false },
  4: { booth_number: 4, name: '테스트 사회', division: 'SOCIAL_DIVISION', is_active: false },
  5: { booth_number: 5, name: '테스트 종교', division: 'RELIGIOUS_DIVISION', is_active: false },
  6: { booth_number: 6, name: '테스트 학술2', division: 'ACADEMIC_DIVISION', is_active: true },
  7: { booth_number: 7, name: '테스트 문예2', division: 'CULTURE_ART_DIVISION', is_active: true },
  8: { booth_number: 8, name: '테스트 체육2', division: 'SPORTS_DIVISION', is_active: false },
  9: { booth_number: 9, name: '테스트 사회2', division: 'SOCIAL_DIVISION', is_active: false },
  10: { booth_number: 10, name: '테스트 종교2', division: 'RELIGIOUS_DIVISION', is_active: true },
};
