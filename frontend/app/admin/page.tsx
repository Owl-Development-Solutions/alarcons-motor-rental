"use client";

import { useState, useEffect } from "react";
import {
  Car,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Printer,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      title: "Total Vehicles",
      value: "48",
      change: "+12%",
      trend: "up",
      icon: Car,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Available Vehicles",
      value: "32",
      change: "+8%",
      trend: "up",
      icon: Car,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Rented Vehicles",
      value: "16",
      change: "+4%",
      trend: "up",
      icon: Car,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Total Bookings",
      value: "234",
      change: "+18%",
      trend: "up",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Bookings",
      value: "12",
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Approved Bookings",
      value: "156",
      change: "+15%",
      trend: "up",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Completed Bookings",
      value: "58",
      change: "+22%",
      trend: "up",
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Cancelled Bookings",
      value: "8",
      change: "-12%",
      trend: "down",
      icon: XCircle,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Total Customers",
      value: "189",
      change: "+25%",
      trend: "up",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Total Revenue",
      value: "₱458,920",
      change: "+32%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Monthly Revenue",
      value: "₱78,450",
      change: "+28%",
      trend: "up",
      icon: DollarSign,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Today's Revenue",
      value: "₱12,340",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  const salesOverview = [
    {
      title: "Motor Rentals",
      rentals: "156",
      income: "₱234,500",
      available: "18",
      active: "12",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Car Rentals",
      rentals: "78",
      income: "₱224,420",
      available: "14",
      active: "4",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Combined Sales",
      rentals: "234",
      income: "₱458,920",
      available: "32",
      active: "16",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const recentBookings = [
    {
      id: "BK-001",
      customer: "Juan Dela Cruz",
      vehicle: "Honda XRM 125",
      type: "Motorcycle",
      pickup: "2024-01-15",
      return: "2024-01-18",
      payment: "Paid",
      status: "Completed",
    },
    {
      id: "BK-002",
      customer: "Maria Santos",
      vehicle: "Toyota Vios",
      type: "Car",
      pickup: "2024-01-16",
      return: "2024-01-20",
      payment: "Pending",
      status: "Approved",
    },
    {
      id: "BK-003",
      customer: "Pedro Reyes",
      vehicle: "Yamaha NMAX",
      type: "Motorcycle",
      pickup: "2024-01-17",
      return: "2024-01-19",
      payment: "Paid",
      status: "Active",
    },
    {
      id: "BK-004",
      customer: "Ana Garcia",
      vehicle: "Honda City",
      type: "Car",
      pickup: "2024-01-18",
      return: "2024-01-22",
      payment: "Pending",
      status: "Pending",
    },
    {
      id: "BK-005",
      customer: "Carlos Mendoza",
      vehicle: "Kawasaki R15",
      type: "Motorcycle",
      pickup: "2024-01-19",
      return: "2024-01-21",
      payment: "Paid",
      status: "Completed",
    },
  ];

  const recentCustomers = [
    {
      name: "Juan Dela Cruz",
      email: "juan@email.com",
      phone: "09123456789",
      status: "Active",
      date: "2024-01-15",
    },
    {
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "09123456788",
      status: "Active",
      date: "2024-01-14",
    },
    {
      name: "Pedro Reyes",
      email: "pedro@email.com",
      phone: "09123456787",
      status: "Active",
      date: "2024-01-13",
    },
    {
      name: "Ana Garcia",
      email: "ana@email.com",
      phone: "09123456786",
      status: "Pending",
      date: "2024-01-12",
    },
  ];

  const notifications = [
    {
      type: "booking",
      message: "New booking received from Maria Santos",
      time: "2 minutes ago",
    },
    {
      type: "payment",
      message: "Payment received for booking BK-001",
      time: "15 minutes ago",
    },
    {
      type: "return",
      message: "Vehicle Honda XRM 125 returned",
      time: "1 hour ago",
    },
    {
      type: "concern",
      message: "New concern submitted by Pedro Reyes",
      time: "2 hours ago",
    },
    {
      type: "cancelled",
      message: "Booking BK-006 cancelled by customer",
      time: "3 hours ago",
    },
  ];

  const quickActions = [
    { name: "Add Vehicle", icon: Car, href: "/Dashboard-Admin/vehicles/add" },
    { name: "Add Customer", icon: Users, href: "/Dashboard-Admin/customers/add" },
    { name: "Create Booking", icon: Calendar, href: "/Dashboard-Admin/bookings/add" },
    { name: "View Reports", icon: TrendingUp, href: "/Dashboard-Admin/reports" },
    { name: "Export Data", icon: Download, href: "#" },
    { name: "Generate Report", icon: Printer, href: "#" },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
            <Plus className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    from last month
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Overview - Motor, Car, and Combined */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {salesOverview.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {item.title}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Rentals
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.rentals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Income
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.income}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Available
                </span>
                <span className="font-semibold text-green-600">
                  {item.available}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active
                </span>
                <span className="font-semibold text-orange-600">
                  {item.active}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Bar Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Bar Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Revenue (Bar Graph)
            </h3>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-around gap-2 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            {[
              { month: "Jan", value: 65 },
              { month: "Feb", value: 45 },
              { month: "Mar", value: 80 },
              { month: "Apr", value: 55 },
              { month: "May", value: 70 },
              { month: "Jun", value: 90 },
              { month: "Jul", value: 75 },
              { month: "Aug", value: 60 },
              { month: "Sep", value: 85 },
              { month: "Oct", value: 50 },
              { month: "Nov", value: 95 },
              { month: "Dec", value: 100 },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all hover:from-orange-600 hover:to-orange-500"
                  style={{ height: `${data.value}%` }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Rentals Bar Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vehicle Rentals (Bar Graph)
            </h3>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-around gap-2 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            {[
              { day: "Mon", value: 40 },
              { day: "Tue", value: 65 },
              { day: "Wed", value: 55 },
              { day: "Thu", value: 80 },
              { day: "Fri", value: 70 },
              { day: "Sat", value: 90 },
              { day: "Sun", value: 50 },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${data.value}%` }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motor vs Car Revenue Bar Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Motor vs Car Revenue (Bar Graph)
            </h3>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-around gap-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            {[
              { month: "Jan", motor: 45, car: 65 },
              { month: "Feb", motor: 55, car: 45 },
              { month: "Mar", motor: 65, car: 80 },
              { month: "Apr", motor: 50, car: 55 },
              { month: "May", motor: 60, car: 70 },
              { month: "Jun", motor: 70, car: 90 },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 w-full justify-center">
                  <div
                    className="w-6 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all hover:from-orange-600 hover:to-orange-500"
                    style={{ height: `${data.motor}%` }}
                    title="Motor"
                  />
                  <div
                    className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${data.car}%` }}
                    title="Car"
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Motor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Car</span>
            </div>
          </div>
        </div>

        {/* Booking Status Bar Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Booking Status (Bar Graph)
            </h3>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-around gap-4 bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
            {[
              { status: "Pending", value: 30, color: "from-yellow-500 to-yellow-400" },
              { status: "Approved", value: 70, color: "from-blue-500 to-blue-400" },
              { status: "Completed", value: 85, color: "from-green-500 to-green-400" },
              { status: "Cancelled", value: 15, color: "from-red-500 to-red-400" },
            ].map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-full bg-gradient-to-t ${data.color} rounded-t-lg transition-all`}
                  style={{ height: `${data.value}%` }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {data.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Bookings
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Pickup
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Payment
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
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {booking.vehicle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {booking.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {booking.pickup}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {booking.return}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.payment === "Paid"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {booking.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : booking.status === "Approved"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : booking.status === "Active"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                        <Edit className="w-4 h-4" />
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

      {/* Recent Customers & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Customers
          </h3>
          <div className="space-y-4">
            {recentCustomers.map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {customer.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {customer.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {customer.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === "booking"
                      || notification.type === "payment"
                      ? "bg-green-100 dark:bg-green-900"
                      : notification.type === "return"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : notification.type === "concern"
                      ? "bg-yellow-100 dark:bg-yellow-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
