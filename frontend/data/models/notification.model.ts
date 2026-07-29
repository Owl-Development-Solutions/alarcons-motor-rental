export interface AdminNotification {
  id: string;
  type: string;
  data: {
    booking_id?: number;
    customer_name?: string;
    vehicle_id?: number;
    pickup_datetime?: string;
    dropoff_datetime?: string;
    total_amount?: number;
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminNotificationResponse {
  notifications: AdminNotification[];
  unread_count: number;
}
