"use server";

import { revalidatePath } from "next/cache";
import { toDomainError } from "../errors/domain.error";
import { Booking, CreateBookingInput, serverFetch } from "../models";
import { BookingFormValues } from "../models/booking";

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
