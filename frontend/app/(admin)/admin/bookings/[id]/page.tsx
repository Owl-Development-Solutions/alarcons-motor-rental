import Link from "next/link";
import BookingPaymentStatusBadge from "@/components/booking/booking-payment-status";
import BookingStatusBadge from "@/components/booking/booking-status-badge";
import { getAdminBooking } from "@/data/actions/booking";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getAdminBooking(Number(id));
  const customerName = `${booking.first_name} ${booking.last_name}`;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/bookings"
            className="text-sm text-orange-600 hover:underline dark:text-orange-400"
          >
            ← Back to booking records
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Booking #{booking.id}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Created {formatDateTime(booking.created_at).dateTime}
          </p>
        </div>
        <div className="flex gap-2">
          <BookingStatusBadge status={booking.booking_status} />
          <BookingPaymentStatusBadge status={booking.payment_status} />
        </div>
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
          </dl>
        </section>
      </div>

      {booking.order_notes && (
        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer notes</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
            {booking.order_notes}
          </p>
        </section>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="text-right font-medium text-gray-900 dark:text-white">{value}</dd>
    </div>
  );
}
