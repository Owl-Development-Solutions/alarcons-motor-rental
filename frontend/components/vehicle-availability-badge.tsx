import {
  cn,
  VehicleAvailability,
  vehicleAvailabilityConfig,
} from "@/lib/utils";
import { Badge } from "./ui/badge";

const VehicleAvailabilityBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const config =
    vehicleAvailabilityConfig[status as VehicleAvailability] ??
    vehicleAvailabilityConfig.unavailable;

  return (
    <Badge className={cn(config.className, className)}>{config.label}</Badge>
  );
};

export default VehicleAvailabilityBadge;
