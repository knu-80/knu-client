export function omitUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);

  return Object.fromEntries(entries) as Partial<T>;
}

export function buildJsonFormData<T>(data: T, files: File[] = []): FormData {
  const formData = new FormData();

  formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  files.forEach((file) => formData.append('images', file));

  return formData;
}
