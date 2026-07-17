"use client";

import { Vehicle } from "@/data/models";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Badge,
  CarIcon,
  DoorClosed,
  Fuel,
  Gauge,
  ImageIcon,
  Settings2,
  TypeIcon,
  Users,
} from "lucide-react";
import {
  bookLabel,
  currency,
  STATUS_LABEL,
  STATUS_STYLE,
  TYPE_ICON,
} from "@/lib/helpers";
import { Button } from "../ui/button";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
  onBook?: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onBook }: VehicleCardProps) => {
  const {
    make,
    model,
    year,
    vehicle_type,
    plate_number,
    category,
    transmission,
    fuel_type,
    seats,
    doors,
    engine_displacement_cc,
    mileage,
    daily_rate,
    currency: currencyCode,
    status,
    images,
  } = vehicle;

  const TypeIcon = TYPE_ICON[vehicle_type] || CarIcon;
  const isAvailable = status === "available";
  const isMotor = vehicle_type === "motorcycle";

  const handleBook = (id: number) => {
    console.log(id);
  };

  return (
    <Link
      href={`/vehicle/${vehicle.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl"
    >
      <Card className="overflow-hidden p-0 gap-0 border-neutral-200">
        {/* Image */}
        <div className="relative aspect-4/3 bg-neutral-100">
          {images?.[0] ? (
            <img
              src={images[0]}
              alt={`${make} ${model}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-300">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}

          <Badge
            className={`absolute left-3 top-3 border font-medium ${STATUS_STYLE[status] || STATUS_STYLE.maintenance}`}
          >
            {STATUS_LABEL[status] || status}
          </Badge>

          {images?.length > 1 && (
            <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
              +{images.length - 1} photo{images.length - 1 > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <CardContent className="space-y-3 p-4">
          {/* Plate-style name tag */}
          <div className="flex items-start justify-between gap-2">
            <div
              className="rounded-md border-2 border-neutral-800 px-2.5 py-1 bg-linear-to-r from-orange-100 to-orange-300 "
              style={{ fontFamily: "monospace" }}
            >
              {/* <p className="text-[10px] font-bold leading-none tracking-wider text-neutral-800">
              {plate_number}
            </p> */}
              <p className="text-sm  text-neutral-900">
                {make} {model} '{String(year).slice(-2)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 pt-0.5">
              <TypeIcon className="h-5 w-5 text-neutral-400" />
              <span className="text-[11px] capitalize text-neutral-400">
                {category}
              </span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3 text-sm text-orange-100">
            <div className="flex items-center gap-1.5">
              <Settings2 className="h-4 w-4 text-neutral-400" />
              <span className="capitalize">{transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-neutral-400" />
              <span className="capitalize">{fuel_type}</span>
            </div>

            {isMotor ? (
              <div className="flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-neutral-400" />
                <span>{engine_displacement_cc} cc</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-neutral-400" />
                <span>{seats} seats</span>
              </div>
            )}

            {isMotor ? (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-neutral-400" />
                <span>{seats} seats</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <DoorClosed className="h-4 w-4 text-neutral-400" />
                <span>{doors} doors</span>
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-400">
            {mileage.toLocaleString()} km on the odometer
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 border-t border-neutral-100 p-4">
          <div>
            <p className="text-lg font-bold leading-none text-orange-400">
              {currency(daily_rate, currencyCode)}
            </p>
            <p className="text-xs text-neutral-400">per day</p>
          </div>
          <Button
            disabled={!isAvailable}
            className={`${
              isAvailable ? "bg-linear-to-r from-orange-500 to-orange-600" : ""
            } cursor-pointer`}
            onClick={() => handleBook(vehicle.id)}
          >
            {isAvailable ? bookLabel(vehicle_type) : "Unavailable"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VehicleCard;
