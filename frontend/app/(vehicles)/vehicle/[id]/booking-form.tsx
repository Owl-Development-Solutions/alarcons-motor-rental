"use client";

import CountryCombobox from "@/components/shared/country-combo-box";
import { DateTimePickerField } from "@/components/shared/date-time-picker";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/data/actions/booking";
import { Country, CreateBookingInput, Vehicle } from "@/data/models";
import { BookingFormValues } from "@/data/models/booking";
import { toastStyles } from "@/lib/toast.style";
import { cn } from "@/lib/utils";
import { bookingFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const inputClass =
  "w-full rounded-lg border px-3 py-2.5 text-sm border-gray-300 dark:border-slate-600 " +
  "bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 " +
  "dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 " +
  "transition-shadow";

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5";

const BookingForm = ({
  vehicle,
  country,
}: {
  vehicle: Vehicle;
  country: Country[];
}) => {
  const bookingForm = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pickup_datetime: "",
      dropoff_datetime: "",
      first_name: "",
      last_name: "",
      company_name: "",
      country: "",
      street_address: "",
      city: "",
      postcode: "",
      phone: "",
      email: "",
      order_notes: "",
    },
  });

  const onBookingSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
    const data: BookingFormValues = {
      ...values,
      vehicle_id: vehicle.id,
    };

    try {
      const res = await createBooking(data);

      if (res.message) {
        toast.success(res.message, {
          position: "bottom-right",
          style: toastStyles.success,
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { position: "bottom-right", style: toastStyles.error },
      );
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 sm:p-8 scroll-mt-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Booking details
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Reserve the {vehicle.make} {vehicle.model} for your trip.
        </p>
      </div>

      <form
        id="booking-form"
        onSubmit={bookingForm.handleSubmit(onBookingSubmit)}
        className="space-y-8"
      >
        {/* Rental schedule */}

        <FieldGroup>
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-slate-400">
              Rental schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="pickup_datetime"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <>
                    <DateTimePickerField
                      id="pickup"
                      dateLabel="Pick-up Date"
                      timeLabel="Pick-up Time"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disablePast
                      invalid={fieldState.invalid}
                      invalidMessage={fieldState.error?.message}
                    />
                  </>
                )}
              />

              <Controller
                name="dropoff_datetime"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <>
                    <DateTimePickerField
                      id="dropoff"
                      dateLabel="Drop-off Date"
                      timeLabel="Drop-off Time"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disablePast
                      invalid={fieldState.invalid}
                      invalidMessage={fieldState.error?.message}
                    />
                  </>
                )}
              />
            </div>
          </div>

          {/* Personal info */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-slate-400">
              Personal information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="first_name"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>First Name</FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Juan"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="last_name"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>Last Name</FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Dela Cruz"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="company_name"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>
                      Company
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        (Optional)
                      </span>
                    </FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Company / Organization"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-slate-400">
              Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="street_address"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>
                      Street Address
                    </FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="123 Osmeña Blvd"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="city"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>City</FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Cebu City"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="postcode"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>Postal Code</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="6000"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={bookingForm.control}
                name="country"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>Country</FieldLabel>

                    <CountryCombobox
                      countries={country}
                      value={field.value}
                      onChange={field.onChange}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500!"
                      />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-slate-400">
              Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="phone"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>Phone Number</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter user phone number"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={bookingForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={labelClass}>Email</FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter email"
                      className={cn(inputClass)}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-500"
                      />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          {/* Notes */}
          <Controller
            name="order_notes"
            control={bookingForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className={labelClass}>Notes</FieldLabel>
                <Textarea
                  placeholder="Enter description"
                  {...field}
                  className={cn(inputClass)}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
            )}
          />

          <div>
            <Button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 transition-colors"
            >
              {bookingForm.formState.isSubmitting
                ? "Booking..."
                : "Confirm booking"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};

export default BookingForm;
