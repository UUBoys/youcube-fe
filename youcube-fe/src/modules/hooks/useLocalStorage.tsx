import { setCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";

export function useCookie<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(() => {
    // Read the cookie value
    const cookies = parseCookies();
    const stored = cookies[key];
    return stored ? JSON.parse(stored) : fallbackValue;
  });

  useEffect(() => {
    // Set the cookie value
    setCookie(undefined, key, JSON.stringify(value), {
      path: "/",
      priority: "high",
      maxAge: 60 * 60 * 24 * 7,
    });
  }, [key, value]);

  return [value, setValue] as const;
}
