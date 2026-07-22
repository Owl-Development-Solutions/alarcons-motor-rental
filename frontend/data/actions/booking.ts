"use server";

import { revalidatePath } from "next/cache";
import { toDomainError } from "../errors/domain.error";
import {
  Booking,
  CreateBookingInput,
  GetUserBookingResponse,
  serverFetch,
} from "../models";
import { BookingFormValues } from "../models/booking";
import { cookies } from "next/headers";

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
