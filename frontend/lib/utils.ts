import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const PAGE_SIZE = 10;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
}

//format date and time
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

/**
 * Builds the list of page numbers to render, collapsing long ranges
 * down to first/last + a window around the current page, with "…"
 * markers (as the string "ellipsis") wherever pages are skipped.
 */
export function getPageRange(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

// Generic helper: turns any "config object" shaped like
// { key: { label: string } } into [{ label, value: key }, ...]
export function toOptions<T extends Record<string, { label: string }>>(
  config: T,
): { label: string; value: keyof T }[] {
  return (Object.entries(config) as [keyof T, { label: string }][]).map(
    ([value, { label }]) => ({ label, value }),
  );
}

export const vehicleAvailabilityConfig = {
  available: {
    label: "Available",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900",
  },
  rented: {
    label: "Rented",
    className:
      "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-900",
  },
  reserved: {
    label: "Reserved",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900",
  },
  maintenance: {
    label: "Maintenance",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-900",
  },
  unavailable: {
    label: "Unavailable",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900",
  },
} as const;

export type VehicleAvailability = keyof typeof vehicleAvailabilityConfig;

export const vehicleStatusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-700",
  },
  retired: {
    label: "Retired",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900",
  },
} as const;

export type VehicleStatus = keyof typeof vehicleStatusConfig;

export const carCategoryConfig = {
  sedan: { label: "Sedan" },
  suv: { label: "SUV" },
  hatchback: { label: "Hatchback" },
  pickup: { label: "Pickup" },
  van: { label: "Van" },
} as const;

export const motorcycleCategoryConfig = {
  scooter: { label: "Scooter" },
  underbone: { label: "Underbone" },
  sport: { label: "Sport" },
  cruiser: { label: "Cruiser" },
  adventure: { label: "Adventure" },
} as const;

export type CarCategory = keyof typeof carCategoryConfig;
export type MotorcycleCategory = keyof typeof motorcycleCategoryConfig;
export type VehicleCategory = CarCategory | MotorcycleCategory;

export const vehicleTypeConfig = {
  car: {
    label: "Car",
  },
  motorcycle: {
    label: "Motorcycle",
  },
} as const;

export type VehicleType = keyof typeof vehicleTypeConfig;

export const carCategoryOptions = toOptions(carCategoryConfig);
export const motorcycleCategoryOptions = toOptions(motorcycleCategoryConfig);
export const vehicleCategoryOptions = [
  ...carCategoryOptions,
  ...motorcycleCategoryOptions,
];
