export function omitUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  // PATCH 기본 정책: undefined는 "변경 없음"으로 제거한다.
  // null은 백엔드가 명시적으로 허용한 필드에서만 사용한다.
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);

  return Object.fromEntries(entries) as Partial<T>;
}

export function buildJsonFormData<T>(data: T, files: File[] = []): FormData {
  const formData = new FormData();

  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  files.forEach((file) => formData.append('images', file));

  return formData;
}
