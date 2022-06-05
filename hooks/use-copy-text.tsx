import { useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

interface CopyText {
  handleCopy: (text: string) => void;
  hasCopied: boolean;
}

export default function useCopyText(): CopyText {
  const [, copyToClipboard] = useCopyToClipboard();
  const [noticationKey, setNotificationKey] = useState<number>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleCopy = useCallback(
    (text: string) => {
      setHasCopied(true);
      setNotificationKey(Date.now());
      copyToClipboard(text);
    },
    [setHasCopied, setNotificationKey, copyToClipboard]
  );

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  }, [noticationKey]);

  return { handleCopy, hasCopied };
}
