import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineLogin } from 'react-icons/hi';
import { ApiClientError, login } from '@/apis';
import { useAdminSessionStore } from '@/stores/adminSessionStore';

function resolveRedirectPath(rawPath: string | null): string {
  if (!rawPath || !rawPath.startsWith('/') || rawPath.startsWith('//')) {
    return '/admin';
  }

  return rawPath;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const status = useAdminSessionStore((state) => state.status);
  const isInitialized = useAdminSessionStore((state) => state.isInitialized);
  const bootstrapSession = useAdminSessionStore((state) => state.bootstrapSession);
  const redirectPath = useMemo(
    () => resolveRedirectPath(searchParams.get('redirect')),
    [searchParams],
  );

  useEffect(() => {
    if (!isInitialized || status === 'idle') {
      void bootstrapSession();
      return;
    }

    if (status === 'authenticated') {
      navigate(redirectPath, { replace: true });
    }
  }, [bootstrapSession, isInitialized, navigate, redirectPath, status]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const trimmedId = id.trim();
    const trimmedPassword = password.trim();

    if (!trimmedId || !trimmedPassword) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const parsedBoothNumber = Number(trimmedId);
      const loginPayload = Number.isInteger(parsedBoothNumber)
        ? { boothNumber: parsedBoothNumber, password: trimmedPassword }
        : { loginId: trimmedId, password: trimmedPassword };

      await login(loginPayload);
      await bootstrapSession();
      navigate(redirectPath, { replace: true });
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.message || '로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.');
      } else {
        setErrorMessage('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-300">
        <div className="text-center mb-8">
          <h1 className="typo-heading-2 text-gray-900 mb-2">관리자 로그인</h1>
          <p className="typo-body-2 text-gray-500">가두모집 관리 시스템에 접속합니다</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="admin-id"
              className="typo-body-2 font-medium text-gray-700 block cursor-pointer"
            >
              관리자 아이디
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <HiOutlineMail className="w-5 h-5" />
              </span>
              <input
                id="admin-id"
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  if (errorMessage) {
                    setErrorMessage('');
                  }
                }}
                className="typo-body-2 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-knu-red focus:border-knu-red transition-all"
                placeholder="ID를 입력하세요"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="typo-body-2 font-medium text-gray-700 block cursor-pointer"
            >
              비밀번호
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <HiOutlineLockClosed className="w-5 h-5" />
              </span>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) {
                    setErrorMessage('');
                  }
                }}
                className="typo-body-2 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-knu-red focus:border-knu-red transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {errorMessage && (
            <p className="typo-body-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="typo-body-2 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm font-semibold text-white bg-knu-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-knu-red transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
            <HiOutlineLogin className="ml-2 w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="typo-caption typo-muted">
            계정 정보를 분실하셨나요? <br />
            총동연 또는 서비스 개발진에게 문의하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
