export const NOTICE_CATEGORY_COLOR_MAP: Record<
  '공지' | '분실물',
  {
    bg: string;
    hoverBg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  공지: {
    bg: 'bg-primary/5',
    hoverBg: 'hover:bg-primary/10',
    text: 'text-base-deep',
    badgeBg: 'bg-primary/10',
    badgeText: 'text-primary',
  },
  분실물: {
    bg: 'bg-secondary-blue/5',
    hoverBg: 'hover:bg-secondary-blue/10',
    text: 'text-base-deep',
    badgeBg: 'bg-secondary-blue/15',
    badgeText: 'text-secondary-blue',
  },
};

export const NOTICE_BUTTON_COLOR_MAP: Record<
  '공지' | '분실물',
  {
    activeBg: string;
    activeText: string;
  }
> = {
  공지: {
    activeBg: 'bg-primary border-primary',
    activeText: 'text-white',
  },
  분실물: {
    activeBg: 'bg-secondary-blue border-secondary-blue',
    activeText: 'text-white',
  },
};
