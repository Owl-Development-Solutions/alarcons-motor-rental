import parsePhoneNumberFromString from "libphonenumber-js";
import z from "zod";

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
