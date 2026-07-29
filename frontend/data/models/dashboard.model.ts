export type DashboardMetrics = {
  total_vehicles: number;
  available_vehicles: number;
  rented_vehicles: number;
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_customers: number;
  total_revenue: number;
  monthly_revenue: number;
  today_revenue: number;
};

export type ChartPoint = { label: string; value: number };

export type DashboardData = {
  metrics: DashboardMetrics;
  vehicle_summaries: {
    type: string;
    rentals: number;
    income: number;
    available: number;
    active: number;
  }[];
  charts: {
    monthly_revenue: ChartPoint[];
    weekly_rentals: ChartPoint[];
    category_revenue: ChartPoint[];
    booking_statuses: ChartPoint[];
  };
  recent_bookings: {
    id: number;
    customer_name: string;
    vehicle_name: string;
    vehicle_type: string | null;
    pickup_datetime: string;
    dropoff_datetime: string;
    payment_status: "paid" | "unpaid";
    booking_status:
      | "pending"
      | "confirmed"
      | "ongoing"
      | "completed"
      | "cancelled";
  }[];
  recent_customers: {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    created_at: string;
  }[];
  recent_notifications: {
    id: string;
    type: string;
    data: { booking_id?: number; customer_name?: string };
    read_at: string | null;
    created_at: string;
  }[];
};
