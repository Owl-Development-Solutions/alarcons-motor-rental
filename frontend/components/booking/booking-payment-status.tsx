import { PaymentStatus } from "@/data/models";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { paymentStatusConfig } from "@/lib/booking.status";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const BookingPaymentStatusBadge = ({
  status,
  className,
}: PaymentStatusBadgeProps) => {
  const config = paymentStatusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default BookingPaymentStatusBadge;
