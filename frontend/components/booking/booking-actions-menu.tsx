"use client";

import { Booking, BookingStatus, PaymentStatus } from "@/data/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CheckCircle2,
  CircleDollarSign,
  MoreVertical,
  XCircle,
} from "lucide-react";

interface BookingActionsMenuProps {
  booking: Booking;
  onMarkAsPaid: (id: number) => void;
  onMarkAsCompleted: (id: number) => void;
  onCancelBooking: (id: number) => void;
  disabled: boolean;
}

const BookingActionsMenu = ({
  booking,
  onMarkAsPaid,
  onMarkAsCompleted,
  onCancelBooking,
  disabled,
}: BookingActionsMenuProps) => {
  const isUnpaid = booking.payment_status === "unpaid";

  const canMarkAsCompleted = [
    "pending",
    "confirmed",
    "ongoing",
    "cancelled",
  ].includes(booking.booking_status);

  const canCancelBooking = ["pending", "confirmed", "ongoing"].includes(
    booking.booking_status,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" disabled={disabled} />}
      >
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-[#111729] w-50 "
      >
        {isUnpaid && (
          <DropdownMenuItem
            onClick={() => onMarkAsPaid(booking.id)}
            className="hover:bg-orange-200! hover:text-orange-800!"
          >
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Mark as paid
          </DropdownMenuItem>
        )}

        {canMarkAsCompleted && (
          <DropdownMenuItem
            onClick={() => onMarkAsCompleted(booking.id)}
            className="hover:bg-orange-100! hover:text-orange-800!"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark as completed
          </DropdownMenuItem>
        )}

        {canCancelBooking && (
          <DropdownMenuItem
            onClick={() => onCancelBooking(booking.id)}
            className="hover:bg-red-100! hover:text-red-800!"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel booking
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookingActionsMenu;
