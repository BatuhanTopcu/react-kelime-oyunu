import { useCallback, useEffect, useRef } from 'react';

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

export const useOutsideAlerter = (cb: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cb();
      }
    },
    [cb],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cb();
      }
    },
    [cb],
  );

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [cb, onMouseUp, onKeyDown]);

  return ref;
};
