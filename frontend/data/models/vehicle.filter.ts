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
