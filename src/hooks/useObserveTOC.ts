import { useEffect, useRef, useState } from 'react';

export default function useObserveTOC() {
  const observer = useRef<IntersectionObserver | null>();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleObsever: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId((entry.target as HTMLElement).dataset.id!);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '0% 0% -35% 0px',
    });

    const elements = document.querySelectorAll('h2, h3, h4');
    elements.forEach((elem) => observer.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
