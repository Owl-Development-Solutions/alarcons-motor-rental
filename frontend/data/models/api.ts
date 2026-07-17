import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function serverFetch<T>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  const token = (await cookies()).get("auth_token")?.value;

  const res = await axios.request<T>({
    baseURL: BASE_URL,
    url,
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
