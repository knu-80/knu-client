import { expect, test } from '@playwright/test';
import { setupApiMocks } from './fixtures/apiMocks';

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page);
});

test('공지 목록에서 카테고리 필터 후 상세 공지로 이동할 수 있다', async ({ page }) => {
  await page.goto('/notice');

  await expect(page.getByRole('heading', { name: '공지사항' })).toBeVisible();

  await page.getByRole('button', { name: '분실물' }).click();
  await expect(page.getByText('분실물 보관소 운영 안내')).toBeVisible();

  await page.locator('a[href="/notice/2"]').click();
  await expect(page).toHaveURL(/\/notice\/2$/);

  await expect(page.getByText('습득한 물품은 총동연 부스에서 보관 중입니다.')).toBeVisible();
  await expect(page.getByText('분실물은 총동연 부스에서 수령 가능합니다')).toBeVisible();
});
