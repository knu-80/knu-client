import { FiMusic } from 'react-icons/fi';

const PERFORMANCES = [
  { title: '밴드 공연', time: '12:00 - 12:30', location: '백양로 메인 무대' },
  { title: '댄스 공연', time: '12:30 - 13:00', location: '백양로 메인 무대' },
  { title: '어쿠스틱 공연', time: '13:00 - 13:30', location: '일청담 무대' },
  { title: '힙합 공연', time: '14:00 - 14:30', location: '백양로 메인 무대' },
  { title: '보컬 공연', time: '15:00 - 15:30', location: '백양로 메인 무대' },
] as const;

export default function PerformanceTimeline() {
  return (
    <section className="flex flex-col gap-4 py-6">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-knu-red" />
        <h3 className="typo-heading-2 text-knu-gray">축하 공연</h3>
      </div>

      <div className="flex flex-col gap-4">
        {PERFORMANCES.map((item) => (
          <div
            key={`${item.title}-${item.time}`}
            className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-knu-red/10">
              <FiMusic className="h-6 w-6 text-knu-red" />
            </span>
            <div>
              <h4 className="typo-heading-3 text-knu-gray">{item.title}</h4>
              <p className="typo-body-2 mt-1 text-text-muted">{item.time}</p>
              <p className="typo-body-2 mt-1 text-text-muted">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
