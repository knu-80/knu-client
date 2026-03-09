import { FiX, FiGithub, FiInstagram, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 py-10 text-center text-sm select-none">
      <div className="flex items-center justify-center gap-4 pb-6">
        <a
          href="https://github.com/knu-80"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-full transition border border-gray-400 gap-1 px-2 py-1 text-body-3 hover:bg-gray-100"
        >
          <FiGithub className="h-4 w-4 text-gray-400" />
          만든이들
        </a>

        <a
          href="https://www.instagram.com/knu_dongari/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-full transition border border-gray-400 gap-1 px-2 py-1 text-body-3 hover:bg-gray-100"
        >
          <FiInstagram className="h-4 w-4 text-gray-400" />
          운영진
        </a>

        <a
          href="https://dongari.knu.ac.kr/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-full transition border border-gray-400 gap-1 px-2 py-1 text-body-3 hover:bg-gray-100"
        >
          <FiExternalLink className="h-4 w-4 text-gray-400" />
          방문하기
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1 text-base font-regular text-body-3 text-gray-500">
        <span className="tracking-wide">총동아리연합회</span>
        <FiX />
        <span className="tracking-wide">경북대학교 컴퓨터학부 일부 인원</span>
      </div>
      <p className="mt-5 text-caption text-knu-gray">
        © 2026 KNU Clubs Recruitment. All Rights Reserved.
      </p>
      <p className="mt-3 text-caption text-gray-400 hover:underline cursor-pointer">
        이메일 수집 및 개인정보 처리 안내
      </p>
    </footer>
  );
}
