export const DIVISION_INFO = {
  ACADEMIC_DIVISION: { name: '학술부', shortName: '학술', color: 'bg-[var(--color-knu-sage)]' },
  CULTURE_ART_DIVISION: { name: '문예부', shortName: '문예', color: 'bg-[var(--color-knu-gold)]' },
  SPORTS_DIVISION: { name: '체육부', shortName: '체육', color: 'bg-[var(--color-knu-lavender)]' },
  SOCIAL_DIVISION: { name: '사회부', shortName: '사회', color: 'bg-[var(--color-knu-mint)]' },
  RELIGIOUS_DIVISION: { name: '종교부', shortName: '종교', color: 'bg-[var(--color-knu-silver)]' },
  MANAGEMENT: { name: '총동아리연합회', shortName: '총동연', color: 'bg-knu-red' },
  EXTERNAL_SUPPORT: { name: '외부부스', shortName: '외부', color: 'bg-gray-400' },
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
    | 'MANAGEMENT'
    | 'EXTERNAL_SUPPORT';
  is_active: boolean;
}

export const MOCK_BOOTHS: Record<number, BoothDetail> = {
  1: { booth_number: 1, name: '쌩목', division: 'CULTURE_ART_DIVISION', is_active: false },
  2: { booth_number: 2, name: '브리드', division: 'CULTURE_ART_DIVISION', is_active: false },
  3: { booth_number: 3, name: '크누피', division: 'CULTURE_ART_DIVISION', is_active: false },
  4: { booth_number: 4, name: '에이밍', division: 'SPORTS_DIVISION', is_active: false },
  5: { booth_number: 5, name: 'DFC', division: 'RELIGIOUS_DIVISION', is_active: false },
  6: { booth_number: 6, name: '뜨람', division: 'ACADEMIC_DIVISION', is_active: true },
  7: { booth_number: 7, name: '수리영역', division: 'ACADEMIC_DIVISION', is_active: true },
  8: { booth_number: 8, name: '합창단', division: 'CULTURE_ART_DIVISION', is_active: false },
  9: { booth_number: 9, name: '크누모빌리티', division: 'ACADEMIC_DIVISION', is_active: false },
  10: { booth_number: 10, name: 'H.P', division: 'RELIGIOUS_DIVISION', is_active: true },
  101: { booth_number: 101, name: '총동아리연합회', division: 'MANAGEMENT', is_active: false },
  102: { booth_number: 102, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
  103: { booth_number: 103, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
  104: { booth_number: 104, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
  105: { booth_number: 105, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
  106: { booth_number: 106, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
  107: { booth_number: 107, name: '외부부스', division: 'EXTERNAL_SUPPORT', is_active: false },
};
