"use client";

import { Country, Vehicle } from "@/data/models";
import { useState } from "react";
import BookingForm from "./booking-form";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CircleCheck,
  Cog,
  DoorOpen,
  Fuel,
  Gauge,
  Palette,
  Users,
} from "lucide-react";
import Stepper from "./stepper";
import VehicleImageGallery from "@/components/vehicles/vehicle-image-gallery";
import VehicleSpec from "@/components/vehicles/vehicle-spec";
import { Badge } from "@/components/ui/badge";
import VehicleStatusBadge from "@/components/vehicle-status-badge";
import { toKnownAvailability, toKnownStatus } from "@/lib/vehicle.status";
import VehicleAvailabilityBadge from "@/components/vehicle-availability-badge";
import { formatCurrency } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Vehicle details" },
  { id: 2, label: "Booking form" },
];

const VehicleDetailStepper = ({
  vehicle,
  country,
}: {
  vehicle: Vehicle;
  country: Country[];
}) => {
  const [step, setStep] = useState(1);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const availability = toKnownAvailability(vehicle.vehicle_availability);
  const status = toKnownStatus(vehicle.vehicle_status);

  const isBookable = availability === "available" && status === "active";
  const shouldShowAvailabilityBadge = status === "active" && !isBookable;

  console.log(isBookable);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* STEPPER HEADER */}
        <div className="mb-10">
          <Stepper currentStep={step} onStepClick={setStep} />
        </div>

        {/* STEP 1: VEHICLE DETAILS */}
        {step === 1 && (
          <div className="space-y-10">
            {/* HEADER */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  {vehicle.vehicle_type} · {vehicle.category}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {vehicle.make} {vehicle.model}{" "}
                  <span className="font-normal text-gray-400 dark:text-slate-400">
                    {vehicle.year}
                  </span>
                </h1>
              </div>

              <VehicleStatusBadge status={vehicle.vehicle_status} />
            </div>

            {/* BODY */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left: gallery + specs + features */}
              <div className="lg:col-span-2 space-y-8">
                <VehicleImageGallery
                  images={vehicle.images}
                  alt={`${vehicle.make} ${vehicle.model}`}
                />

                <section>
                  <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
                    Specifications
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <VehicleSpec
                      icon={Cog}
                      label="Transmission"
                      value={vehicle.transmission}
                    />
                    <VehicleSpec
                      icon={Fuel}
                      label="Fuel type"
                      value={vehicle.fuel_type}
                    />
                    {vehicle.vehicle_type === "car" ? (
                      <>
                        <VehicleSpec
                          icon={Users}
                          label="Seats"
                          value={vehicle.seats}
                        />
                        <VehicleSpec
                          icon={DoorOpen}
                          label="Doors"
                          value={vehicle.doors}
                        />
                      </>
                    ) : (
                      <VehicleSpec
                        icon={Gauge}
                        label="Engine"
                        value={`${vehicle.engine_displacement_cc} cc`}
                      />
                    )}

                    <VehicleSpec
                      icon={Palette}
                      label="Color"
                      value={vehicle.color}
                    />
                    <VehicleSpec
                      icon={Gauge}
                      label="Mileage"
                      value={`${vehicle.mileage.toLocaleString()} km`}
                    />
                    <VehicleSpec
                      icon={Calendar}
                      label="Year"
                      value={vehicle.year}
                    />
                  </div>
                </section>

                {vehicle.features?.length > 0 && (
                  <section>
                    <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
                      Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {vehicle.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300"
                        >
                          <CircleCheck className="h-4 w-4 shrink-0 text-orange-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right: sticky pricing card */}
              <div className="lg:col-span-1">
                <div className="sticky top-23 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(vehicle.daily_rate)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      / day
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    Continue to request this vehicle.
                  </p>

                  {shouldShowAvailabilityBadge && (
                    <VehicleAvailabilityBadge
                      status={vehicle.vehicle_availability}
                    />
                  )}
                  <Button
                    onClick={goNext}
                    disabled={!isBookable}
                    className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
                  >
                    {isBookable ? "Continue to booking" : "Unavailable"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BOOKING FORM */}
        {step === 2 && (
          <div className="space-y-6">
            <BookingForm vehicle={vehicle} country={country} />

            <div className="flex justify-start">
              <Button
                variant="outline"
                onClick={goBack}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold"
              >
                Back to vehicle details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailStepper;
