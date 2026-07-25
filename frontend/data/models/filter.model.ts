export interface ParamsSearchProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface VehicleFilters {
  search?: string;
  vehicle_type?: "car" | "motorcycle" | string;
  category?: string;
  transmission?: string;
  fuel_type?: string;
  min_rate?: number;
  max_rate?: number;
  status?: string;
  per_page?: number;
  page?: number;
}

export interface BookingFilters {
  booking_status?: string;
  payment_status?: string;
  country?: string;
  email?: string;
  name?: string;
  pickup_from?: Date;
  pickup_to?: Date;
  dropoff_from?: Date;
  dropoff_to?: Date;
}
