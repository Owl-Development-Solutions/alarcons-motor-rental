import { CarIcon, LucideIcon, Motorbike, Truck } from "lucide-react";

export const AVAILABILITY_STYLE: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-800 border-emerald-200",
  reserved: "bg-blue-100 text-blue-800 border-blue-200",
  rented: "bg-orange-100 text-orange-800 border-orange-200",
  maintenance: "bg-amber-100 text-amber-800 border-amber-200",
  unavailable: "bg-gray-100 text-gray-700 border-gray-200",
};

export const FLEET_STATUS_STYLE: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
};

export const TYPE_ICON: Record<string, LucideIcon> = {
  car: CarIcon,
  van: Truck,
  truck: Truck,
  motorcycle: Motorbike,
};

export function currency(amount: string | number, code: string) {
  const n = Number(amount);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: code || "PHP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function bookLabel(vehicleType: string) {
  if (vehicleType === "motorcycle") return "Book a motorcycle";
  if (vehicleType === "van") return "Book a van";
  if (vehicleType === "truck") return "Book a truck";
  return "Book a car";
}
