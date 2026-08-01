import Link from "next/link";
import { Calendar, Car, Clock, DollarSign, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardData } from "@/data/models";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import BookingPaymentStatusBadge from "@/components/booking/booking-payment-status";
import BookingStatusBadge from "@/components/booking/booking-status-badge";
import { UserStatusBadge } from "@/components/shared/user-status-badge";
import { DashboardBarChart } from "./dashboard-bar-chart";
import { DashboardStatCard } from "./dashboard-stat-card";

export function AdminDashboard({ dashboard }: { dashboard: DashboardData }) {
  const { metrics } = dashboard;
  const statistics = [


    
    ["Total vehicles", metrics.total_vehicles, Car, "bg-blue-500"],
    ["Available vehicles", metrics.available_vehicles, Car, "bg-green-500"],
    ["Rented vehicles", metrics.rented_vehicles, Car, "bg-orange-500"],
    ["Total bookings", metrics.total_bookings, Calendar, "bg-purple-500"],
    ["Pending bookings", metrics.pending_bookings, Clock, "bg-yellow-500"],
    [
      "Confirmed bookings",
      metrics.confirmed_bookings,
      Calendar,
      "bg-emerald-500",
    ],
    ["Completed bookings", metrics.completed_bookings, Calendar, "bg-sky-500"],
    ["Cancelled bookings", metrics.cancelled_bookings, Calendar, "bg-red-500"],
    ["Total customers", metrics.total_customers, Users, "bg-indigo-500"],
    [
      "Total revenue",
      formatCurrency(metrics.total_revenue),
      DollarSign,
      "bg-emerald-600",
    ],
    [
      "This month",
      formatCurrency(metrics.monthly_revenue),
      DollarSign,
      "bg-teal-500",
    ],
    ["Today", formatCurrency(metrics.today_revenue), DollarSign, "bg-cyan-500"],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            A live overview of your rental business.
          </p>
        </div>
        <Link href="/admin/vehicles/add">
          <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
            Add vehicle
          </button>
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map(([label, value, icon, tone]) => (
          <DashboardStatCard
            key={label}
            label={label}
            value={String(value)}
            icon={icon}
            tone={tone}
          />
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {dashboard.vehicle_summaries.map((summary) => (
          <Card key={summary.type}>
            <CardHeader>
              <CardTitle className="capitalize">
                {summary.type || "Other"} rentals
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <Metric label="Bookings" value={summary.rentals} />
              <Metric label="Income" value={formatCurrency(summary.income)} />
              <Metric label="Available" value={summary.available} />
              <Metric label="Rented" value={summary.active} />
            </CardContent>
          </Card>
        ))}
        {dashboard.vehicle_summaries.length === 0 && (
          <EmptyState message="Add vehicles to view rental summaries." />
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardBarChart
          title={`Monthly revenue ${" " + " "} `}
          data={dashboard.charts.monthly_revenue}
        />
        <DashboardBarChart
          title="Bookings this week"
          data={dashboard.charts.weekly_rentals}
          color="#3b82f6"
        />
        <DashboardBarChart
          title="Revenue by vehicle type"
          data={dashboard.charts.category_revenue}
          color="#8b5cf6"
        />
        <DashboardBarChart
          title="Booking statuses"
          data={dashboard.charts.booking_statuses}
          color="#10b981"
        />
      </section>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Recent bookings</CardTitle>
          <Link
            href="/admin/bookings"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {dashboard.recent_bookings.length === 0 ? (
            <EmptyState message="No bookings have been created yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.recent_bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Link
                        className="font-medium hover:underline"
                        href={`/admin/bookings/${booking.id}`}
                      >
                        BK-{booking.id}
                      </Link>
                    </TableCell>
                    <TableCell>{booking.customer_name}</TableCell>
                    <TableCell>{booking.vehicle_name || "—"}</TableCell>
                    <TableCell>
                      {
                        formatDateTime(
                          booking.pickup_datetime as unknown as Date,
                        ).dateOnly
                      }{" "}
                      –{" "}
                      {
                        formatDateTime(
                          booking.dropoff_datetime as unknown as Date,
                        ).dateOnly
                      }
                    </TableCell>
                    <TableCell>
                      <BookingPaymentStatusBadge
                        status={booking.payment_status}
                      />
                    </TableCell>
                    <TableCell>
                      <BookingStatusBadge status={booking.booking_status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.recent_customers.length === 0 ? (
              <EmptyState message="No customers yet." />
            ) : (
              dashboard.recent_customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                  <UserStatusBadge isActive={customer.is_active} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.recent_notifications.length === 0 ? (
              <EmptyState message="No notifications yet." />
            ) : (
              dashboard.recent_notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={
                    notification.data.booking_id
                      ? `/admin/bookings/${notification.data.booking_id}`
                      : "/admin/notifications"
                  }
                  className="block rounded-lg border p-3 hover:bg-muted/50"
                >
                  <p className="text-sm font-medium">
                    New booking
                    {notification.data.booking_id
                      ? ` #${notification.data.booking_id}`
                      : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.data.customer_name ??
                      "A new notification was received."}
                  </p>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
      {message}
    </p>
  );
}
