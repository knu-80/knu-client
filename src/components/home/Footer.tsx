import { FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 py-8 text-center text-sm text-text-muted">
      <div className="flex flex-wrap items-center justify-center gap-3 text-base font-semibold text-knu-gray">
        <span className="tracking-wide">총동아리연합회</span>
        <span className="text-text-muted">×</span>
        <span className="tracking-wide">경북대학교 컴퓨터학부 일행</span>
      </div>

      <p className="mt-3 text-sm text-knu-gray">경북대 이메일 수집 및 개인정보 처리 안내</p>
      <p className="mt-1 text-xs text-text-muted">
        © 2026 KNU Clubs Recruitment. All Rights Reserved.
      </p>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
        <a
          href="https://github.com/knu-80"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-knu-gray transition hover:bg-gray-100"
        >
          <FiGithub className="h-4 w-4" />
          만든이들
        </a>
      </div>
    </footer>
  );
}
