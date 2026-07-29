"use client";

import { Bell, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { markNotificationAsRead } from "@/data/actions/notification";
import { AdminNotification } from "@/data/models";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

type AdminNotificationsProps = {
  notifications: AdminNotification[];
};

export default function AdminNotifications({
  notifications,
}: AdminNotificationsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(notifications);

  const openNotification = (notification: AdminNotification) => {
    const bookingId = notification.data.booking_id;

    startTransition(async () => {
      if (!notification.read_at) {
        setItems((current) =>
          current.map((item) =>
            item.id === notification.id
              ? { ...item, read_at: new Date().toISOString() }
              : item,
          ),
        );
        await markNotificationAsRead(notification.id);
      }

      if (bookingId) {
        router.push(`/admin/bookings/${bookingId}`);
      }
    });
  };

  const unread = items.filter((notification) => !notification.read_at).length;

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Open notifications"
        className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-gray-200"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-96 gap-0 overflow-hidden p-0 bg-white"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-slate-700">
          <PopoverTitle>Notifications</PopoverTitle>
          {unread > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {unread} unread
            </span>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              You&apos;re all caught up.
            </p>
          ) : (
            items.map((notification) => {
              const isUnread = !notification.read_at;
              const customerName =
                notification.data.customer_name ?? "A customer";
              const bookingId = notification.data.booking_id;

              return (
                <button
                  key={notification.id}
                  type="button"
                  disabled={isPending || !bookingId}
                  onClick={() => openNotification(notification)}
                  className="flex w-full gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-orange-50 disabled:cursor-not-allowed dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                      New booking{bookingId ? ` #${bookingId}` : ""}
                      {isUnread && (
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                      )}
                    </span>
                    <span className="mt-1 block truncate text-xs text-gray-600 dark:text-gray-400">
                      {customerName} placed a booking.
                    </span>
                    <span className="mt-1 block text-xs text-gray-400">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
