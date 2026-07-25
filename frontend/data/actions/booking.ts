"use server";

import { revalidatePath } from "next/cache";
import { toDomainError } from "../errors/domain.error";
import {
  ActionResult,
  Booking,
  BookingResponse,
  CreateBookingInput,
  GetUserBookingResponse,
  serverFetch,
} from "../models";
import { BookingFormValues } from "../models/booking";
import { cookies } from "next/headers";
import { BookingFilters } from "../models/filter.model";

/**
 * Create a booking for a vehicle, guarding against overlapping bookings.
 * Starts as 'pending' until an admin confirms it.
 * @throws {BookingException} if the vehicle is missing, unavailable, or double-booked.
 */
export const createBooking = async (
  data: BookingFormValues,
): Promise<{ message: string }> => {
  //bookings->post
  try {
    const res = await serverFetch<{ message: string }>("/bookings", {
      method: "POST",
      data,
    });

    revalidatePath(`/vehicle/${data.vehicle_id}`);

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const getUserOrGuestBooking = async (
  page: number = 1,
  perPage: number = 10,
): Promise<GetUserBookingResponse | null> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await serverFetch<GetUserBookingResponse>(
      `/bookings?page=${page}&per_page=${perPage}`,
      {
        method: "GET",
      },
      token,
    );

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const getAllUsersBooking = async (
  filters: BookingFilters = {},
): Promise<BookingResponse> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    const query = params.toString();

    return await serverFetch<BookingResponse>(
      `/admin/bookings${query ? `?${query}` : ""}`,
      {
        method: "GET",
      },
      token,
    );
  } catch (error) {
    throw toDomainError(error);
  }
};

export const markAsPaid = async (
  id: number,
): Promise<ActionResult<{ message: string }>> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await serverFetch<{ message: string }>(
      `/admin/bookings/${id}/mark-as-paid`,
      { method: "PATCH" },
      token,
    );

    revalidatePath(`/admin/bookings`);

    return { success: true, data: res, message: res.message };
  } catch (error) {
    const domainError = toDomainError(error);
    return { success: false, message: domainError.message };
  }
};

export const cancelBooking = async (
  id: number,
): Promise<ActionResult<{ message: string }>> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await serverFetch<{
      message: string;
    }>(
      `/admin/bookings/${id}/cancel`,
      {
        method: "PATCH",
      },
      token,
    );
    revalidatePath(`/admin/bookings`);

    return { success: true, data: res, message: res.message };
  } catch (error) {
    const domainError = toDomainError(error);
    return { success: false, message: domainError.message };
  }
};

export const confirmbooking = async (
  id: number,
): Promise<ActionResult<{ message: string }>> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await serverFetch<{ message: string }>(
      `/admin/bookings/${id}/confirm`,
      {
        method: "PATCH",
      },
      token,
    );
    return { success: true, data: res, message: res.message };
  } catch (error) {
    const domainError = toDomainError(error);
    return { success: false, message: domainError.message };
  }
};
