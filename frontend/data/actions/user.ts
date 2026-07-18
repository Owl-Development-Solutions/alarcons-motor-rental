"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import { serverFetch } from "../models";
import { GetUserResponse } from "../models/user.model";

export const getCurrentUser = async (): Promise<GetUserResponse> => {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const res = await serverFetch<GetUserResponse>("/me", {}, token);
    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};
