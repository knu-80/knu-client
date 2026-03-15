import { expect, test } from '@playwright/test';
import { setupApiMocks } from './fixtures/apiMocks';

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page);
});

test('비로그인 상태에서 admin 하위 경로 접근 시 로그인 페이지로 리다이렉트된다', async ({
  page,
}) => {
  await page.goto('/admin/booths/edit/101');

  await expect(page).toHaveURL(/\/admin\/login\?redirect=/);
  await expect(page.getByRole('heading', { name: '관리자 로그인' })).toBeVisible();
});

test('로그인 성공 시 관리자 홈으로 진입하고 토큰이 저장된다', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login\?redirect=/);

  await page.getByLabel('관리자 아이디').fill('1');
  await page.getByLabel('비밀번호').fill('password123');
  await page.getByRole('button', { name: '로그인' }).click();

  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByText('공지 관리')).toBeVisible();

  const token = await page.evaluate(() => window.localStorage.getItem('accessToken'));
  expect(token).toBe('e2e-access-token');
});
