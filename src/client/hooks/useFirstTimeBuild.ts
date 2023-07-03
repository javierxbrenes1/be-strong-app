import { useEffect, useRef } from 'react';

const useFirstTimeBuild = () => {
  const isFirstTime = useRef(true);

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
    }
  }, []);

  return isFirstTime.current;
};

export default useFirstTimeBuild;
