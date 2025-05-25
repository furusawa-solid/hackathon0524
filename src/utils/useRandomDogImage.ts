import { useCallback, useState } from 'react';

export const useRandomDogImage = () => {
  const [url, setUrl] = useState<string>('');

  const fetchDogImage = useCallback(async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setUrl(data.message);
    } catch (err) {
      console.error('画像の取得失敗:', err);
    }
  }, []);

  useState(() => {
    fetchDogImage();
  });

  return { url, fetchDogImage };
};
