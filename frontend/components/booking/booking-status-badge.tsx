import { BookingStatus } from "@/data/models";
import { bookingStatusConfig } from "@/lib/booking.status";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const BookingStatusBadge = ({ status, className }: BookingStatusBadgeProps) => {
  const config = bookingStatusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default BookingStatusBadge;
