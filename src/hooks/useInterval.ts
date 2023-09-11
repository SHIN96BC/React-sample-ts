import {useEffect, useRef} from 'react';

/**
 * setInterval을 react용으로 변경한 custom hook 입니다.
 */

const useInterval = (handler: () => void, timeout: number) => {
  const savedCallback = useRef<() => void>(() => {});

  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  useEffect(() => {
    const newInterval = () => {
      savedCallback.current();
    };

    if (timeout) {
      const interval = setInterval(newInterval, timeout);
      return () => clearInterval(interval);
    }
  }, [timeout]);
};

export default useInterval;
