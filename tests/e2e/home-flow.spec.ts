import { expect, test } from '@playwright/test';
import { setupApiMocks } from './fixtures/apiMocks';

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page);
});

test('홈에서 미리보기 기반으로 상세 페이지에 진입할 수 있다', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#home-day-tab-day1')).toBeVisible();
  await page.locator('#home-day-tab-day2').click();
  await expect(page.locator('#home-day-tab-day2')).toHaveAttribute('aria-selected', 'true');

  await page
    .getByRole('link', { name: /상세 타임테이블로 이동/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/timetable$/);
  await expect(page.getByRole('heading', { name: '가두모집 무대 공연 타임라인' })).toBeVisible();

  await page.goto('/');
  await page
    .getByRole('link', { name: /상세 공지로 이동/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/notice\/\d+$/);
  await expect(page.getByText('운영 시간은 11:00부터 17:00까지입니다.')).toBeVisible();

  await page.goto('/');
  await page.getByRole('link', { name: '부스 배치도 지도 페이지로 이동' }).click();
  await expect(page).toHaveURL(/\/map$/);
  await expect(page.getByPlaceholder('동아리, 부스명을 검색해보세요')).toBeVisible();
});
