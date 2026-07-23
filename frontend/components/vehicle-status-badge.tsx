import { cn, VehicleStatus, vehicleStatusConfig } from "@/lib/utils";
import { Badge } from "./ui/badge";

const VehicleStatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const config =
    vehicleStatusConfig[status as VehicleStatus] ??
    vehicleStatusConfig.inactive;
  return (
    <Badge className={cn(config.className, className)}>
      Vehicle is {config.label}
    </Badge>
  );
};

export default VehicleStatusBadge;
