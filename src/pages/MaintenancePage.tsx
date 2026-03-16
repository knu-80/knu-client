import { StatusDisplay } from '@/components/StatusDisplay';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-10">
      <StatusDisplay
        variant="maintenance"
        title="내일 다시 만나요!"
        description={`가두모집 운영 시간이 종료되었습니다.\n내일 오전 7시에 다시 만나요!`}
      />
    </div>
  );
}
