import { CarIcon, LucideIcon, Motorbike, Truck } from "lucide-react";

export const STATUS_STYLE: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rented: "bg-rose-100 text-rose-800 border-rose-200",
  maintenance: "bg-amber-100 text-amber-800 border-amber-200",
};

export const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  rented: "Booked",
  maintenance: "In maintenance",
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
