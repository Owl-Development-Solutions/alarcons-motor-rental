"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import { serverFetch } from "../models";
import { LoginUser, RegisterUser } from "../models/auth";
import { LoginResponse } from "../models/user.model";

export const registerUser = async (
  data: RegisterUser,
): Promise<{ message: string }> => {
  try {
    const res = await serverFetch<{ message: string }>("/auth/register", {
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const loginUser = async (data: LoginUser): Promise<LoginResponse> => {
  try {
    const res = await serverFetch<LoginResponse>("/auth/login", {
      method: "POST",
      data,
    });

    (await cookies()).set("auth_token", res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const res = await serverFetch<{ message: string }>("/logout", {
      method: "POST",
    });

    (await cookies()).delete("auth_token");
    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<{ message: string }> => {
  try {
    return await serverFetch<{ message: string }>('/auth/change-password', {
      method: 'POST',
      data,
    });
  } catch (error) {
    throw toDomainError(error);
  }
};

export const updateProfile = async (data: Partial<{
  first_name: string;
  middle_name: string | null;
  last_name: string;
  birth_date: string | null;
  gender: string | null;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  drivers_license_number: string | null;
  license_expiry: string | null;
  license_image: string | null;
}>): Promise<{ message: string; user: any }> => {
  try {
    return await serverFetch<{ message: string; user: any }>('/auth/profile', {
      method: 'PUT',
      data,
    });
  } catch (error) {
    throw toDomainError(error);
  }
};
