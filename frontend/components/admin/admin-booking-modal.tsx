import { Booking } from "@/data/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import BookingPaymentStatusBadge from "../booking/booking-payment-status";
import BookingStatusBadge from "../booking/booking-status-badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Separator } from "../ui/separator";

const BookingDetailModal = ({
  booking,
  open,
  onOpenChange,
}: {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!booking) return null;

  const customerName = `${booking.first_name} ${booking.last_name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto no-scrollbar dark:bg-[#0F172A] bg-white">
        <DialogHeader>
          <DialogTitle>Booking #{booking.id}</DialogTitle>
          <DialogDescription>
            Created {formatDateTime(booking.created_at).dateTime}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <BookingStatusBadge status={booking.booking_status} />
          <BookingPaymentStatusBadge status={booking.payment_status} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Detail label="Name" value={customerName} />
              <Detail label="Email" value={booking.email} />
              <Detail label="Phone" value={booking.phone} />
              <Detail label="Address" value={`${booking.street_address}, ${booking.city}, ${booking.country}`} />
            </dl>
          </section>
          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rental</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Detail label="Vehicle" value={`${booking.vehicle?.make ?? ""} ${booking.vehicle?.model ?? ""}`.trim() || "Not available"} />
              <Detail label="Pick-up" value={formatDateTime(booking.pickup_datetime).dateTime} />
              <Detail label="Return" value={formatDateTime(booking.dropoff_datetime).dateTime} />
              <Detail label="Total" value={formatCurrency(booking.total_amount)} />
              {booking.rental_mode && <Detail label="Rental Mode" value={booking.rental_mode} />}
              {booking.delivery_location && <Detail label="Delivery Location" value={booking.delivery_location} />}
            </dl>
          </section>
        </div>

        {booking.order_notes && (
          <>
            <Separator />
            <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer notes</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                {booking.order_notes}
              </p>
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="text-right font-medium text-gray-900 dark:text-white">{value}</dd>
    </div>
  );
}

export default BookingDetailModal;
