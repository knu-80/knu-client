export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold">경북대학교 가두모집 안내</div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            KNU
          </span>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
        <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Street Recruitment
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight">
            2026학년도 가두모집 일정과 안내를 한곳에서 확인하세요.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            모집 일정, 지원 자격, 상담 위치, 준비 서류 등 가두모집에 필요한 정보를 정리해두는
            공간입니다. 실제 내용은 추후 업데이트 예정입니다.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: '모집 일정',
              desc: '상담 운영 기간과 세부 일정 정보를 정리합니다.',
            },
            {
              title: '지원 방법',
              desc: '현장 상담 진행 방식과 제출 서류를 안내합니다.',
            },
            {
              title: '문의',
              desc: '연락처, 위치, 운영 시간 등 문의 정보를 제공합니다.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
