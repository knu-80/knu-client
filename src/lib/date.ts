export function getDatePart(value: string): string {
  const [datePart] = value.split('T');
  return datePart ?? '';
}

export function toDotDate(value: string): string {
  const datePart = getDatePart(value);
  if (!datePart) return '0000.00.00';
  return datePart.replace(/-/g, '.');
}

export function toMonthDayDot(value: string): string {
  const dotDate = toDotDate(value);
  const [year, month, day] = dotDate.split('.');

  if (!year || !month || !day) {
    return dotDate;
  }

  return `${month}.${day}`;
}

export const formatDateTime = (dateTimeStr: string) => {
  if (!dateTimeStr) return '미지정';

  let normalizedStr = dateTimeStr;
  if (!normalizedStr.includes('Z') && !normalizedStr.includes('+')) {
    normalizedStr += 'Z';
  }

  const date = new Date(normalizedStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

export function toMonthDayDot(value: string): string {
  const datePart = getDatePart(value);
  if (!datePart) return '00.00';

  const parts = datePart.split('-');
  if (parts.length < 3) return '00.00';

  const month = parts[1];
  const day = parts[2];

  return `${month}.${day}`;
}
