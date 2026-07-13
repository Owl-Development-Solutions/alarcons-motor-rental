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

    console.log(res);

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};
