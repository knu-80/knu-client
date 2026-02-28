import { Outlet } from 'react-router-dom';

export default function AdminMainLayout() {
  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col bg-white">
        <main className="relative flex flex-1 flex-col px-5 pb-[calc(88px+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
