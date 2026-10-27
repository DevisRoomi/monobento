import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2000) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), timeout);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }, [timeout]);

  return { hasCopied, copy };
};
