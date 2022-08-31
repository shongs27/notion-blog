import { useEffect, useState } from 'react';
import { ISelectors } from '../types';

export default function useElements() {
  const [elements, setElements] = useState<ISelectors[]>([]);

  useEffect(() => {
    const selectors = [...document.querySelectorAll('h1, h2, h3')].map((node, index) => ({
      id: index,
      title: (node as HTMLElement).innerText,
      level: Number(node.nodeName[1]),
    }));
    setElements(selectors);
  }, []);

  return elements;
}
