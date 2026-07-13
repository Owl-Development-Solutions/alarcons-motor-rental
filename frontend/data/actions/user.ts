"use server";

import { toDomainError } from "../errors/domain.error";
import { serverFetch } from "../models";
import { GetUserResponse } from "../models/user.model";

export const getCurrentUser = async (): Promise<GetUserResponse> => {
  try {
    const res = await serverFetch<GetUserResponse>("/me");
    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};
