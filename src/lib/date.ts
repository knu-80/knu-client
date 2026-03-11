export function getDatePart(value: string): string {
  const [datePart] = value.split('T');
  return datePart ?? '';
}

export function toDotDate(value: string): string {
  const datePart = getDatePart(value);
  if (!datePart) return '0000.00.00';
  return datePart.replace(/-/g, '.');
}
