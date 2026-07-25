"use client";

import { Booking } from "@/data/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import BookingStatusBadge from "../booking/booking-status-badge";
import BookingPaymentStatusBadge from "../booking/booking-payment-status";
import BookingActionsMenu from "../booking/booking-actions-menu";
import { useTransition } from "react";
import {
  cancelBooking,
  confirmbooking,
  markAsPaid,
} from "@/data/actions/booking";
import { toast } from "sonner";
import { toastStyles } from "@/lib/toast.style";
import { CarRentalErrors } from "@/data/errors/car-rental.errors";

const headerList = [
  "Booking ID",
  "Customer",
  "Vehicle",
  "Type",
  "Pick-up Date",
  "Return Date",
  "Total Amount",
  "Payment Status",
  "Booking Status",
  "Created Date",
  "Actions",
];

const AdminTableBooking = ({ bookings }: { bookings: Booking[] }) => {
  const [isPending, startTransition] = useTransition();

  const updatePaymentStatus = (id: number) => {
    startTransition(async () => {
      const res = await markAsPaid(id);

      if (!res.success) {
        toast.error(res.message, {
          style: toastStyles.error,
        });
        return;
      }

      toast.success(res.message, {
        style: toastStyles.success,
      });
    });
  };

  const updateBookingStatus = (id: number) => {
    startTransition(async () => {
      const res = await confirmbooking(id);

      if (!res.success) {
        toast.error(res.message, {
          style: toastStyles.error,
        });
        return;
      }

      toast.success(res.message, {
        style: toastStyles.success,
      });
    });
  };

  const handleCancelBooking = (id: number) => {
    startTransition(async () => {
      const res = await cancelBooking(id);

      if (!res.success) {
        toast.error(res.message, {
          style: toastStyles.error,
        });
        return;
      }

      toast.success(res.message, {
        style: toastStyles.success,
      });
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
            {headerList.map((val, idx) => (
              <TableHead
                key={idx}
                className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                {val}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, idx) => (
            <TableRow
              key={booking.id}
              className={`transition-colors ${
                idx % 2 === 0
                  ? "bg-white dark:bg-slate-800"
                  : "bg-gray-50/60 dark:bg-slate-700/40"
              } hover:bg-orange-50 dark:hover:bg-slate-700`}
            >
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                BK-{booking.id}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {booking.user
                  ? `${booking.user.first_name + " " + booking.user.last_name}`
                  : `${booking.first_name + " " + booking.last_name} (Guest)`}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {booking.vehicle?.make + " " + booking.vehicle?.model}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {booking.vehicle?.vehicle_type}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {formatDateTime(booking.pickup_datetime).dateTime}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {formatDateTime(booking.dropoff_datetime).dateTime}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {formatCurrency(booking.total_amount)}
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                <BookingPaymentStatusBadge status={booking.payment_status} />
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                <BookingStatusBadge status={booking.booking_status} />
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {formatDateTime(booking.created_at).dateTime}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <BookingActionsMenu
                    booking={booking}
                    onMarkAsPaid={(id) => updatePaymentStatus(id)}
                    onMarkAsCompleted={(id) => updateBookingStatus(id)}
                    onCancelBooking={(id) => handleCancelBooking(id)}
                    disabled={isPending}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminTableBooking;
