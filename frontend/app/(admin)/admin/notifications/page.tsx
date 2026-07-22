"use client";

import {
  Bell,
  Search,
  Filter,
  Trash2,
  Check,
  X,
} from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "NT-001",
      type: "booking",
      message: "New booking received from Maria Santos",
      time: "2 minutes ago",
      status: "unread",
    },
    {
      id: "NT-002",
      type: "payment",
      message: "Payment received for booking BK-001",
      time: "15 minutes ago",
      status: "unread",
    },
    {
      id: "NT-003",
      type: "return",
      message: "Vehicle Honda XRM 125 returned",
      time: "1 hour ago",
      status: "read",
    },
    {
      id: "NT-004",
      type: "concern",
      message: "New concern submitted by Pedro Reyes",
      time: "2 hours ago",
      status: "read",
    },
    {
      id: "NT-005",
      type: "cancelled",
      message: "Booking BK-006 cancelled by customer",
      time: "3 hours ago",
      status: "read",
    },
    {
      id: "NT-006",
      type: "booking",
      message: "New booking received from Ana Garcia",
      time: "5 hours ago",
      status: "read",
    },
    {
      id: "NT-007",
      type: "payment",
      message: "Payment received for booking BK-002",
      time: "6 hours ago",
      status: "read",
    },
    {
      id: "NT-008",
      type: "maintenance",
      message: "Vehicle VH-005 marked for maintenance",
      time: "1 day ago",
      status: "read",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage system notifications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
            <Check className="w-4 h-4" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Notifications
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Notification ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                    notification.status === "unread" ? "bg-orange-50 dark:bg-orange-900/20" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {notification.id}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification.type === "booking"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : notification.type === "payment"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : notification.type === "return"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                          : notification.type === "concern"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : notification.type === "cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {notification.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {notification.time}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification.status === "unread"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {notification.status === "unread" && (
                        <button className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
