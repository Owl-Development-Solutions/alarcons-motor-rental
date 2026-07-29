"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import { DashboardData, serverFetch } from "../models";

export async function getAdminDashboard(): Promise<DashboardData> {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const response = await serverFetch<{ data: DashboardData }>(
      "/admin/dashboard",
      { method: "GET" },
      token,
    );

    return response.data;
  } catch (error) {
    throw toDomainError(error);
  }
}
