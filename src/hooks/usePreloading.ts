import Router from 'next/router';
import { useEffect, useState } from 'react';

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null;

    const routeEventStart = () => {
      timer = setTimeout(() => {
        setIsPageLoading(true);
      }, 400);
    };
    const routeEventEnd = () => {
      clearTimeout(timer!);
      timer = null;

      setIsPageLoading(false);
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);

    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);

  return isPageLoading;
};
