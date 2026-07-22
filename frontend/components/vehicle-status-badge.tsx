import { cn, VehicleStatus, vehicleStatusConfig } from "@/lib/utils";
import { Badge } from "./ui/badge";

const VehicleStatusBadge = ({
  status,
  className,
}: {
  status: VehicleStatus;
  className?: string;
}) => {
  const config = vehicleStatusConfig[status];
  return (
    <Badge className={cn(config.className, className)}>
      Vehicle is {config.label}
    </Badge>
  );
};

export default VehicleStatusBadge;
