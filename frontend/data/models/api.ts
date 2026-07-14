import axios, { AxiosRequestConfig } from "axios";
// Removed server-only import; token will be read from document.cookie in client environments

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://127.0.0.1:8000/api/v1";

// Helper to determine if we are running in the browser
const isClient = typeof window !== "undefined";

// Helper to get appropriate base URL: empty for client (relative), absolute for server
const getBaseUrl = () => (isClient ? "" : BASE_URL);

export async function serverFetch<T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  // Retrieve auth token from cookies (client‑side) if available
  let token: string | undefined;
  if (isClient) {
    const match = document.cookie.match(/auth_token=([^;]+)/);
    token = match ? match[1] : undefined;
  } else {
    // Server‑side fallback – keep existing logic (requires next/headers which is now optional)
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { cookies } = require("next/headers");
      token = (await cookies()).get("auth_token")?.value;
    } catch (_) {
      token = undefined;
    }
  }

  const normalizedBaseUrl = getBaseUrl().replace(/\/+$/, "");
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

  const res = await axios.request<T>({
    baseURL: normalizedBaseUrl,
    url: normalizedUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    },
    ...config,
  });

  return res.data;
}
