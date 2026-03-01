# API Layer Guide

## Environment Variables

- `VITE_API_BASE_URL`: API 서버 주소 (기본값 `https://api.knu80th.kro.kr`)
- `VITE_API_TIMEOUT_MS`: 요청 타임아웃(ms, 기본값 `10000`)

## Folder Structure

```txt
src/apis
├─ auth.ts              # 토큰 저장/조회/삭제 유틸
├─ http.ts              # axios 공통 인스턴스/인터셉터
├─ endpoints.ts         # API 경로 상수
├─ types.ts             # 공통 응답/에러 타입
├─ error.ts             # 공통 에러 변환 유틸
├─ enumMapper.ts        # enum 한/영 매핑 유틸
├─ utils.ts             # 공통 유틸 (omitUndefined, FormData)
├─ modules/
│  ├─ adminAuthApi.ts
│  ├─ noticeApi.ts
│  ├─ eventApi.ts
│  └─ boothApi.ts
└─ index.ts             # 외부 export 진입점
```

## Response Handling Rule

- 백엔드 공통 응답은 `ApiResponse<T>` 형태를 기준으로 처리합니다.
- `result === "FAIL"` 인 경우 `ApiClientError`를 throw 합니다.
- 백엔드 에러 응답이 `{ error: { state, code, message } }` 형태여도 공통 파서에서 처리합니다.
- 화면단에서는 `try/catch`에서 `ApiClientError.message`를 기본 오류 메시지로 사용합니다.
- 401 응답은 토큰을 자동 삭제하며, `setUnauthorizedHandler`로 후속 동작(로그아웃 라우팅 등)을 등록할 수 있습니다.

## Partial Update Rule (PATCH)

- 수정 API는 "변경된 필드만 전송" 정책을 따릅니다.
- 모듈별 `update*` 함수는 `Partial` 타입을 사용하고 `undefined` 필드는 자동 제거합니다.

## Notice Create Rule

- 공지사항 생성은 `multipart/form-data`(`data + images`)를 사용합니다.
- `createNotice(payload, files)` 함수에서 JSON 파트/이미지 파트 구성을 공통으로 처리합니다.

## Usage Example

```ts
import { getNotices, login, updateNotice } from '@/apis';

const notices = await getNotices({ size: 10 });
await login({ boothNumber: 12, password: 'pw' });
await updateNotice(1, { title: '수정 제목' });
```
