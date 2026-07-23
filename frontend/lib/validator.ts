import parsePhoneNumberFromString from "libphonenumber-js";
import z from "zod";
import {
  carCategoryConfig,
  motorcycleCategoryConfig,
  vehicleTypeConfig,
} from "./utils";

const vehicleTypeValues = Object.keys(vehicleTypeConfig) as [
  keyof typeof vehicleTypeConfig,
  ...(keyof typeof vehicleTypeConfig)[],
];

const vehicleCategoryValues = [
  ...Object.keys(carCategoryConfig),
  ...Object.keys(motorcycleCategoryConfig),
] as [string, ...string[]];

// schema for phone number PH
export const zPhone = z.string().refine((arg) => {
  const phone = parsePhoneNumberFromString(arg, {
    defaultCountry: "PH",
    extract: false,
  });

  return phone && phone.isValid();
}, "Invalid phone number");

//Schema for signing users
export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpFormSchema = z
  .object({
    first_name: z.string().min(3, "First name must be at least 3 characters"),
    last_name: z.string().min(3, "Last name must be at least 3 characters"),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    phone_number: zPhone,
    address: z.string().min(3, "Address must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6  characters"),
    password_confirmation: z
      .string()
      .min(6, "Confirm password must be at least 6  characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password don't match",
    path: ["password_confirmation"],
  });

export const bookingFormSchema = z.object({
  pickup_datetime: z.string().min(1, "Pickup date & time is required"),
  dropoff_datetime: z.string().min(1, "Drop-off date & time is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  company_name: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  phone: zPhone,
  email: z.email("Enter a valid email"),
  order_notes: z.string().optional(),
});

export const VehicleInsuranceSchema = z.object({
  provider: z.string(),
  expires_at: z.string(),
  policy_number: z.string(),
});

export const createVehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .int("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
  plate_number: z.string().optional(),
  vin: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  transmission: z.string().min(1, "Transmission is required"),
  fuel_type: z.string().min(1, "Fuel type is required"),
  seats: z.coerce
    .number()
    .int("Seats must be a whole number")
    .positive("Seats must be greater than 0")
    .optional(),
  doors: z.coerce
    .number()
    .int("Doors must be a whole number")
    .positive("Doors must be greater than 0")
    .optional(),
  engine_displacement_cc: z.coerce.number().optional(),
  color: z.string().min(1, "Color is required"),
  mileage: z.coerce
    .number()
    .nonnegative("Mileage cannot be negative")
    .optional(),
  daily_rate: z.coerce.string().min(1, "Daily rate is required"),
  currency: z.string().optional(),
  vehicle_status: z.string().min(1, "Vehicle status is required"),
  vehicle_availability: z.string().min(1, "Vehicle availability is required"),
  features: z.array(z.string()).optional(),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  insurance: VehicleInsuranceSchema.optional(),
  description: z.string().optional(),
});

export const updateVehicleSchema = createVehicleSchema.extend({
  id: z.number().min(1, "Id is required"),
});
