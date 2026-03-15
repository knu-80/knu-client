import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_title?: string;
      },
    ) => void;
  }
}

export const useGAPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('config', import.meta.env.VITE_GA_ID, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
};
