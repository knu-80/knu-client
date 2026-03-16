import * as Sentry from '@sentry/react';

const isProd = import.meta.env.MODE === 'production';

if (isProd) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', import.meta.env.VITE_API_BASE_URL],

    ignoreErrors: ['Java object is gone', 'Error invoking postMessage', 'Request aborted'],
  });
}
