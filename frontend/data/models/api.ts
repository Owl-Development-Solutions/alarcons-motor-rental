import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://127.0.0.1:8000/api/v1";

export async function serverFetch<T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  const token = (await cookies()).get("auth_token")?.value;
  const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
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
