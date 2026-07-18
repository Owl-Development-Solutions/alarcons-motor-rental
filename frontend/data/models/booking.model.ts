import { User } from "./user.model";
import { Vehicle } from "./vehicle.model";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export type VehicleStatus =
  | "available"
  | "reserved"
  | "maintenance"
  | "unavailable";

export const BLOCKING_BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "active",
];

export interface Booking {
  id: number;
  user_id: number;
  vehicle_id: number;
  pickup_datetime: string;
  dropoff_datetime: string;
  total_days: number;
  daily_rate: number;
  total_amount: number;
  status: BookingStatus;

  first_name: string;
  last_name: string;
  company_name: string | null;
  country: string;
  street_address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  order_notes: string | null;

  created_at: string;
  updated_at: string;

  vehicle?: Vehicle;
  user?: User;
}

export interface CreateBookingInput {
  vehicle_id: number;
  user_id?: number;
  pickup_datetime: string;
  dropoff_datetime: string;
  first_name: string;
  last_name: string;
  company_name?: string | null;
  country: string;
  street_address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  order_notes?: string | null;
}
