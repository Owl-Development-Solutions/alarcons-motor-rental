import { BookingStatus, VehicleStatus } from "@/data/models";

export function toKnownStatus(status: string): VehicleStatus {
  if (
    status === "available" ||
    status === "reserved" ||
    status === "maintenance" ||
    status === "unavailable"
  ) {
    return status;
  }
  return "unavailable";
}

export const STATUS_MESSAGES: Record<
  Exclude<VehicleStatus, "available">,
  string
> = {
  reserved: "This vehicle is already reserved.",
  maintenance: "This vehicle is currently under maintenance.",
  unavailable: "This vehicle is currently unavailable.",
};

export const STATUS_BANNER_CLASSES: Record<
  Exclude<VehicleStatus, "available">,
  string
> = {
  reserved: "bg-orange-50 text-orange-700 border border-orange-200",
  maintenance: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  unavailable: "bg-gray-100 text-gray-600 border border-gray-200",
};

export const STATUS_BADGE_VARIANT: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  confirmed: "default",
  active: "default",
  completed: "outline",
  cancelled: "destructive",
};
