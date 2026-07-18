import { bookingFormSchema } from "@/lib/validator";
import z from "zod";

export type BookingFormValues = z.infer<typeof bookingFormSchema> & {
  vehicle_id: number;
};
