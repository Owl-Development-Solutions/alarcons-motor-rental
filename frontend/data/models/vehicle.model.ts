import z from "zod";
import { PaginatedResponse } from "./paginated.model";
import { createVehicleSchema, updateVehicleSchema } from "@/lib/validator";

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;

export interface VehicleResponse {
  vehicles: PaginatedResponse<Vehicle>;
  counts: {
    all: number;
    available: number;
    booked: number;
    maintenance: number;
    unavailable: number;
  };
}

export interface VehicleDetailResponse {
  data: Vehicle;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  vehicle_type: string;
  plate_number: string;
  vin: string;
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  doors: number;
  engine_displacement_cc: number;
  color: string;
  mileage: number;
  daily_rate: number;
  currency: string;
  vehicle_status: string;
  vehicle_availability: string;
  features: string[];
  images: string[];
  insurance: VehicleInsurance;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface VehicleInsurance {
  provider: string;
  expires_at: Date;
  policy_number: string;
}
