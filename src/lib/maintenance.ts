export function isMaintenanceTime(): boolean {
  const now = new Date();
  const start = new Date('2026-03-16T20:00:00+09:00');
  const end = new Date('2026-03-17T07:00:00+09:00');

  return now >= start && now < end;
}
