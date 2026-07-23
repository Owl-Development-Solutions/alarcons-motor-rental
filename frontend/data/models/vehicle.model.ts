import z from "zod";
import { Paginated } from "./paginated.model";
import { createVehicleSchema, updateVehicleSchema } from "@/lib/validator";

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;

export interface VehicleResponse extends Paginated {
  data: Vehicle[];
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
  created_at: string;
  updated_at: string;
}

export interface VehicleInsurance {
  provider: string;
  expires_at: string;
  policy_number: string;
}
