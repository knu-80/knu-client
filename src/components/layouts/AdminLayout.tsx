import { Outlet } from 'react-router-dom';
import BackHeader from '@/components/navigation/BackHeader';

type AdminLayoutProps = {
  title?: string;
  fallbackPath?: string;
};

export default function AdminLayout({ title, fallbackPath = '/admin' }: AdminLayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-175 flex-col bg-white">
        <main className="relative flex-1 min-h-0 px-5 pb-[calc(88px+env(safe-area-inset-bottom))]">
          {title && <BackHeader title={title} fallbackPath={fallbackPath} />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
