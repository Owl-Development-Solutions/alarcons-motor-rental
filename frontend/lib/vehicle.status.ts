import { VehicleAvailability, VehicleStatus } from "./utils";

export function toKnownAvailability(availability: string): VehicleAvailability {
  if (
    availability === "available" ||
    availability === "reserved" ||
    availability === "maintenance" ||
    availability === "unavailable" ||
    availability === "rented"
  ) {
    return availability;
  }
  return "unavailable";
}

export function toKnownStatus(status: string): VehicleStatus {
  if (status === "active") {
    return status;
  }
  return "inactive";
}
