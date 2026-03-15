# E2E 테스트 가이드

## 1) 목적

- 사용자 핵심 플로우를 브라우저 기준으로 검증합니다.
- PR 단계에서 주요 라우팅/인증 가드 회귀를 빠르게 탐지합니다.

## 2) 현재 구성

- 도구: Playwright (`@playwright/test`)
- 설정 파일: `playwright.config.ts`
- 테스트 위치: `tests/e2e`
- 기본 해상도: iPhone 13
- 실행 서버: `pnpm dev -- --host 127.0.0.1 --port 4173 --strictPort`
- API 의존성: 실서버 대신 route mocking 사용 (`tests/e2e/fixtures/apiMocks.ts`)

## 3) 실행 방법

```bash
pnpm test:e2e:install
pnpm test:e2e
```

선택 실행:

```bash
pnpm test:e2e:ui
pnpm test:e2e:headed
pnpm test:e2e:report
```

## 4) 커버되는 시나리오

### 홈/메인 플로우 (`tests/e2e/home-flow.spec.ts`)

- 홈 진입
- DAY 탭 전환
- 타임테이블 미리보기 → 상세 페이지 이동
- 공지 미리보기 → 공지 상세 이동
- 지도 미리보기 → 지도 페이지 이동

### 공지 플로우 (`tests/e2e/notice-flow.spec.ts`)

- 공지 목록 진입
- 분실물 탭 필터
- 공지 카드 클릭 후 상세 진입
- 분실물 안내 문구 확인

### 관리자 인증 플로우 (`tests/e2e/admin-auth.spec.ts`)

- 비로그인 상태 admin 하위 경로 접근 시 로그인 리다이렉트
- 로그인 성공 후 관리자 홈 진입
- 토큰(localStorage) 저장 확인

## 5) 유지보수 규칙

- API 스펙 변경 시 `tests/e2e/fixtures/apiMocks.ts`를 먼저 업데이트합니다.
- UI 텍스트보다 접근 가능한 role/label, id 기반 선택자를 우선 사용합니다.
- 회귀 위험이 큰 경로(로그인/라우팅/상세 진입)는 smoke 시나리오로 유지합니다.

## 6) 추후 확장 권장

- CI에서 `PR: smoke`, `nightly: full e2e`로 분리
- 관리자 CRUD(공지/이벤트/부스) 생성-수정-삭제 시나리오 추가
- 실제 API 환경 검증용 별도 e2e 프로파일(목킹 없는 모드) 추가
