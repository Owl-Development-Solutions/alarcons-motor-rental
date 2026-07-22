import { BookingStatus } from "@/data/models";

export const BOOKING_STATUS_BADGE_VARIANT: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  confirmed: "default",
  active: "default",
  completed: "outline",
  cancelled: "destructive",
};
