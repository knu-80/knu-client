import type { Page, Route } from '@playwright/test';

const LOGIN_TOKEN = 'e2e-access-token';
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22640%22 height=%22360%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E';

const notices = [
  {
    noticeId: 1,
    type: 'GENERAL',
    title: '1일차 운영 시간 및 동선 안내',
    createdAt: '2026-03-16T09:00:00',
  },
  {
    noticeId: 2,
    type: 'LOST_FOUND',
    title: '분실물 보관소 운영 안내',
    createdAt: '2026-03-16T10:00:00',
  },
] as const;

const noticeDetails = {
  1: {
    noticeId: 1,
    title: '1일차 운영 시간 및 동선 안내',
    createdAt: '2026-03-16T09:00:00',
    authorId: 1,
    authorNickname: '운영팀',
    content: '운영 시간은 11:00부터 17:00까지입니다.',
    type: 'GENERAL',
    imageUrls: [PLACEHOLDER_IMAGE],
  },
  2: {
    noticeId: 2,
    title: '분실물 보관소 운영 안내',
    createdAt: '2026-03-16T10:00:00',
    authorId: 1,
    authorNickname: '운영팀',
    content: '습득한 물품은 총동연 부스에서 보관 중입니다.',
    type: 'LOST_FOUND',
    lostFoundDetail: {
      foundPlace: '일청담',
      foundItem: '검정색 지갑',
    },
    imageUrls: [PLACEHOLDER_IMAGE],
  },
} as const;

const events = [
  {
    id: 11,
    title: '버스킹 공연',
    description: '백양로 메인 무대에서 버스킹 공연이 진행됩니다.',
    location: '백양로 메인 무대',
    eventType: 'RECRUITMENT',
    imageUrl: PLACEHOLDER_IMAGE,
    startAt: '2026-03-16T12:00:00',
    endAt: '2026-03-16T12:30:00',
    isActive: true,
  },
] as const;

const booths = [
  {
    id: 101,
    boothNumber: 1,
    name: '익스프레션',
    division: 'CULTURE_ART_DIVISION',
    keywords: '댄스',
    description: '댄스 동아리 부스입니다.',
    applyLink: 'https://example.com/apply/101',
    contact: '010-0000-0001',
    imageUrls: [PLACEHOLDER_IMAGE],
    isActive: true,
  },
  {
    id: 102,
    boothNumber: 2,
    name: '우리노래반',
    division: 'ACADEMIC_DIVISION',
    keywords: '노래',
    description: '노래 동아리 부스입니다.',
    applyLink: 'https://example.com/apply/102',
    contact: '010-0000-0002',
    imageUrls: [PLACEHOLDER_IMAGE],
    isActive: true,
  },
] as const;

function success<T>(data: T) {
  return {
    result: 'SUCCESS',
    data,
    code: null,
    message: null,
  };
}

async function fulfillJson(route: Route, status: number, payload: unknown) {
  await route.fulfill({
    status,
    contentType: 'application/json; charset=utf-8',
    body: JSON.stringify(payload),
  });
}

export async function setupApiMocks(page: Page) {
  await page.route('**/api/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const { pathname } = url;

    if (pathname === '/api/v1/login' && request.method() === 'POST') {
      await fulfillJson(route, 200, success({ accessToken: LOGIN_TOKEN }));
      return;
    }

    if (pathname === '/api/v1/notices' && request.method() === 'GET') {
      await fulfillJson(route, 200, success(notices));
      return;
    }

    if (/^\/api\/v1\/notices\/\d+$/.test(pathname) && request.method() === 'GET') {
      const noticeId = Number(pathname.split('/').pop());
      const detail = noticeDetails[noticeId as keyof typeof noticeDetails];
      if (!detail) {
        await fulfillJson(route, 404, { result: 'FAIL', message: 'not found' });
        return;
      }
      await fulfillJson(route, 200, success(detail));
      return;
    }

    if (pathname === '/api/v1/events/list/RECRUITMENT' && request.method() === 'GET') {
      await fulfillJson(route, 200, success(events));
      return;
    }

    if (pathname === '/api/v1/booths/list' && request.method() === 'GET') {
      await fulfillJson(route, 200, success(booths));
      return;
    }

    if (/^\/api\/v1\/booths\/\d+$/.test(pathname) && request.method() === 'GET') {
      const boothId = Number(pathname.split('/').pop());
      const booth = booths.find((item) => item.id === boothId);
      if (!booth) {
        await fulfillJson(route, 404, { result: 'FAIL', message: 'not found' });
        return;
      }
      await fulfillJson(route, 200, success(booth));
      return;
    }

    await fulfillJson(route, 404, { result: 'FAIL', message: `unmocked path: ${pathname}` });
  });

  await page.route('**/admin/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const { pathname } = url;
    const authorizationHeader =
      request.headers().authorization ?? request.headers().Authorization ?? '';

    if (pathname === '/admin/v1/me' && request.method() === 'GET') {
      if (authorizationHeader === `Bearer ${LOGIN_TOKEN}`) {
        await fulfillJson(
          route,
          200,
          success({
            member_id: 1,
            login_id: '1',
            nickname: '관리자',
            role: 'ADMIN',
            booth_id: 101,
          }),
        );
        return;
      }

      await fulfillJson(route, 401, {
        error: {
          state: 401,
          code: 'C501',
          message: '인증 정보가 없습니다.',
        },
      });
      return;
    }

    await fulfillJson(route, 404, { result: 'FAIL', message: `unmocked path: ${pathname}` });
  });
}
