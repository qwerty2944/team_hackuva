"use client";

import { useEffect, useState } from "react";

/** 값이 멈춘 뒤 `delay`ms 지나야 반영되는 디바운스 값. */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
