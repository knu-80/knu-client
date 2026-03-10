import { useState } from 'react';
import { FiX, FiGithub, FiInstagram, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
      <p className="mt-5 text-caption text-knu-gray">© 2026 KNU-80. All Rights Reserved.</p>
      <p
        className="mt-3 text-caption text-gray-400 hover:underline cursor-pointer"
        onClick={() => setIsPrivacyOpen(true)}
      >
        이메일 수집 및 개인정보 처리 안내
      </p>
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-[90%] max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-600 font-medium mb-6">개인정보 처리 안내</h3>
            <p className="text-sm text-gray-700 text-left whitespace-pre-wrap">
              경북대학교 가두모집 서비스 KNU-80은 부스 정보 입력 및 서비스 관련 안내를 위해 부스
              운영진에 한하여 이메일을 수집·처리합니다.
              <br />
              <br />
              <span className="font-medium">수집 항목:</span> 이메일 주소 <br />
              <span className="font-medium">수집 목적:</span> 부스 관련 안내
              <br />
              <span className="font-medium">보관 기간:</span> 수집일로부터 서비스 종료 시까지 <br />
              <br />
              수집된 이메일은 외부로 제공되지 않으며, 안내 목적 외에는 절대 이용되지 않습니다.
            </p>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPrivacyOpen(false)}
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
