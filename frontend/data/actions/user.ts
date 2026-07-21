"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import { serverFetch } from "../models";
import { GetUserResponse } from "../models/user.model";
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
