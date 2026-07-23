"use client";

import { Vehicle, VehicleInsurance } from "@/data/models";
import { ArrowLeft, X, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { createVehicleSchema, updateVehicleSchema } from "@/lib/validator";
import z from "zod";
import { VehicleCategory, vehicleCategoryOptions } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { toast } from "sonner";
import { deleteImage } from "@/data/actions/upload-thing";
import { UploadButton } from "@/lib/uploadthing";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVehicle, updateVehicle } from "@/data/actions/vehicle";
import { useRouter } from "next/navigation";
import { CarRentalErrors } from "@/data/errors/car-rental.errors";
import { useState } from "react";

const inputClasses =
  "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

const AdminAddVehicleForm = ({
  type,
  vehicle,
}: {
  type: "Create" | "Update";
  vehicle?: Vehicle;
}) => {
  const router = useRouter();

  const defaultVehicleInsurance: VehicleInsurance = {
    provider: "",
    expires_at: "",
    policy_number: "",
  };

  const defaultVehicleValues = {
    make: "",
    model: "",
    year: 0,
    vehicle_type: "",
    plate_number: "",
    vin: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seats: 0,
    doors: 0,
    engine_displacement_cc: 0,
    color: "",
    mileage: 0,
    daily_rate: 0,
    currency: "USD",
    vehicle_status: "",
    vehicle_availability: "",
    features: [],
    images: [],
    insurance: defaultVehicleInsurance,
    description: "",
    created_at: "",
    updated_at: "",
  };

  const form = useForm<z.infer<typeof createVehicleSchema>>({
    resolver: zodResolver(
      type === "Update" ? updateVehicleSchema : createVehicleSchema,
    ) as Resolver<z.infer<typeof createVehicleSchema>>,
    defaultValues:
      vehicle && type === "Update" ? vehicle : defaultVehicleValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof createVehicleSchema>> = async (
    values,
  ) => {
    try {
      if (type === "Create") {
        const res = await createVehicle(values);
        toast.success(res.message);
        router.push("/admin/vehicles");
        return;
      }

      if (type === "Update") {
        if (!vehicle?.id) {
          router.push("/admin/vehicles");
          return;
        }

        const res = await updateVehicle({ ...values, id: vehicle.id });
        toast.success(res.message);
        router.push("/admin/vehicles");
        return;
      }
    } catch (error) {
      if (error instanceof CarRentalErrors.ValidationError) {
        // map Laravel's field-level errors directly onto the form inputs
        Object.entries(error.fields).forEach(([field, messages]) => {
          form.setError(field as keyof z.infer<typeof createVehicleSchema>, {
            message: messages[0],
          });
        });
        toast.error(error.message, {
          style: {
            background: "#fef2f2", // red-50
            color: "#991b1b", // red-800
            border: "1px solid #fecaca", // red-200
          },
        });
        return;
      }

      if (error instanceof CarRentalErrors.NotFoundError) {
        toast.error(error.message, {
          style: {
            background: "#fef2f2", // red-50
            color: "#991b1b", // red-800
            border: "1px solid #fecaca", // red-200
          },
        });
        router.push("/admin/vehicles");
        return;
      }

      if (error instanceof CarRentalErrors.UnauthorizedError) {
        toast.error("Session expired. Please log in again.", {
          style: {
            background: "#fef2f2", // red-50
            color: "#991b1b", // red-800
            border: "1px solid #fecaca", // red-200
          },
        });
        router.push("/login");
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
        {
          style: {
            background: "#fef2f2", // red-50
            color: "#991b1b", // red-800
            border: "1px solid #fecaca", // red-200
          },
        },
      );
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const images = form.watch("images") as string[];
  const vehicleType = form.watch("vehicle_type");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onError)}
      className="p-6 space-y-6"
    >
      <FieldGroup>
        <div className="flex flex-col md:flex-row gap-5">
          {/* IMAGES */}
          <Controller
            control={form.control}
            name="images"
            render={() => (
              <Card className="w-full ">
                <CardHeader>
                  <CardTitle>Vehicle Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 mt-2 min-h-48 ">
                  <div className="flex flex-wrap gap-2">
                    {images!.map((image: string, idx: number) => (
                      <div key={image} className="relative group">
                        <Image
                          src={image}
                          alt={`vehicle-image-${idx}`}
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          width={100}
                          height={100}
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const result = await deleteImage(image);

                              if (result.success) {
                                const newImages = images?.filter(
                                  (_, i) => i !== idx,
                                );
                                form.setValue("images", newImages);
                                toast.success("Image removed successfully");
                              } else {
                                toast.error(result.message);
                              }
                            } catch (error) {
                              toast.error("Failed to remove the image");
                            }
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center  transition-colors "
                          aria-label="Remove image"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}

                    <Field>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          const newUrls = res.map((item) => item.url);
                          form.setValue("images", [...images, ...newUrls]);
                        }}
                        onUploadError={(err: Error) => {
                          toast.error(`ERROR! ${err.message}`);
                        }}
                        appearance={{
                          button:
                            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-sm bg-orange-400 bg-none after:bg-orange-400 p-4",

                          allowedContent:
                            "flex h-8 flex-col items-center justify-center px-2 dark:text-white",
                        }}
                      />
                    </Field>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Controller
            name="make"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "make"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Vehicle Make
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Toyota, Nissan, Honda)
                  </span>
                </FieldLabel>

                <Input
                  type="text"
                  placeholder="Toyota"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="model"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "model"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Model</FieldLabel>

                <Input
                  type="text"
                  placeholder="vios"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="year"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "year"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Year</FieldLabel>

                <Input
                  type="number"
                  placeholder="2023"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="vehicle_type"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "vehicle_type"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Type</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="form-rhf-select-language"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="bg-orange-300 dark:text-slate-700"
                  >
                    <SelectItem value="car">car</SelectItem>
                    <SelectItem value="motorcycle">motorcycle</SelectItem>
                  </SelectContent>
                </Select>
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
            name="category"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "category"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Category</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="form-rhf-select-language"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="bg-orange-300 dark:text-slate-700"
                  >
                    {vehicleCategoryOptions.map((cat, idx) => (
                      <SelectItem key={idx} value={cat.value}>
                        {cat.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            name="plate_number"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "plate_number"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Vehicle Plate Number
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="ABC-123422"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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

        <div className="mt-2 grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Controller
            name="vin"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "vin"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Vin / Chassis Number
                  <span className="text-xs font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="1HGCM82633A004322"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="transmission"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "transmission"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Transmission</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="form-rhf-select-language"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="bg-orange-300 dark:text-slate-700"
                  >
                    <SelectItem value="automatic">automatic</SelectItem>
                    <SelectItem value="manual">manual</SelectItem>
                    <SelectItem value="electric">electric</SelectItem>
                  </SelectContent>
                </Select>

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
            name="fuel_type"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "fuel_type"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Fuel Type</FieldLabel>

                <Input
                  type="text"
                  placeholder="gasoline"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="seats"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "seats"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Number of seats</FieldLabel>

                <Input
                  type="number"
                  placeholder="4"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="doors"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "doors"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Number of doors</FieldLabel>

                <Input
                  type="number"
                  placeholder="4"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="engine_displacement_cc"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "engine_displacement_cc"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Engine displacement CC</FieldLabel>

                <Input
                  type="number"
                  placeholder="1399"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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

        <div className="mt-2 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Controller
            name="color"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "color"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Color</FieldLabel>

                <Input
                  type="text"
                  placeholder="White"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="mileage"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "mileage"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Mileage</FieldLabel>

                <Input
                  type="number"
                  placeholder="15200"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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
            name="vehicle_status"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "vehicle_status"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="form-rhf-select-language"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="bg-orange-300 dark:text-slate-700"
                  >
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">in-active</SelectItem>
                    <SelectItem value="retired">retired</SelectItem>
                  </SelectContent>
                </Select>
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
            name="vehicle_availability"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "vehicle_availability"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle Availability</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    id="form-rhf-select-language"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="bg-orange-300 dark:text-slate-700"
                  >
                    <SelectItem value="available">available</SelectItem>
                    <SelectItem value="reserved">reserved</SelectItem>
                    <SelectItem value="maintenance">maintenance</SelectItem>
                    <SelectItem value="unavailable">unavailable</SelectItem>
                    <SelectItem value="rented">rented</SelectItem>
                  </SelectContent>
                </Select>
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
            name="daily_rate"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "daily_rate"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Vehicle daily rate</FieldLabel>

                <Input
                  type="number"
                  placeholder="1800"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={`${inputClasses}`}
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

        <div className="mt-2">
          <Controller
            name="features"
            control={form.control}
            render={({ field, fieldState }) => {
              const [text, setText] = useState(field.value?.join(", ") ?? "");

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Vehicle Features
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      (Comma Separated)
                    </span>
                  </FieldLabel>

                  <Input
                    value={text}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setText(raw); // let the user type freely, commas included

                      const features = raw
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean);

                      field.onChange(features);
                    }}
                    onBlur={() => {
                      // clean up trailing commas/spaces once they're done typing
                      setText(field.value?.join(", ") ?? "");
                      field.onBlur();
                    }}
                    placeholder="Air Conditioning, GPS, Backup Camera"
                    aria-invalid={fieldState.invalid}
                    className={inputClasses}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500!"
                    />
                  )}
                </Field>
              );
            }}
          />
        </div>

        <div className="mt-2">
          <Controller
            name="description"
            control={form.control}
            render={({
              field,
              fieldState,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof createVehicleSchema>,
                "description"
              >;
              fieldState: ControllerFieldState;
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  Description
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Textarea
                  placeholder="Enter Vehicle description"
                  {...field}
                  aria-invalid={fieldState.invalid}
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
        <div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-12 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Vehicle`}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AdminAddVehicleForm;
