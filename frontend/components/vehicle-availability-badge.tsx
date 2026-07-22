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
  status: VehicleAvailability;
  className?: string;
}) => {
  const config = vehicleAvailabilityConfig[status];
  return (
    <Badge className={cn(config.className, className)}>{config.label}</Badge>
  );
};

export default VehicleAvailabilityBadge;
