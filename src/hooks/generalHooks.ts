import { useEffect, useRef } from 'react';

export const useScrollToBottomElement = (deps: any[]) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.children.length === 0) return;
    const childs = ref.current.children;
    const lastChild = childs[childs.length - 1];
    lastChild.scrollIntoView({ behavior: 'smooth' });
  }, [deps]);
  return ref;
};
