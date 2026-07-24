import { Vehicle } from "@/data/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ImageIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { AVAILABILITY_STYLE, FLEET_STATUS_STYLE } from "@/lib/helpers";
import { Separator } from "../ui/separator";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import Detail from "./admin-vehicle-detail";
import VehicleAvailabilityBadge from "../vehicle-availability-badge";
import VehicleStatusBadge from "../vehicle-status-badge";

const VehicleDetailModal = ({
  vehicle,
  open,
  onOpenChange,
}: {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!vehicle) return null;

  const primaryImage = vehicle.images?.[0];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar dark:bg-[#0F172A] bg-white">
        <DialogHeader>
          <DialogTitle>
            {vehicle.make} {vehicle.model}{" "}
            <span className="font-normal text-gray-400 dark:text-slate-500">
              {vehicle.year}
            </span>
          </DialogTitle>
          <DialogDescription>
            Plate {vehicle.plate_number} · VIN {vehicle.vin}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-slate-600">
                <ImageIcon className="h-10 w-10" />
              </div>
            )}
            {vehicle.images && vehicle.images.length > 1 && (
              <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                +{vehicle.images.length - 1} more photo
                {vehicle.images.length - 1 > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2">
            <VehicleAvailabilityBadge status={vehicle.vehicle_availability} />
            <VehicleStatusBadge status={vehicle.vehicle_status} />
            <Badge variant="outline" className="capitalize">
              {vehicle.vehicle_type}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {vehicle.category}
            </Badge>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(vehicle.daily_rate)}
            </span>
            <span className="text-sm text-gray-500 dark:text-slate-400">
              / day
            </span>
          </div>

          <Separator />

          {/* Specifications */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
              <Detail
                label="Transmission"
                value={
                  <span className="capitalize">{vehicle.transmission}</span>
                }
              />
              <Detail
                label="Fuel type"
                value={<span className="capitalize">{vehicle.fuel_type}</span>}
              />
              <Detail label="Seats" value={vehicle.seats} />
              <Detail label="Doors" value={vehicle.doors} />
              <Detail
                label="Engine"
                value={
                  vehicle.engine_displacement_cc
                    ? `${vehicle.engine_displacement_cc} cc`
                    : "—"
                }
              />
              <Detail
                label="Color"
                value={<span className="capitalize">{vehicle.color}</span>}
              />
              <Detail
                label="Mileage"
                value={`${Number(vehicle.mileage).toLocaleString()} km`}
              />
              <Detail label="Year" value={vehicle.year} />
            </div>
          </div>

          {/* Features */}
          {vehicle.features && vehicle.features.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature) => (
                    <Badge
                      key={feature}
                      className="bg-orange-100 text-orange-700"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Insurance */}
          {vehicle.insurance && (
            <>
              <Separator />
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Insurance
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                  <Detail label="Provider" value={vehicle.insurance.provider} />
                  <Detail
                    label="Policy number"
                    value={vehicle.insurance.policy_number}
                  />
                  <Detail
                    label="Expires"
                    value={
                      vehicle.insurance.expires_at
                        ? formatDateTime(vehicle.insurance.expires_at).dateTime
                        : null
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* Description */}
          {vehicle.description && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  {vehicle.description}
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-slate-400">
            <div>
              <p className="font-medium text-gray-700 dark:text-slate-300">
                Created
              </p>
              <p>{formatDateTime(vehicle.created_at).dateTime}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-slate-300">
                Last updated
              </p>
              <p>{formatDateTime(vehicle.updated_at).dateTime}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailModal;
