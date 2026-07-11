"use client";

import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Check,
  Reply,
} from "lucide-react";

export default function ConcernsPage() {
  const concerns = [
    {
      id: "CN-001",
      customer: "Juan Dela Cruz",
      subject: "Vehicle not clean",
      priority: "High",
      status: "Open",
      assignedStaff: "Admin",
      dateSubmitted: "2024-01-15",
    },
    {
      id: "CN-002",
      customer: "Maria Santos",
      subject: "Late pickup",
      priority: "Medium",
      status: "In Progress",
      assignedStaff: "Staff 1",
      dateSubmitted: "2024-01-14",
    },
    {
      id: "CN-003",
      customer: "Pedro Reyes",
      subject: "Payment issue",
      priority: "High",
      status: "Resolved",
      assignedStaff: "Admin",
      dateSubmitted: "2024-01-13",
    },
    {
      id: "CN-004",
      customer: "Ana Garcia",
      subject: "Vehicle breakdown",
      priority: "Critical",
      status: "Open",
      assignedStaff: "Staff 2",
      dateSubmitted: "2024-01-12",
    },
    {
      id: "CN-005",
      customer: "Carlos Mendoza",
      subject: "Booking cancellation",
      priority: "Low",
      status: "Resolved",
      assignedStaff: "Staff 1",
      dateSubmitted: "2024-01-11",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Concerns
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer concerns and feedback
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Concerns
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search concerns..."
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
                  Concern ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Assigned Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {concerns.map((concern) => (
                <tr
                  key={concern.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {concern.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {concern.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {concern.subject}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        concern.priority === "Critical"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : concern.priority === "High"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          : concern.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {concern.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        concern.status === "Open"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : concern.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {concern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {concern.assignedStaff}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {concern.dateSubmitted}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                        <Check className="w-4 h-4" />
                      </button>
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
