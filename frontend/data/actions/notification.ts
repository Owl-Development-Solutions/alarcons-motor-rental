"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { toDomainError } from "../errors/domain.error";
import {
  ActionResult,
  AdminNotificationResponse,
  serverFetch,
} from "../models";

export const getAdminNotifications = async (): Promise<AdminNotificationResponse> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    return await serverFetch<AdminNotificationResponse>(
      "/admin/notifications",
      { method: "GET" },
      token,
    );
  } catch (error) {
    throw toDomainError(error);
  }
};

export const markNotificationAsRead = async (
  id: string,
): Promise<ActionResult<{ message: string }>> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const result = await serverFetch<{ message: string }>(
      `/admin/notifications/${id}/read`,
      { method: "PATCH" },
      token,
    );

    revalidatePath("/admin", "layout");

    return { success: true, data: result, message: result.message };
  } catch (error) {
    return { success: false, message: toDomainError(error).message };
  }
};
