# API Layer Guide

## Environment Variables

- `VITE_API_BASE_URL`: API 서버 주소 (기본값 `https://api.knu80th.kro.kr`)
- `VITE_API_TIMEOUT_MS`: 요청 타임아웃(ms, 기본값 `10000`)

## Folder Structure

```txt
src/apis
├─ http.ts              # axios 공통 인스턴스/인터셉터
├─ endpoints.ts         # API 경로 상수
├─ types.ts             # 공통 응답/에러 타입
├─ error.ts             # 공통 에러 변환 유틸
├─ modules/
│  ├─ noticeApi.ts
│  ├─ eventApi.ts
│  └─ boothApi.ts
└─ index.ts             # 외부 export 진입점
```

## Response Handling Rule

- 백엔드 공통 응답은 `ApiResponse<T>` 형태를 기준으로 처리합니다.
- `result === "FAIL"` 인 경우 `ApiClientError`를 throw 합니다.
- 화면단에서는 `try/catch`에서 `ApiClientError.message`를 기본 오류 메시지로 사용합니다.

## Usage Example

```ts
import { getNotices } from '@/apis';

const notices = await getNotices({ size: 10 });
```
