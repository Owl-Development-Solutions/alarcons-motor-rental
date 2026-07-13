export interface VehicleResponse {
  current_page: number;
  data: Vehicle[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  link: VehicleReponseLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
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

export interface VehicleReponseLinks {
  url: string;
  label: string;
  page: number;
  active: boolean;
}

export interface VehicleInsurance {
  provider: string;
  expires_at: string;
  policy_number: string;
}
