import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    //cleanup fn

    return () => {
      clearTimeout(timerId);
    };
  }, [delay, value]);

  return debounceValue;
}
