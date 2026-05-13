import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    : "";

export const http = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { "X-Client": "hackuva-blog" },
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined") {
      console.warn("[http] request failed:", err?.message);
    }
    return Promise.reject(err);
  },
);
