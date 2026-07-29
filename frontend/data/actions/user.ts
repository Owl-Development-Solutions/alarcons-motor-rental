"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import { ActionResult, serverFetch } from "../models";
import {
  AdminUser,
  AdminUserInput,
  AdminUsersResponse,
  GetUserResponse,
} from "../models/user.model";
import { CarRentalErrors } from "../errors/car-rental.errors";

export const getCurrentUser = async (): Promise<GetUserResponse | null> => {
  const token = (await cookies()).get("auth_token")?.value;

  // No token means user isn't signed in.
  if (!token) {
    return null;
  }

  try {
    return await serverFetch<GetUserResponse>("/me", {}, token);
  } catch (error) {
    const domainError = toDomainError(error);

    // Token is invalid or expired.
    if (domainError instanceof CarRentalErrors.UnauthorizedError) {
      return null;
    }

    throw domainError;
  }
};

export const getAdminUsers = async (
  search = "",
): Promise<AdminUsersResponse> => {
  const token = (await cookies()).get("auth_token")?.value;
  return serverFetch<AdminUsersResponse>(
    `/admin/users?${new URLSearchParams({ search }).toString()}`,
    { method: "GET" },
    token,
  );
};

export const createAdminUser = async (
  data: AdminUserInput,
): Promise<ActionResult<AdminUser>> =>
  adminUserMutation("/admin/users", "POST", data);

export const updateAdminUser = async (
  id: number,
  data: AdminUserInput,
): Promise<ActionResult<AdminUser>> =>
  adminUserMutation(`/admin/users/${id}`, "PUT", data);

export const deleteAdminUser = async (
  id: number,
): Promise<ActionResult<{ message: string }>> =>
  adminUserMutation(`/admin/users/${id}`, "DELETE");

async function adminUserMutation<T>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  data?: AdminUserInput,
): Promise<ActionResult<T>> {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const response = await serverFetch<{ data?: T; message?: string }>(
      url,
      { method, data },
      token,
    );
    return {
      success: true,
      data: response.data as T,
      message: response.message ?? "User saved.",
    };
  } catch (error) {
    return { success: false, message: toDomainError(error).message };
  }
}
