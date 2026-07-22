import { Paginated } from "./paginated.model";

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
  engine_displacement_cc: number | null;
  color: string;
  mileage: number;
  daily_rate: string;
  currency: string;
  status: string;
  features: string[];
  images: string[];
  insurance: VehicleInsurance;
  created_at: string;
  updated_at: string;
}

export interface VehicleInsurance {
  provider: string;
  expires_at: string;
  policy_number: string;
}
