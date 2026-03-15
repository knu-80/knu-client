import { Outlet } from 'react-router-dom';
import Footer from '../home/Footer';
import BottomTabBar from '@/components/navigation/BottomTabBar';

export default function RankingLayout() {
  return (
    <div className="min-h-dvh text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#f8e8e7_0%,#ffffff_80%)]" />
          <div
            className="absolute left-1/2 top-[140px] h-[1300px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-[0.2]"
            style={{
              background: `conic-gradient(
                from 0deg,
                var(--color-primary, #ea5147) 0deg 15deg,
                transparent 15deg 30deg,
                var(--color-primary, #ea5147) 30deg 45deg,
                transparent 45deg 60deg,
                var(--color-primary, #ea5147) 60deg 75deg,
                transparent 75deg 90deg,
                var(--color-primary, #ea5147) 90deg 105deg,
                transparent 105deg 120deg,
                var(--color-primary, #ea5147) 120deg 135deg,
                transparent 135deg 150deg,
                var(--color-primary, #ea5147) 150deg 165deg,
                transparent 165deg 180deg,
                var(--color-primary, #ea5147) 180deg 195deg,
                transparent 195deg 210deg,
                var(--color-primary, #ea5147) 210deg 225deg,
                transparent 225deg 240deg,
                var(--color-primary, #ea5147) 240deg 255deg,
                transparent 255deg 270deg,
                var(--color-primary, #ea5147) 270deg 285deg,
                transparent 285deg 300deg,
                var(--color-primary, #ea5147) 300deg 315deg,
                transparent 315deg 330deg,
                var(--color-primary, #ea5147) 330deg 345deg,
                transparent 345deg 360deg
              )`,
            }}
          />
        </div>

        <main className="relative z-10 flex-1 min-h-0 px-5 pb-[calc(88px+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>

        <div className="relative z-10 pb-[calc(60px+env(safe-area-inset-bottom))]">
          <Footer />
        </div>

        <BottomTabBar />
      </div>
    </div>
  );
}
